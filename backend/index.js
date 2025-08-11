import express from "express";
import multer from "multer";
import { Client } from "@gradio/client";
import cors from "cors";

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/predict", upload.single("file"), async (req, res) => {
  console.log("📩 /api/predict endpoint hit");

  try {
    // 1️⃣ Check if file is received
    if (!req.file) {
      console.warn("⚠ No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log("📄 File received:", req.file.originalname, req.file.mimetype);

    // 2️⃣ Create Blob from file buffer
    const fileBlob = new Blob([req.file.buffer], { type: req.file.mimetype });

    // 3️⃣ Connect to Hugging Face Space
    console.log("🔌 Connecting to Hugging Face Space...");
    const client = await Client.connect("amirfaishal/cse-ats-score-generator");

    // 4️⃣ Call the Space's predict endpoint
    console.log("⚙ Sending file for prediction...");
    const result = await client.predict("/predict", { file: fileBlob });

    console.log("📊 Raw result.data from Hugging Face:", result.data);

    // 5️⃣ Extract score and tips from the response
    let score = 0;
    let tips = [];

    if (Array.isArray(result.data) && result.data.length > 0) {
      const firstItem = result.data[0];

      if (firstItem?.score !== undefined) {
        score = parseFloat(firstItem.score);
        if (isNaN(score)) score = 0;
      }

      if (Array.isArray(firstItem.tips)) {
        tips = firstItem.tips;
      }
    }

    console.log("✅ Final score and tips to send:", score, tips);

    // 6️⃣ Send JSON with score and tips
    res.json({ score, tips });
  } catch (error) {
    console.error("❌ Prediction error:", error);
    res.status(500).json({ error: "Prediction failed", details: error.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
