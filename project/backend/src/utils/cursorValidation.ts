export function validateLimit(limit?: string): number {
  let parsedLimit = parseInt(limit || "10");
  if (isNaN(parsedLimit)) {
    return 10;
  }

  parsedLimit = Math.abs(parsedLimit);
  if (parsedLimit > 50) {
    return 50;
  } else {
    return isNaN(parsedLimit) ? 10 : parsedLimit;
  }
}

export function validateCursor(cursor?: string): number {
  let parsedCursor = parseInt(cursor ?? "-1");
  if (isNaN(parsedCursor) || parsedCursor <= 0) {
    return -1;
  }
  parsedCursor = Math.abs(parsedCursor);
  return parsedCursor;
}
