import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && (
        <AppBar position="fixed" style={{ backgroundColor: "#f0f0f0" }}> {/* Light grey */} 
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontWeight: "bold",
                }}
              >
                Contact Management System
              </Link>
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              style={{
                backgroundColor: "#ff6f61", // Logout button color
                color: "#ffffff",
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <main style={{ marginTop: isAuthPage ? "0" : "30px" }}>
        {children}
      </main>
    </>
  );
};

export default AppLayout;
