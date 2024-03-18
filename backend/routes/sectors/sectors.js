import express from "express";
import Data from "../../models/data.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // Step 1: Aggregate data to count occurrences of each sector
        const sectorFrequency = await Data.aggregate([
            { $group: { _id: "$sector", count: { $sum: 1 } } }
        ]);

        // Step 2: Calculate the total count of documents
        const totalCount = await Data.countDocuments();

        // Step 3: Calculate the percentage of each sector based on its count
        const sectorPercentages = sectorFrequency.map(sector => ({
            name: sector._id,
            percentage: (sector.count / totalCount) * 100
        }));

        // Step 4: Format the response with sector name and percentage
        const formattedResponse = sectorPercentages.map(sector => ({
            sector: sector.name,
            percentage: sector.percentage.toFixed(2) + "%"
        }));

        // Step 5: Send the formatted response to the client
        res.json(formattedResponse);
    } catch (error) {
        // If error occurs, send an error response
        res.status(500).json({ message: error.message });
    }
});

export default router;
