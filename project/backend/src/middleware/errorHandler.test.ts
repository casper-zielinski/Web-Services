import { describe, it, expect, vi } from "vitest";
import { globalErrorHandler } from "./errorHandler.js";

describe("Global Error Handler", () => {
  it("Database Error Test", () => {
    const req = {} as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;
    const next = vi.fn();
    const error = new Error("Datenbank kaputt");

    globalErrorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Datenbank kaputt", status: "error" }),
    );
  });

  it("Unknown Error (null)", () => {
    const req = {} as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;
    const next = vi.fn();
    const error: unknown = null;

    globalErrorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Internal Server Error",
        error: "Unknown Error",
      }),
    );
  });
});
