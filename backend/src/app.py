import hashlib
import html
import json
import logging
import os
import re
import uuid
from datetime import datetime, timedelta, timezone

import boto3
from botocore.exceptions import BotoCoreError, ClientError

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
ses = boto3.client("ses")
table = dynamodb.Table(os.environ["TABLE_NAME"])

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
MAX_BODY_BYTES = 12_000


def response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": os.environ["ALLOWED_ORIGIN"],
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
            "Cache-Control": "no-store",
        },
        "body": json.dumps(body),
    }


def clean(value, limit):
    if not isinstance(value, str):
        return ""
    return value.strip()[:limit]


def handler(event, context):
    if event.get("httpMethod") == "OPTIONS":
        return response(200, {"message": "ok"})

    raw_body = event.get("body") or ""
    if event.get("isBase64Encoded"):
        import base64
        try:
            raw_body = base64.b64decode(raw_body).decode("utf-8")
        except (ValueError, UnicodeDecodeError):
            return response(400, {"message": "Invalid request body."})

    if len(raw_body.encode("utf-8")) > MAX_BODY_BYTES:
        return response(413, {"message": "Enquiry is too large."})

    try:
        payload = json.loads(raw_body)
    except (TypeError, json.JSONDecodeError):
        return response(400, {"message": "Invalid JSON request."})

    if not isinstance(payload, dict):
        return response(400, {"message": "Invalid enquiry."})

    # Honeypot: silently accept automated form submissions without storing them.
    if clean(payload.get("website"), 200):
        return response(202, {"message": "Thank you. Your enquiry has been received."})

    name = clean(payload.get("name"), 80)
    email = clean(payload.get("email"), 254).lower()
    subject = clean(payload.get("subject"), 120)
    message = clean(payload.get("message"), 4000)

    if not name or not EMAIL_RE.match(email) or not subject or len(message) < 20:
        return response(400, {"message": "Please provide a valid name, email, subject, and message (at least 20 characters)."})

    now = datetime.now(timezone.utc)
    enquiry_id = str(uuid.uuid4())
    created_at = now.isoformat()
    retention_days = int(os.environ.get("RETENTION_DAYS", "180"))
    item = {
        "enquiryId": enquiry_id,
        "createdAt": created_at,
        "expiresAt": int((now + timedelta(days=retention_days)).timestamp()),
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
        "notificationStatus": "PENDING",
    }

    try:
        table.put_item(
            Item=item,
            ConditionExpression="attribute_not_exists(enquiryId)",
        )
    except (BotoCoreError, ClientError):
        logger.exception("Failed to persist enquiry")
        return response(503, {"message": "We could not save your enquiry right now. Please try again later."})

    safe_name = html.escape(name)
    safe_email = html.escape(email)
    safe_subject = html.escape(subject)
    safe_message = html.escape(message).replace("\n", "<br>")
    text_body = (
        f"New portfolio enquiry\\n\\nName: {name}\\nEmail: {email}"
        f"\\nSubject: {subject}\\n\\n{message}\\n\\nReference: {enquiry_id}"
    )
    html_body = (
        f"<h2>New portfolio enquiry</h2><p><b>Name:</b> {safe_name}</p>"
        f"<p><b>Email:</b> {safe_email}</p><p><b>Subject:</b> {safe_subject}</p>"
        f"<p>{safe_message}</p><hr><small>Reference: {enquiry_id}</small>"
    )

    try:
        ses.send_email(
            Source=os.environ["SES_FROM_EMAIL"],
            Destination={"ToAddresses": [os.environ["NOTIFICATION_EMAIL"]]},
            ReplyToAddresses=[email],
            Message={
                "Subject": {"Data": f"Portfolio enquiry: {subject}", "Charset": "UTF-8"},
                "Body": {
                    "Text": {"Data": text_body, "Charset": "UTF-8"},
                    "Html": {"Data": html_body, "Charset": "UTF-8"},
                },
            },
        )
        table.update_item(
            Key={"enquiryId": enquiry_id},
            UpdateExpression="SET notificationStatus = :sent",
            ExpressionAttributeValues={":sent": "SENT"},
        )
    except (BotoCoreError, ClientError):
        # The enquiry is safely stored. Do not ask the visitor to resubmit and risk duplicates.
        logger.exception("Enquiry saved but SES notification failed; enquiryId=%s", enquiry_id)

    logger.info("Enquiry accepted; enquiryId=%s", enquiry_id)
    return response(202, {
        "message": "Thanks for reaching out. Your enquiry has been submitted successfully.",
        "reference": enquiry_id,
    })
