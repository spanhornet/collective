// Fastify
import fastify from "fastify";

// Environment Variables
import dotenv from "dotenv";

// Middleware
import { errorHandler, logger } from "./middleware";

// Utilities
import { NotFoundError } from "./utils/utils.errors";

// Create fastify instance
const server = fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
    transport: process.env.NODE_ENV === "DEVELOPMENT"
      ? {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      }
      : undefined,
  },
});

dotenv.config();

// Register plugins
server.register(errorHandler, {
  showStackTrace: process.env.NODE_ENV === "DEVELOPMENT",
});
server.register(logger);

server.setNotFoundHandler((request, reply) => {
  throw new NotFoundError(`Route ${request.method}:${request.url} not found`);
});

const start = async () => {
  try {
    const port = process.env.PORT;
    const host = process.env.HOST || "localhost";

    if (!port) {
      throw new Error("PORT is not set in the environment variables");
    }

    await server.listen({ port: parseInt(port), host });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();