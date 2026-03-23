import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { isApiError } from "./errors.js";
import { createIotaRouter } from "./routes/iota.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultDistPath = path.join(__dirname, "..", "dist");

export function createApp({
  sponsorService,
  sponsorServiceFactory,
  enableStatic = true,
  distPath = defaultDistPath,
} = {}) {
  const app = express();

  app.use(express.json({ limit: "1mb" }));
  app.use("/api/iota", createIotaRouter({ sponsorService, sponsorServiceFactory }));

  if (enableStatic) {
    app.use(express.static(distPath));

    app.get("/*path", (req, res, next) => {
      if (req.path.startsWith("/api/")) {
        return next();
      }

      return res.sendFile(path.join(distPath, "index.html"), (error) => {
        if (error) {
          next(error);
        }
      });
    });
  }

  app.use((error, _req, res, _next) => {
    const statusCode =
      typeof error?.status === "number"
        ? error.status
        : isApiError(error)
          ? error.statusCode
          : 500;

    res.status(statusCode).json({
      error: error?.message || "Internal server error",
      details: error?.details,
    });
  });

  return app;
}
