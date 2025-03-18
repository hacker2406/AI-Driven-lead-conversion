const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  type: { type: String, enum: ["review", "cancelled", "payment_confirmed"], required: true },
  message: String,
  // New field to store sentiment score from Hugging Face
  score: { type: String, enum: ["Hot", "Warm", "Cold"], default: "Cold" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", LeadSchema);
