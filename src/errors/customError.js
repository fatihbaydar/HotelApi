const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
  name = "CustomError";
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  constructor(message = "Something went wrong", status) {
    super(message);
    this.statusCode = status;
  }
}

class NotFoundError extends Error {
  name = "NotFoundError";
  statusCode = StatusCodes.NOT_FOUND;
  constructor(message = "Not found") {
    super(message);
  }
}

class BadRequestError extends Error {
  name = "BadRequestError";
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(message = "Data is invalid") {
    super(message);
  }
}
class UnauthorizedError extends Error {
  name = "UnauthorizedError";
  statusCode = StatusCodes.UNAUTHORIZED;
  constructor(message = "Invalid Credentials") {
    super(message);
  }
}
class ForbiddenError extends Error {
  name = "ForbiddenError";
  statusCode = StatusCodes.FORBIDDEN;
  constructor(message = "You have no permission") {
    super(message);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  CustomError,
  UnauthorizedError,
  ForbiddenError,
};
