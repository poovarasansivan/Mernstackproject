import express, { response } from "express";
import Data from "../../models/data.js";

const router = express.Router();

// Create a new record
router.post("/data", async (request, response) => {
  try {
    // Validate request body
    const requiredFields = [
      "end_year",
      "intensity",
      "sector",
      "topic",
      "insight",
      "url",
      "region",
      "start_year",
      "impact",
      "added",
      "published",
      "country",
      "relevance",
      "pestle",
      "source",
      "title",
      "likelihood",
    ];
    const missingFields = requiredFields.filter(
      (field) => !request.body[field]
    );
    if (missingFields.length > 0) {
      return response.status(400).send({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Create a new Data document using the Data model
    const newRecord = new Data(request.body);
    const data = await newRecord.save();
    return response.status(201).send(data);
  } catch (error) {
    console.error("Error in creating new record:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

// Get all data
router.get("/", async (request, response) => {
  try {
    const data = await Data.find({});
    return response.status(200).json(data);
  } catch (error) {
    console.error("Error getting data:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

// Get data by end_year
router.get("/getdata/:end_year", async (request, response) => {
  try {
    const { end_year } = request.params;
    const data = await Data.find({ end_year });
    return response.status(200).json(data);
  } catch (error) {
    console.error("Error getting data by end_year:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

// Update a record
router.put("/updatedata/:end_year", async (request, response) => {
  try {
    const { end_year } = request.params;
    const updatedData = await Data.findOneAndUpdate(
      { end_year },
      request.body,
      { new: true }
    );
    if (!updatedData) {
      return response.status(404).json({ message: "Data not found" });
    }
    return response
      .status(200)
      .json({ message: "Data updated successfully", updatedData });
  } catch (error) {
    console.error("Error updating data:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

// Delete a record
router.delete("/data/:end_year", async (request, response) => {
  try {
    const { end_year } = request.params;
    const deletedData = await Data.findOneAndDelete({ end_year });
    if (!deletedData) {
      return response.status(404).json({ message: "Data not found" });
    }
    return response.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
