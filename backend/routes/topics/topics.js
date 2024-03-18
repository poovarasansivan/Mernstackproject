import express from "express";
import Data from "../../models/data.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // Fetch data from MongoDB using Mongoose
        const data = await Data.find({}, { topic: 1, title: 1, _id: 0 });

        // If data found, send it as a response
        res.status(200).json(data);
    } catch (error) {
        // If error occurs, send an error response
        res.status(500).json({ message: error.message });
    }
});

export default router;
