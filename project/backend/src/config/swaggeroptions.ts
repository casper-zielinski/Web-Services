import path from "path";

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
  apis: [path.join(process.cwd(), "src/swagger/*.yaml")],
};
