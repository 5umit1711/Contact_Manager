import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../hooks/axiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
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
    const {data} = await axiosInstance.post("/api/login", formData);
    if(data.success){
        toast.success(data.message);
        localStorage.setItem("email", data.email);
        // console.log(data)
        navigate("/");
    }else{
        toast.error(data.message);
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
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
            Login
          </Button>
        </form>
        <p className="mt-2">
          Don't have an account{" "}
          <Link to="/register" className="underline ml-3">
            Register
          </Link>
        </p>
      </Box>
    </Container>
  );
};

export default Login;
