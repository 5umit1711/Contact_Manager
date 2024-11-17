import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/login");
    }
  }, [navigate]);

  const handleViewContacts = () => {
    navigate("/contacts");
  };

  const handleAddContact = () => {
    navigate("/add-contact");
  };

  return (
    <Container
      maxWidth="sm"
      className="flex justify-center items-center"
      style={{
        backgroundColor: "#f0f0f0",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          textAlign: "center",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#6a4c93",
            marginBottom: "16px",
          }}
        >
          Contact Management System
        </Typography>
        <Typography
          style={{
            fontSize: "1rem",
            color: "#64748b",
            marginBottom: "24px",
          }}
        >
          Manage your contacts with ease and efficiency.
        </Typography>
        <Box style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Button
            variant="contained"
            fullWidth
            style={{
              height: "48px",
              fontSize: "1.1rem",
              backgroundColor: "#90caf9",
              color: "#ffffff",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#64b5f6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#90caf9")}
            onClick={handleViewContacts}
          >
            View All Contacts
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              height: "48px",
              fontSize: "1.1rem",
              backgroundColor: "#81c784",
              color: "#ffffff",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#66bb6a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#81c784")}
            onClick={handleAddContact}
          >
            Add New Contact
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
