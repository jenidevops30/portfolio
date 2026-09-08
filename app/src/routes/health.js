const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
    application: "personal-devops-portfolio",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;