import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Import your PNG images
import Insight from "../assets/insight.png";
import Intensity from "../assets/intensity.png";
import Contribution from "../assets/contribution.png";

const cardData = [
  {
    id: 1,
    heading: "Total Insights",
    word: "Insight",
    image: Insight,
    description: "well meaning and kindly.",
  },
];
const cardData2 = [
  {
    id: 2,
    heading: "Intensity and Likelihood",
    word: "Overall Intensity",
    image: Intensity,
    description: "An example sentence.",
  },
];
const cardData3 = [
  {
    id: 3,
    heading: "Relevance",
    word: "test",
    image: Contribution,
    description: "Average of Relevance",
  },
];

export default function Cardmodel() {
  const [overallCount, setOverallCount] = useState(null);
  const [insightname, setInsightname] = useState([]);
  const [insightIndex, setInsightIndex] = useState(0);
  const [averageIntensity, setaverageIntensity] = useState([]);
  const [averageRelevance, setaverageRelevance] = useState([]);

  useEffect(() => {
    fetchOverallCount();
    fetchinsightname();
    fetchAverageIntensity();
    fetchAverageRelevance();
  }, []);

  useEffect(() => {
    if (insightname.length > 0) {
      const intervalId = setInterval(() => {
        setInsightIndex((prevIndex) => (prevIndex + 1) % insightname.length);
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [insightname]);

  const fetchinsightname = async () => {
    try {
      const response = await fetch("http://localhost:5555/getinsightname");
      const data = await response.json();
      setInsightname(data);
    } catch (error) {
      console.error("Error in fetching insightnames:", error);
    }
  };

  const fetchOverallCount = async () => {
    try {
      const response = await fetch("http://localhost:5555/insightcount");
      const data = await response.json();
      setOverallCount(data.overallTotalCount);
    } catch (error) {
      console.error("Error fetching overall count:", error);
    }
  };

  const fetchAverageIntensity = async () => {
    try {
      const response = await fetch("http://localhost:5555/getintensity");
      const data = await response.json();
      setaverageIntensity(data);
    } catch (error) {
      console.error("Error fetching average intensity:", error);
    }
  };

  const fetchAverageRelevance = async () => {
    try {
      const response = await fetch("http://localhost:5555/getrelevance");
      const data = await response.json();
      setaverageRelevance(data);
    } catch (error) {
      console.error("Error fetching average relevance:", error);
    }
  };

  const getNextInsight = () => {
    if (insightname.length === 0) return "Loading..."; // Or any placeholder text
    const nextInsight = insightname[insightIndex];
    return nextInsight;
  };

  return (
    <Box className="flex flex-wrap justify-center gap-4">
      {cardData.map((card) => (
        <Card
          key={card.id}
          className="w-full sm:w-80 md:w-96 p-1 mb-4 flex items-center"
          sx={{ backgroundColor: "rgb(129 140 248);" }}
        >
          <CardContent className="flex-grow">
            <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
              {card.heading}
            </Typography>
            <Typography variant="h5" component="div" color="white">
              {card.word === "Insight" && overallCount !== null
                ? overallCount
                : card.word}
            </Typography>
            <Typography variant="body2" color="white">
              {card.word === "Insight" && overallCount !== null
                ? getNextInsight()
                : card.description}
            </Typography>
          </CardContent>
          <Box className="flex-shrink-0 shadow-3xl ml-1 mr-6 mb-1">
            <img
              src={card.image}
              alt="Icon"
              style={{ width: "80px", height: "80px" }}
            />
          </Box>
        </Card>
      ))}
      {cardData2.map((card) => (
        <Card
          key={card.id}
          className="w-full sm:w-80 md:w-96 p-1 mb-4 flex items-center"
          sx={{ backgroundColor: "rgb(129 140 248);" }}
        >
          <CardContent className="flex-grow">
            <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
              {card.heading}
            </Typography>
            <Typography variant="h5" component="div" color="white">
              {card.word === "Insight" && averageIntensity !== null
                ? card.word
                : averageIntensity.averageIntensity}
            </Typography>
            {card.word === "Overall Intensity" && averageIntensity !== null && (
              <>
                <Typography variant="body2" color="white">
                  {card.word}
                </Typography>
              </>
            )}
          </CardContent>
          <Box className="flex-shrink-0 shadow-3xl ml-1 mr-6 mb-1">
            <img
              src={card.image}
              alt="Icon"
              style={{ width: "80px", height: "80px" }}
            />
          </Box>
        </Card>
      ))}
      {cardData3.map((card) => (
        <Card
          key={card.id}
          className="w-full sm:w-80 md:w-96 p-1 mb-4 flex items-center"
          sx={{ backgroundColor: "rgb(129 140 248);" }}
        >
          <CardContent className="flex-grow">
            <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
              {card.heading}
            </Typography>
            <Typography variant="h5" component="div" color="white">
              {card.word === "Insight" && averageRelevance !== null
                ? card.word
                : averageRelevance.averagerelevance}
            </Typography>
            <Typography variant="body2" color="white">
              {card.word === "Insight" && overallCount !== null
                ? getNextInsight()
                : card.description}
            </Typography>
          </CardContent>
          <Box className="flex-shrink-0 shadow-3xl ml-1 mr-6 mb-1">
            <img
              src={card.image}
              alt="Icon"
              style={{ width: "80px", height: "80px" }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
}
