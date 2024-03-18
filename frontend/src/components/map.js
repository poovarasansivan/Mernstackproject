import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";

const sizing = {
  margin: { right: 5 },
  width: 590, // Adjusted width
  height: 380, // Adjusted height
  legend: { hidden: true },
};

const getArcLabel = (params, TOTAL) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

export default function PieChartWithCustomizedLabel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSectorData = async () => {
      try {
        const response = await fetch("http://localhost:5555/sectorsfreq");
        const sectorsData = await response.json();
        const transformedData = sectorsData.map(
          ({ sector, percentage }, index) => ({
            label: sector,
            value: parseFloat(percentage.replace("%", "")),
            color: getRandomColor(index),
          })
        );
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getSectorData();
  }, []);

  const TOTAL = data.reduce((total, item) => total + item.value, 0);

  const getRandomColor = (index) => {
    const colors = [
      "#2196F3",
      "#4CAF50",
      "#FF9800", // Orange
      "#9C27B0", // Purple
      "#FF5722", // Deep Orange
      "#E91E63", // Pink
      "#795548", // Brown
      "#607D8B", // Blue Grey
      "#FFEB3B", // Yellow
      "#CDDC39", // Lime
      "#00BCD4", // Cyan
      "#FFC107", // Amber
      "#3F51B5", // Indigo
      "#8BC34A", // Light Green
      "#FF5252", // Red
      "#9E9E9E", // Grey
      "#673AB7", // Deep Purple
      "#FF4081", // Pink
      "#00E676", // Green Accent
      "#FFAB40", // Orange Accent
      "#7C4DFF", // Purple Accent
      // Add more colors as needed
    ];
    return colors[index % colors.length]; // Use modulo to cycle through colors
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Sectors
        </Typography>
        <PieChart
          series={[
            {
              outerRadius: 190,
              data,
              arcLabel: () => "", // Empty function to hide percentage labels
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontSize: 14,
            },
          }}
          {...sizing}
        />
      </CardContent>
    </Card>
  );
}
