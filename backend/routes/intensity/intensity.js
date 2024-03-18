import express from "express";
import Data from "../../models/data.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    // Aggregate pipeline to calculate the average intensity
    const intensityAverage = await Data.aggregate([
      {
        $group: {
          _id: null,
          averageIntensity: { $avg: "$intensity" } // Calculate the average intensity
        }
      }
    ]);

    // Extracting the average intensity from the result
    const averageIntensity = intensityAverage.length > 0 ? intensityAverage[0].averageIntensity : 0;

    // Rounding off the average intensity to three decimal places
    const roundedAverageIntensity = averageIntensity.toFixed(3);

    // Sending the rounded average intensity as a response
    return response.status(200).json({ averageIntensity: parseFloat(roundedAverageIntensity) });
  } catch (error) {
    console.error("Error getting intensity average:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
