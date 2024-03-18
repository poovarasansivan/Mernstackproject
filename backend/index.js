import express, { request, response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import GetRoute from "./routes/getdata/getdata.js";
import GetCount from "./routes/insight/insightcount.js";
import Insightname from "./routes/insightnames/getinsightname.js";
import Intensity from "./routes/intensity/intensity.js";
import Relevance from "./routes/relevance/relevance.js";
import Topics from "./routes/topics/topics.js";
import YearIntensity from "./routes/intensity/yearintensity.js"
import Sector from "./routes/sectors/sectors.js";
import Country from "./routes/country/country.js";
import Region from "./routes/region/region.js";
import City from "./routes/city/city.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware

app.get("/", async (request, response) => {
  console.log(request);
  response.status(200).send("Welcome TO Mern Stack Tec");
});

app.use("/getdata", GetRoute);

app.use("/insightcount", GetCount);

app.use("/getinsightname", Insightname);

app.use("/getintensity", Intensity);

app.use("/getrelevance", Relevance);

app.use("/getsectors",Topics);

app.use("/sectorsfreq",Sector);

app.use("/Intensityyear",YearIntensity);

app.use("/getcountry",Country);

app.use("/getregion",Region);

app.use("/getcity",City);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App running on PORT:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error in connecting to database:", error);
  });
