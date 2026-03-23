import express from "express";
import postController from "./routes/postsController.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();
const apiUrl = `/api/v1`;

app.use(express.json());
app.use(cors());

app.use(apiUrl, postController);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get(`${apiUrl}/health`, (_, res) => {
  try {
    return res.json({ status: "OK" });
  } catch (error) {
    return res.json({ status: "ERROR", error: error });
  }
});

app.use(globalErrorHandler)