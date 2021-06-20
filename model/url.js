const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
 {
  rawUrl: String,
  genLink: String,
 },
 { timestamps: true },
);

module.exports = mongoose.model("Url", UrlSchema);
