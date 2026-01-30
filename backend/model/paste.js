import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    default: null
  },
  maxViews: {
    type: Number,
    default: null
  },
  views: {
    type: Number,
    default: 0
  }
});

const Paste = mongoose.model("Paste", pasteSchema);
export default Paste;
