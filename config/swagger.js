import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CallGenZ API Workspace",
      version: "1.0.0",
      description: "Interactive production-ready API documentation for the CallGenZ Backend. Includes authentication, user management, todos, and calendar sync.",
      contact: {
        name: "Backend Architect Team",
        email: "support@callgenz.app",
      },
    },
    servers: [
      {
        url: "/api", 
        description: "Dynamic Host (Current URL)",
      },
      {
        url: "http://localhost:3000/api",
        description: "Local Development Server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Standard JWT Authorization header using the Bearer scheme. Enter your token below."
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid", example: "f47ac10b-58cc-4372-a567-0e02b2c3d479" },
            phone: { type: "string", example: "+1234567890" },
            name: { type: "string", example: "John Doe" },
            age: { type: "integer", example: 30 },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        Todo: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            title: { type: "string", example: "Buy Groceries" },
            description: { type: "string", example: "[{\"text\":\"Milk\",\"done\":false}]" },
            dueAt: { type: "string", format: "date-time" },
            completed: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        Reminder: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            todoId: { type: "string", format: "uuid" },
            callTime: { type: "string", format: "date-time" },
            status: { type: "string", enum: ["PENDING", "CALLED", "MISSED", "COMPLETED"], example: "PENDING" },
            retryCount: { type: "integer", example: 0 },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "fail" },
            message: { type: "string", example: "Detailed error message here" }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing, invalid, or expired",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" }
            }
          }
        },
        NotFoundError: {
          description: "The requested resource was not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" }
            }
          }
        },
        BadRequestError: {
          description: "Invalid input syntax or missing required fields",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./modules/**/*.route.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

