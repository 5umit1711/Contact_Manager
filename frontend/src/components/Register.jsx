import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../hooks/axiosInstance";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      navigate("/"); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const {data} = await axiosInstance.post("/api/register", formData);
        if(data.success){
            toast.success(data.message);
            navigate("/login");
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        console.log("Error in registration frontend", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }} className="mt-10">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
        </form>
        <p className="mt-2">
          Already have an account{" "}
          <Link to="/login" className="underline ml-3">
            Login
          </Link>
        </p>
      </Box>
    </Container>
  );
};

export default Register;
