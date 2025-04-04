import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    id: localStorage.getItem("id") || 1,
    title: "",
    description: "",
    email: "",
    range: 0,
    valid: true,
  });
  const [circle, setCircle] = useState(false);

  const handleFromData = (e) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCircle(true);

    let err = validate(formData);

    if (err.title || err.email) {
      alert("Please fill the required fields");
      // alert("Please fill the title field");
      setCircle(false);
      return;
    } else {
      console.log(e.target.value);

      const data = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : [];
      console.log(formData);
      data.push(formData);
      localStorage.setItem("id", JSON.parse(localStorage.getItem("id")) + 1);
      localStorage.setItem("data", JSON.stringify(data));
      setCircle(false);
      history("/");
    }
  };

  const validate = (formData) => {
    const { title, description, email } = formData;
    const errors = {};
    if (!title) {
      errors.title = "Title is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }
    return errors;
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
      width={"90%"}
      m={"auto"}
    >
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Form</h2>
          <TextField
            type="number"
            id="id"
            label="Id"
            variant="outlined"
            title="id"
            name="id"
            readOnly
            placeholder="Enter Id"
            fullWidth
            value={localStorage.getItem("id") || 1}
            onChange={handleFromData}
            required
          />
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            title="title"
            name="title"
            placeholder="Enter Title"
            fullWidth
            value={formData?.title}
            onChange={handleFromData}
            required
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            title="description"
            name="description"
            placeholder="Enter Description"
            fullWidth
            value={formData?.description}
            onChange={handleFromData}
          />
          <TextField
            required
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            title="email"
            name="email"
            placeholder="Enter Email"
            fullWidth
            value={formData?.email}
            onChange={handleFromData}
          />
          <Box m={"auto"} p={2}>
            <Slider
              defaultValue={0}
              required
              aria-label="Range"
              name="range"
              title="range"
              valueLabelDisplay="auto"
              value={formData?.range}
              onChange={handleFromData}
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                value={formData?.valid}
                required
                name="valid"
              />
            }
            label="Valid"
          />

          {circle ? (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type="submit"
              className="button"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
