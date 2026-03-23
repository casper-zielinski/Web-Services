import type { NextFunction, Request, Response } from "express";

export async function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  if (err instanceof Error) {
    return res.status(500).json({
      status: "error",
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  res.status(500).json({
    error: err,
    message: "Internal Server Error",
  });
}
