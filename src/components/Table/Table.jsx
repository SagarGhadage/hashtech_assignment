import { Button } from '@mui/material';
import React from 'react'
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
  return (
    <div>
      <Button variant="contained" color="primary" onClick={
        () => history("/form")
      }>
        Add New Data
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
          {rows.map((row, index) => (
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
        <p>Total Rows: {rows.length}</p>
    </div>
    </div>
  )
}
