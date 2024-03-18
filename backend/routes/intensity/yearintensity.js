import express from "express";
import Data from "../../models/data.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Data.aggregate([
      {
        $match: { start_year: { $ne: "" } } // Filter out documents with empty start_year
      },
      {
        $group: {
          _id: "$start_year", 
          totalIntensity: { $sum: "$intensity" }, 
        },
      },
      {
        $project: {
          _id: 0, 
          startYear: { $toInt: "$_id" }, // Convert startYear from string to integer
          totalIntensity: 1, 
        },
      },
      {
        $sort: { startYear: 1 } // Sort by startYear in ascending order
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
