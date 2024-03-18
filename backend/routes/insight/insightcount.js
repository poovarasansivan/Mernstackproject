import express from "express";
import Data from "../../models/data.js";

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const insightCounts = await Data.aggregate([
            // Stage 1: Get overall total count
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 }
                }
            }
        ]);

        // Extract the total count from the result
        const overallTotalCount = insightCounts.length > 0 ? insightCounts[0].totalCount : 0;

        const result = {
            overallTotalCount
        };

        response.json(result);
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
