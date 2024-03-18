import React from "react";
import Card from "../components/cardmodel.js"; // Assuming Card component location
import Country from "../components/country.js";
import Map from "../components/map.js";
export default function DashBoard() {
  return (
    <div className="flex">
      <div style={{ flex: 1, padding: "10px" }}>
        <div className="flex flex-wrap justify-start ml-0 gap-4">
          <Card />
          <Country />
          <Map />
        </div>
      </div>
    </div>
  );
}
