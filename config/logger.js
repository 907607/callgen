import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";

const logDir = "logs";

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Define structured JSON format for files
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

// Define colorized readable format for the console
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}${info.stack ? "\n" + info.stack : ""}`
    )
);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: fileFormat,
    defaultMeta: { service: "callgenz-api" },
    transports: [
        // Daily rotate file for all logs
        new DailyRotateFile({
            dirname: logDir,
            filename: "application-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxFiles: "14d",
            maxSize: "20m",
            zippedArchive: true,
        }),
        // Daily rotate file for errors only
        new DailyRotateFile({
            dirname: logDir,
            filename: "error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxFiles: "14d",
            maxSize: "20m",
            zippedArchive: true,
        }),
    ],
});

// Always add Console transport unless strictly disabled
if (process.env.NODE_ENV !== "test") {
    logger.add(
        new winston.transports.Console({
            format: consoleFormat,
        })
    );
}

export default logger;
