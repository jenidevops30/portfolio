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

// Case Study (must be before express.static to avoid /projects dir interception)
app.use("/projects", caseStudyRouter);
app.use("/case-study", caseStudyRouter);

// Health
app.use("/health", healthRouter);

// Projects API
app.use("/api/projects", projectsRouter);

// Static files
app.use(express.static(path.join(__dirname, "../public")));


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