const express = require("express");
const router = express.Router();
const { summarizeWithAI } = require("../controllers/aiController"); // ✅ Correct Import

// 🔥 API Route
router.post("/summarize", summarizeWithAI);

module.exports = router;
