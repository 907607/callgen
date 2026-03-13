import express from "express";
import prisma from "./config/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import authRoutes from "./modules/auth/auth.route.js";
import userRoutes from "./modules/users/users.route.js";
import todoRoutes from "./modules/todos/todos.route.js";
import calendarRoutes from "./modules/calendar/calendar.route.js";
import notificationRoutes from "./modules/notifications/notifications.route.js";
import reminderRoutes from "./modules/reminders/reminders.route.js";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import logger from "./config/logger.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";

dotenv.config();
const app = express();
cors({ origin: "*" });

app.use(express.json());

// Morgan HTTP Request Logger -> piped to Winston
const morganFormat = ":method :url :status :res[content-length] - :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: process.memoryUsage().heapUsed,
      total: process.memoryUsage().heapTotal
    },
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "CallGenZ API Documentation",
    swaggerOptions: {
      persistAuthorization: true, // IMPORTANT: Keeps token after page refresh!
      displayRequestDuration: true,
      docExpansion: "none", // Starts collapsed for cleaner look
      filter: true,
    },
  })
);

app.use(globalErrorHandler);

app.listen(3000, () => {
  logger.info("Server running on port 3000");
});
