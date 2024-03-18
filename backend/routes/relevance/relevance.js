import express from "express";
import Data from "../../models/data.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const Relevance = await Data.aggregate([
      {
        $group: {
          _id: null,
          averagerelevance: { $avg: "$relevance" }
        }
      }
    ]);

    const averagerelevance = Relevance.length > 0 ? Relevance[0].averagerelevance : 0;

    const roundedrelevance = averagerelevance.toFixed(3);

    return response.status(200).json({ averagerelevance: parseFloat(roundedrelevance) });
  } catch (error) {
    console.error("Error getting intensity average:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
