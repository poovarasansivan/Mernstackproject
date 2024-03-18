import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

const pieParams = { height: 280, margin: { right: 5 } };
const palette = [
  "#ff6384",
  "#36a2eb",
  "#ffcd56",
  "#4bc0c0",
  "#ff7f50",
  "#b0e0e6",
  "#9966cc",
  "#f08080",
  "#4682b4",
  "#90ee90",
  "#d3d3d3",
  "#ffa07a",
  "#87cefa",
  "#32cd32",
  "#6366f1",
  "#a78bfa",
  "#da70d6",
  "#ff8c00",
  "#40e0d0",
  "#ff69b4",
  "#1e90ff",
  "#f0e68c",
  "#add8e6",
  "#d2b48c",
  "#87ceeb",
  "#fa8072",
  "#778899",
  "#20b2aa",
  "#6495ed",
  "#ff4500",
  "#e9967a",
  "#4682b4",
  "#d8bfd8",
  "#00ff7f",
  "#bdb76b",
  "#87cefa",
  "#48d1cc",
  "#f4a460",
  "#afeeee",
  "#ffa07a",
  "#9370db",
  "#3cb371",
  "#66cdaa",
  "#ba55d3",
  "#2e8b57",
  "#ff6347",
  "#8a2be2",
  "#556b2f",
  "#ff8c00",
  "#4682b4",
  "#9932cc",
  "#8b4513",
  "#b0c4de",
  "#008080",
  "#800000",
  "#6a5acd",
  "#ff69b4",
  "#4169e1",
];

export default function Chartcountry() {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetchData();
    fetchregion();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5555/getcountry");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchregion = async () => {
    try {
      const response = await fetch("http://localhost:5555/getregion");
      const region = await response.json();
      setRegion(region);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Country
                </Typography>
                <Box>
                  <PieChart
                    series={[
                      {
                        data: data.map((item) => ({
                          name: item.country,
                          value: item.percentage,
                        })),
                      },
                    ]}
                    colors={palette}
                    {...pieParams}
                  />
                </Box>
                <Grid container spacing={1} justifyContent="space-between">
                  {data.map((item, index) => (
                    <Grid item key={index}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: palette[index],
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: 1,
                        }}
                      />
                      <Typography variant="caption">{item.country}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Region
                </Typography>
                <Box>
                  <PieChart
                    series={[
                      {
                        data: region.map((item) => ({
                          name: item.region,
                          value: item.percentage,
                        })),
                      },
                    ]}
                    colors={palette}
                    {...pieParams}
                  />
                </Box>
                <Grid container spacing={1} justifyContent="space-between">
                  {region.map((item, index) => (
                    <Grid item key={index}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: palette[index],
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: 1,
                        }}
                      />
                      <Typography variant="caption">{item.region}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
