import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import Home from "./components/Home";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import AppLayout from "./components/AppLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route
          path="/contacts"
          element={
            <AppLayout>
              <Contacts />
            </AppLayout>
          }
        />
        <Route
          path="/add-contact"
          element={
            <AppLayout>
              <AddContact />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
