import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import { log } from "console";

dotenv.config();

const app = express();
const _dirname = path.resolve();


//middleware
if (process.env.VITE_PROJECT_MODE === "development") {
  app.use(cors());
}
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

const port = process.env.PORT || 5500;

if (process.env.VITE_PROJECT_MODE === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  });
}

connectToDB().then(() => {
  app.listen(port, () => {
    console.log("Server started at port: ", port);
  });
});
