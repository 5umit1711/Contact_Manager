import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axiosInstance from '../hooks/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
  const [contact, setContact] = useState({
    userEmail: localStorage.getItem("email"),
    name: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
    company: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/api/contacts", contact);
      if (data.success) {
        toast.success(data.message);
        navigate("/contacts");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in adding contacts", error);
    }
  };

  return (
    <div style={{ backgroundColor: '#e8f0f2', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600, color: '#333' }}>
          Add New Contact
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: '#ffffff',
            padding: 4,
            borderRadius: 3,
            boxShadow: 6,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: 10,
            },
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={contact.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#d3d3d3',
                },
                '&:hover fieldset': {
                  borderColor: '#8e8e8e',
                },
              },
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={contact.email}
            onChange={handleChange}
            fullWidth
            required
            type="email"
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#d3d3d3',
                },
                '&:hover fieldset': {
                  borderColor: '#8e8e8e',
                },
              },
            }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            value={contact.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            type="tel"
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#d3d3d3',
                },
                '&:hover fieldset': {
                  borderColor: '#8e8e8e',
                },
              },
            }}
          />
          <TextField
            label="Job Title"
            variant="outlined"
            name="jobTitle"
            value={contact.jobTitle}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#d3d3d3',
                },
                '&:hover fieldset': {
                  borderColor: '#8e8e8e',
                },
              },
            }}
          />
          <TextField
            label="Company"
            variant="outlined"
            name="company"
            value={contact.company}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#d3d3d3',
                },
                '&:hover fieldset': {
                  borderColor: '#8e8e8e',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              padding: '12px 24px',
              borderRadius: 2,
              fontSize: '16px',
              boxShadow: 3,
              backgroundColor: '#4caf50',
              '&:hover': {
                backgroundColor: '#388e3c',
                boxShadow: 6,
              },
            }}
          >
            Add Contact
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AddContact;
