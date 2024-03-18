import express from "express";
import Data from "../../models/data.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const data = await Data.find({});

    // Extract unique insight names
    const insightNames = [...new Set(data.map((entry) => entry.insight))];

    return response.status(200).json(insightNames);
  } catch (error) {
    console.error("Error getting data:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
