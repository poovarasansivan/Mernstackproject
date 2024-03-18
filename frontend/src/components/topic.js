import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useState, useEffect } from "react";
import { HOST } from "../services/api.js";
const Overalldata = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5555/getdata"); // Adjust the URL based on your backend API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // Replace empty values with "No data" for the specific column
      const modifiedData = data.map((item) => ({
        ...item,
        // Check if the sector column is empty, if so, replace it with "No data"
        sector: item.sector ? item.sector : "No data",
        topic: item.topic ? item.topic : "No data",
        region: item.region ? item.region : "No data",
        country: item.country ? item.country : "No data",
        pestle: item.pestle ? item.pestle : "No data",
        end_year: item.end_year ? item.end_year : "No data",
        source: item.source ? item.source : "No data",
        city: item.city ? item.city : "No data",
      }));
      setRowData(modifiedData);
      console.log(modifiedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Serial No.",
        valueGetter: "node.rowIndex + 1",
        editable: false,
      },
      { field: "sector", editable: true },
      { field: "topic", editable: true },
      { field: "region", editable: true },
      { field: "country", editable: true },
      { field: "pestle", headerName: "Country PEST", editable: true },
      { field: "end_year", headerName: "End Year", editable: true },
      { field: "source", editable: true },
      { field: "city", editable: true },
      // Add other columns as needed
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
    }),
    []
  );

  return (
    <div className="ag-theme-quartz" style={{ height: 650 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={50}
        paginationPageSizeSelector={[50, 500, 1000]}
        loadingOverlay={loading ? true : false}
      />
      <style>
        {`
          .ag-theme-quartz .ag-header {
            background-color: white;
            --ag-header-cell-hover-background-color: #e0e7ff;
          }

          .ag-theme-quartz .ag-paging-panel,
          .ag-theme-quartz .ag-paging-page-summary-panel {
            background-color: white;
            border-top: 1px solid #ccc;
          }

          .ag-theme-quartz .ag-paging-page-summary-panel select {
            background-color: white;
            border: 1px solid #ccc;
            outline: none;
          }

          .ag-theme-quartz .ag-paging-button {
            background-color: white;
            border: 1px solid #ccc;
          }

          .ag-theme-quartz .ag-paging-button:hover {
            background-color: #a5b4fc;
          }

          .ag-theme-quartz .ag-paging-input {
            background-color: white;
            border: 1px solid #ccc;
          }

          .ag-theme-quartz .ag-paging-input:focus {
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

export default Overalldata;
