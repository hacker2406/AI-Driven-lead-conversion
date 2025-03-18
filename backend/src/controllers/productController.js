const Product = require("../models/Product");
const { createLead } = require("./leadController");
const axios = require("axios");

/**
 * Analyze sentiment using Hugging Face API.
 * @param {string} message - The text to analyze.
 * @returns {Promise<string>} - Returns "Hot", "Warm", or "Cold".
 */
async function analyzeSentiment(message) {
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment",
        { inputs: message },
        { headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` } }
      );
      
      console.log("Hugging Face Response:", JSON.stringify(response.data));
      
      // Expecting response.data to be an array with one element (an array of score objects)
      const scores = response.data[0];
      let maxScore = -1;
      let maxLabel = "";
      
      scores.forEach(item => {
        if (item.score > maxScore) {
          maxScore = item.score;
          maxLabel = item.label;
        }
      });
      
      console.log("Max Label:", maxLabel, "with score:", maxScore);
      
      // Use a flexible mapping; sometimes extra spaces or different casing might occur
      if (maxLabel.trim().toUpperCase().includes("2")) return "Hot";    // Positive sentiment
      if (maxLabel.trim().toUpperCase().includes("1")) return "Warm";   // Neutral sentiment
      if (maxLabel.trim().toUpperCase().includes("0")) return "Cold";   // Negative sentiment
      
      return "Unknown";
    } catch (error) {
      console.error("Hugging Face API error:", error);
      return "Unknown";
    }
  }
  
  // Get all products (simple list)
  exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  };

// Get all products (simple list)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Simulate product review with sentiment analysis.
// exports.reviewProduct = async (req, res) => {
//   const { productId } = req.params;
//   const { review, rating } = req.body; // rating: 1-5 scale
  
//   try {
//     // Use Hugging Face to analyze the review text.
//     const sentimentScore = await analyzeSentiment(review);
    
//     // Prepare lead data with sentiment results included.
//     const leadData = {
//       productId,
//       type: "review",
//       message: `Review submitted: ${review} (Rating: ${rating}). Sentiment: ${sentimentScore}.`,
//       score: sentimentScore
//     };
//     // Reassign req.body to contain our lead data.
//     req.body = leadData;
//     await require("./leadController").createLead(req, res);
//   } catch (error) {
//     res.status(500).json({ message: "Error processing review" });
//   }
// };


exports.reviewProduct = async (req, res) => {
    const { productId } = req.params;
    let { review, rating } = req.body; // rating: 1-5 scale
    
    try {
      // Use Hugging Face to analyze the review text.
      let sentimentScore = await analyzeSentiment(review);
      
      // If rating is below 4 and sentimentScore is "Hot", override it to "Warm"
      if (Number(rating) < 4 && sentimentScore === "Hot") {
        sentimentScore = "Warm";
      }
      
      // Prepare lead data including the (possibly adjusted) sentiment score.
      const leadData = {
        productId,
        type: "review",
        message: `Review submitted: ${review} (Rating: ${rating}). Sentiment: ${sentimentScore}.`,
        score: sentimentScore
      };
      // Overwrite req.body with lead data for createLead.
      req.body = leadData;
      await createLead(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error processing review" });
    }
  };

// Simulate payment cancellation
exports.cancelPayment = async (req, res) => {
  const { productId } = req.params;
  try {
    const leadData = {
      productId,
      type: "cancelled",
      message: "Payment was cancelled.",
      score: "Cold"  // fixed value for cancellation leads
    };
    req.body = leadData;
    await require("./leadController").createLead(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error processing payment cancellation" });
  }
};

// Simulate payment confirmation
exports.confirmPayment = async (req, res) => {
  const { productId } = req.params;
  try {
    const leadData = {
      productId,
      type: "payment_confirmed",
      message: "Payment has been confirmed. Thank you for your purchase!",
      score: "Hot"  // fixed value for confirmed payments
    };
    req.body = leadData;
    await require("./leadController").createLead(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error processing payment confirmation" });
  }
};

exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
      const product = new Product({ name, description, price });
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error creating product" });
    }
  };