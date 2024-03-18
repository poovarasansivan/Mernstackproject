import express, { request, response } from "express";
import Data from "../../models/data.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const totalregion = await Data.aggregate([
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 }, // Count total number of documents
        },
      },
    ]);

    const totalCount = totalregion.length > 0 ? totalregion[0].totalCount : 0;

    const result = await Data.aggregate([
      {
        $group: {
          _id: "$region",
          count: { $sum: 1 }, // Count documents for each country
        },
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          percentage: {
            $round: [
              { $multiply: [{ $divide: ["$count", totalCount] }, 100] },
              2,
            ], // Round off to 2 decimal places
          },
        },
      },
    ]);

    response.json(result);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
