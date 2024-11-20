import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FileUpload } from 'primereact/fileupload'; // PrimeReact FileUpload
import Papa from 'papaparse'; // CSV Parser
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  // Function to handle CSV file upload and parsing
  const handleFileUpload = (e) => {
    const file = e.files[0]; // Get the first uploaded file

    // Parse the CSV using PapaParse
    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data;

        // Dynamically set columns based on the CSV headers
        const dynamicColumns = Object.keys(parsedData[0]).map((header) => {
          return <Column key={header} field={header} header={header} />;
        });

        setColumns(dynamicColumns); // Set columns
        setData(parsedData); // Set data
      },
      header: true, // Set to true to treat the first row as headers
      skipEmptyLines: true, // Skip empty lines
    });
  };
  

  return (
    <div className="App">
      <h1>EO-Sensor</h1>

      {/* File Upload Component */}
      <FileUpload
  name="demo"
  customUpload
  uploadHandler={handleFileUpload}
  accept=".csv"
  maxFileSize={1000000}
  chooseLabel="Choose CSV File"
  uploadLabel="Upload"
  cancelLabel="Cancel"
  auto
  onUpload={e => console.log("Upload completed:", e)}  // Logs when upload is complete
  onError={e => console.log("Upload error:", e)}  // Logs upload errors

      />

      {/* DataTable to display CSV data */}
      {data.length > 0 && (
        <div className="datatable-container">
          <DataTable
            value={data}
            paginator
            rows={10}
            className="p-mt-3"
            resizableColumns
            columnResizeMode="fit"
            style={{ maxWidth: '80%' }} // Limit table width to 80% of the container
          >
            {columns}
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default App;
