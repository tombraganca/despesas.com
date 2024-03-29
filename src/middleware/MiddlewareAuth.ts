import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export function MiddlewareAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Token missing",
    });
  }

  if (/^Bearer$/i.test(authToken)) {
    return response.status(401).json({
      message: "Token malformatted",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const data = verify(token, config.SECRET_KEY);

    if (typeof data === "string") {
      return response.status(401).json({
        message: "Invalid token",
      });
    }

    const { id } = data;

    request.headers.userId = id;

    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
