const express = require("express");
const router = express.Router();
const { getLeads, createLead } = require("../controllers/leadController");
const { protect } = require("../middleware/authMiddleware");

// All lead routes are protected
router.post("/", protect, createLead);
router.get("/", protect, getLeads);

module.exports = router;
