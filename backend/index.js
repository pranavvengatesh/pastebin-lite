import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import pasteRoutes from "./routes/pasteRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Health check
app.get("/api/healthz", (req, res) => {
  res.json({ ok: mongoose.connection.readyState === 1 });
});

// Mount router
app.use("/api", pasteRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
