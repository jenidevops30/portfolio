const express = require("express");
const path = require("path");

const healthRouter = require("./routes/health");

const app = express();

const projectsRouter = require("./routes/projects");

const caseStudyRouter = require("./routes/case-study");

app.use(express.json());

// View engine
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Legacy stylesheet redirect
app.get("/style.css", (req, res) => {
  res.redirect(301, "/css/style.css");
});

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Health
app.use("/health", healthRouter);

// Projects
app.use("/api/projects", projectsRouter);

// Case Study
app.use("/projects", caseStudyRouter);

// Readiness
app.get("/ready", (req, res) => {
  res.status(200).json({
    status: "ready",
    application: "personal-devops-portfolio",
  });
});

// API information
app.get("/api", (req, res) => {
  res.json({
    application: "personal-devops-portfolio",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.originalUrl,
  });
});

module.exports = app;