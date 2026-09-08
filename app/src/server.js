require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(
    JSON.stringify({
      level: "info",
      message: "Portfolio application started",
      port: PORT,
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    })
  );
});

const shutdown = (signal) => {
  console.log(
    JSON.stringify({
      level: "info",
      message: "Shutdown signal received",
      signal,
      timestamp: new Date().toISOString(),
    })
  );

  server.close(() => {
    console.log(
      JSON.stringify({
        level: "info",
        message: "HTTP server closed",
        timestamp: new Date().toISOString(),
      })
    );

    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));