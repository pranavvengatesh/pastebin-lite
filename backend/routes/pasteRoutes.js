import express from "express";
import mongoose from "mongoose";
import Paste from "../model/paste.js";

const router = express.Router();

// helper for TEST_MODE time
function getNow(req) {
  if (process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]) {
    return new Date(Number(req.headers["x-test-now-ms"]));
  }
  return new Date();
}

// ---------------- CREATE PASTE ----------------
router.post("/pastes", async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({ error: "Invalid content" });
  }

  let expiresAt = null;
  if (ttl_seconds) {
    if (!Number.isInteger(ttl_seconds) || ttl_seconds < 1) {
      return res.status(400).json({ error: "Invalid ttl_seconds" });
    }
    expiresAt = new Date(Date.now() + ttl_seconds * 1000);
  }

  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const paste = await Paste.create({
    content,
    expiresAt,
    maxViews: max_views || null
  });

  res.json({
    id: paste._id.toString(),
    url: `${req.protocol}://${req.get("host")}/p/${paste._id}`
  });
});

// ---------------- FETCH PASTE ----------------
router.get("/pastes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not found" });
    }

    const paste = await Paste.findById(id);
    if (!paste) {
      return res.status(404).json({ error: "Not found" });
    }

    const now = getNow(req);

    if (paste.expiresAt && now > paste.expiresAt) {
      return res.status(404).json({ error: "Expired" });
    }

    if (paste.maxViews && paste.views >= paste.maxViews) {
      return res.status(404).json({ error: "View limit exceeded" });
    }

    paste.views += 1;
    await paste.save();

    // 🔴 DISABLE CACHING (IMPORTANT)
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "Surrogate-Control": "no-store"
    });

    res.json({
      content: paste.content,
      remaining_views: paste.maxViews
        ? paste.maxViews - paste.views
        : null,
      expires_at: paste.expiresAt
    });
  } catch (err) {
    console.error("Error fetching paste:", err.message);
    return res.status(404).json({ error: "Not found" });
  }
});

export default router;
