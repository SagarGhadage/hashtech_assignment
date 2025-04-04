import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Table() {
  const history = useNavigate();

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];
  const columns = [
    { id: "id", label: "Id" },
    { id: "title", label: "Title" },
    { id: "description", label: "Description" },
    { id: "email", label: "Email" },
    { id: "range", label: "Range" },
    { id: "valid", label: "Valid" },
  ]
  const rows = data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      email: item.email,
      range: item.range,
      valid: item.valid ? "True" : "False",
    };
  });
  const [filteredRows, setFilteredRows] = useState(rows);
  const filterValidRecords = () => {
    const validRows = rows.filter((row) => row.valid === "True");
    setFilteredRows(validRows);
  };

  const filterRangeRecords = () => {
    const rangeRows = rows.filter(
      (row) => row.range > 29 && row.range < 61
    );
    setFilteredRows(rangeRows);
  };
  const validRows = rows.filter((row) => row.valid === "True").length;
  return (
    <div>
      <Button variant="contained" color="primary" onClick={
        () => history("/form")
      }>
        Add New Data
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={filterValidRecords}
        style={{ marginLeft: "10px" }}
      >
        Show Valid Records
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={filterRangeRecords}
        style={{ marginLeft: "10px" }}
      >
        Show Range Records
      </Button>
      <table style={{ width: "100%", border: "1px solid black" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id} style={{ border: "1px solid black" }}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.id} style={{ border: "1px solid black" }}>
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table">
        <h2 className="title">Table</h2>
        <p>Total Records: {filteredRows.length}</p>
        <p>Valid Records: {validRows}</p>
        <p>Range Records: {filteredRows.filter((row) => row.range > 29 && row.range < 61).length}</p>

    </div>
    </div>
  )
}
