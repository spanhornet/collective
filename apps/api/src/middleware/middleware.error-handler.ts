// Fastify
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

// Error Handling
import { ApiError, InternalServerError } from "../utils/utils.errors";

export interface ErrorHandlerOptions {
  showStackTrace?: boolean;
}

export default fp(async (fastify: FastifyInstance, options: ErrorHandlerOptions = {}) => {
  const { showStackTrace = process.env.NODE_ENV === "DEVELOPMENT" } = options;

  fastify.setErrorHandler((error, request, reply) => {
    // Log all errors for debugging and monitoring
    fastify.log.error(error);

    if (error instanceof ApiError) {
      return reply
        .status(error.statusCode ?? 500)
        .send(error);
    }

    if (error.validation) {
      const validationError = new ApiError(
        400,
        "Validation error",
        "VALIDATION_ERROR",
        error.validation
      );
      return reply
        .status(validationError.statusCode)
        .send(validationError.toJSON());
    }

    const serverError = new InternalServerError(
      "An unexpected error occurred",
      "INTERNAL_SERVER_ERROR",
      showStackTrace ? { stack: error.stack } : undefined
    );

    return reply
      .status(serverError.statusCode)
      .send(serverError.toJSON());
  });
}, {
  name: "error-handler"
}); 