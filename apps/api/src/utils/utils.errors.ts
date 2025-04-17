export interface ApiErrorResponse {
  statusCode: number;     // HTTP status code (404, 500, etc.)
  error: string;          // Error type (Not Found, Internal Server Error, etc.)
  message: string;        // Human-readable error message
  code: string;           // Machine-readable error code (RESOURCE_NOT_FOUND, etc.)
  details?: unknown;      // Optional additional context (validation errors, etc.)
}

export class ApiError extends Error {
  statusCode: number;     // HTTP status code to return
  code: string;           // Machine-readable error code
  details?: unknown;      // Optional additional context

  constructor(statusCode: number, message: string, code: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  // Convert error to JSON response format
  toJSON(): ApiErrorResponse {
    return {
      statusCode: this.statusCode,
      error: this.getErrorType(),
      message: this.message,
      code: this.code,
      ...(this.details ? { details: this.details } : {})
    };
  }

  // Get the error type string based on status code
  private getErrorType(): string {
    switch (this.statusCode) {
      case 400: return "Bad Request";
      case 401: return "Unauthorized";
      case 403: return "Forbidden";
      case 404: return "Not Found";
      case 409: return "Conflict";
      case 422: return "Unprocessable Entity";
      case 500:
      default: return "Internal Server Error";
    }
  }
}

// 400 Bad Request
// For invalid input, missing required parameters, etc.
export class BadRequestError extends ApiError {
  constructor(message: string, code = "BAD_REQUEST", details?: unknown) {
    super(400, message, code, details);
  }
}

// 401 Unauthorized
// When authentication is required but missing/invalid
export class UnauthorizedError extends ApiError {
  constructor(message = "Authentication required", code = "UNAUTHORIZED", details?: unknown) {
    super(401, message, code, details);
  }
}

// 403 Forbidden
// When user is authenticated but lacks permission
export class ForbiddenError extends ApiError {
  constructor(message = "Access denied", code = "FORBIDDEN", details?: unknown) {
    super(403, message, code, details);
  }
}

// 404 Not Found
// When a requested resource doesn't exist
export class NotFoundError extends ApiError {
  constructor(message = "Resource not found", code = "NOT_FOUND", details?: unknown) {
    super(404, message, code, details);
  }
}

// 409 Conflict
// When a request conflicts with current state (e.g., duplicate entry)
export class ConflictError extends ApiError {
  constructor(message: string, code = "CONFLICT", details?: unknown) {
    super(409, message, code, details);
  }
}

// 422 Unprocessable Entity
// For validation errors
export class ValidationError extends ApiError {
  constructor(message = "Validation failed", code = "VALIDATION_ERROR", details?: unknown) {
    super(422, message, code, details);
  }
}

// 500 Internal Server Error
// For unexpected server errors
export class InternalServerError extends ApiError {
  constructor(message = "An unexpected error occurred", code = "INTERNAL_SERVER_ERROR", details?: unknown) {
    super(500, message, code, details);
  }
}

// 500 Database Error
// For database-related errors
export class DatabaseError extends ApiError {
  constructor(message = "Database error occurred", code = "DATABASE_ERROR", details?: unknown) {
    super(500, message, code, details);
  }
} 