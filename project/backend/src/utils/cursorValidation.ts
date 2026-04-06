export function validateLimit(limit?: string): number {
  let parsedLimit = parseInt(limit || "10");
  if (parsedLimit > 50) {
    return 50;
  } else {
    return parsedLimit;
  }
}

export function validateCursor(cursor?: string): number {
  let parsedCursor = parseInt(cursor ?? "0");
  return parsedCursor;
}
