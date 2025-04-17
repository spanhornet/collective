// Fastify
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

interface LoggerOptions {
  level?: string;
}

export default fp(async (fastify: FastifyInstance, options: LoggerOptions = {}) => {
  const { level = "info" } = options;
  fastify.log.level = level;

  // Log incoming requests with relevant metadata
  fastify.addHook("onRequest", (request, reply, done) => {
    request.log.info({
      url: request.url,
      method: request.method,
      id: request.id,
      ip: request.ip,
      headers: {
        "user-agent": request.headers["user-agent"],
        "content-type": request.headers["content-type"],
      },
    }, "incoming request");
    done();
  });

  // Log completed responses with timing and status information
  fastify.addHook("onResponse", (request, reply, done) => {
    request.log.info({
      url: request.url,
      method: request.method,
      statusCode: reply.statusCode,
      responseTime: reply.elapsedTime,
    }, "request completed");
    done();
  });

  // Log errors with relevant debugging information
  fastify.addHook("onError", (request, reply, error, done) => {
    request.log.error({
      url: request.url,
      method: request.method,
      statusCode: reply.statusCode,
      error: {
        message: error.message,
        name: error.name,
        stack: process.env.NODE_ENV === "DEVELOPMENT" ? error.stack : undefined,
      },
    }, "request error");
    done();
  });
}, {
  name: "logger"
}); 