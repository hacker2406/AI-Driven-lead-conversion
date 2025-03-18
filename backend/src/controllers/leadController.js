const Lead = require("../models/Lead");


exports.createLead = async (req, res) => {
  const { productId, type, message, score } = req.body;
  // req.user is added by auth middleware
  try {
    const lead = await Lead.create({
      user: req.user._id,
      product: productId,
      type,
      message,
      score  // Include the score here
    });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error creating lead" });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ user: req.user._id }).populate("product", "name");
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads" });
  }
};
