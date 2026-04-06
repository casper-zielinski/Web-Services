import { describe, it, expect } from "vitest";
import { validateCursor, validateLimit } from "./cursorValidation.js";

describe("limit query validator", () => {
  it("limit should return a max value of 50", () => {
    expect(validateLimit("9999")).toBe(50);
  });

  it("limit should be '10' by default", () => {
    expect(validateLimit("wrong type")).toBe(10);
  });

  it("limit should not be negative", () => {
    expect(validateLimit("-100")).toBe(50);
  });
});

describe("cursor query validator", () => {
  it("cursor should not be negativ", () => {
    expect(validateCursor("-100")).toBe(100);
  });
  it("cursor should be 0 be deafault", () => {
    expect(validateCursor("wrong type")).toBe(0);
  });
});
