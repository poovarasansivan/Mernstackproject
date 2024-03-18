import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { green } from '@mui/material/colors';

export default function Country() {
  const [country, setcountry] = useState([]);

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      const response = await fetch("https://mernstackproject-apis.vercel.app/getsectors");
      const data = await response.json();
      console.log(data);
      setcountry(data);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  console.log(country);

  return (
    <Paper variant="outlined">
      <Typography variant="h6" align="start" sx={{ mt: 2, mb: 2, ml: 2 }}>
        {/* <span style={{ marginLeft: "auto", marginRight: "16px" }}>
          <MoreVertIcon />
        </span> */}
        Topic And Titles
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 520,
          bgcolor: "white",
          maxHeight: "420px",
          overflowY: "auto",
          padding: 1,
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
        }}
      >
        {country.map((country, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: green[500] }}>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={country.topic} secondary={country.title} />
            </ListItem>
            {index !== country.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
