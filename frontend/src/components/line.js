import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Line() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5555/Intensityyear");
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (apiData.length === 0) {
    return <div>Loading...</div>;
  }

  const xLabels = apiData.map((entry) => entry.startYear);
  const yData = apiData.map((entry) => entry.totalIntensity);

  const barColors = ["rgb(129 140 248)"];

  // Calculate the maximum value for the y-axis
  const maxYValue = Math.max(...yData);

  // Calculate the y-axis tick values
  const yAxisTickValues = Array.from(
    { length: Math.ceil(maxYValue / 50) + 1 },
    (_, index) => index * 50
  );

  return (
    <div className="w-full">
      <Card variant="outlined" className="w-full">
        <CardContent>
          <div className="chart-container" style={containerStyle}>
            <BarChart
              width={1200}
              height={400}
              series={[
                {
                  data: yData,
                  label: "Intensity",
                  id: "valueId",
                },
              ]}
              xAxis={[{ data: xLabels, scaleType: "band" }]}
              yAxis={[{ tickValues: yAxisTickValues }]} // Set y-axis tick values
              colors={barColors}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// CSS styles
const containerStyle = {
  width: "100%",
  overflowX: "auto",
  maxHeight: "400px",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "thin",
  scrollbarColor: "white #cbd5e1",
  scrollbarTrackheight: "2px",
};
