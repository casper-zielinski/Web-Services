import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Post API",
      version: "1.0.0",
      description: "A simple Express Post Feed API",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local Dev Server with Versioning",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.ts"), path.join(__dirname, "../routes/*.js")],
};
