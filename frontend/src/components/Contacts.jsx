import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axiosInstance from "../hooks/axiosInstance";
import { toast } from "react-toastify";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getAllContacts = async () => {
    const userEmail = localStorage.getItem("email");
    const { data } = await axiosInstance.get("/api/contacts", {
      params: { userEmail },
    });
    setContacts(data.contacts);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setOpenDialog(true);
  };

  const handleDelete = async (contactId) => {
    try {
      await axiosInstance.delete(`/api/contacts/${contactId}`);
      getAllContacts();
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log("Error deleting contact", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingContact(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(
        `/api/contacts/${editingContact._id}`,
        editingContact
      );
      getAllContacts();
      handleCloseDialog();
      toast.success("Contact updated successfully");
    } catch (error) {
      console.log("Error updating contact", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getAllContacts();
  }, []);

  const paginatedContacts = filteredContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="min-h-screen bg-[#e8f0f2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Typography
          variant="h4"
          className="text-center text-4xl font-semibold text-gray-800 mb-8"
        >
          Contacts List
        </Typography>

        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-6"
        />

        <TableContainer
          component={Paper}
          className="shadow-md rounded-lg overflow-hidden mt-4 bg-white"
        >
          <Table className="min-w-full text-gray-800">
            <TableHead>
              <TableRow className="bg-pink-100">
                <TableCell className="px-6 py-4 font-semibold text-white">
                  Name
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-white">
                  Email
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-white">
                  Phone Number
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-white">
                  Job Title
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-white">
                  Company
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-white">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedContacts.map((contact) => (
                <TableRow
                  key={contact._id}
                  className="hover:bg-[#f0f8ff] transition-all duration-200"
                >
                  <TableCell className="px-6 py-4">{contact.name}</TableCell>
                  <TableCell className="px-6 py-4">{contact.email}</TableCell>
                  <TableCell className="px-6 py-4">
                    {contact.phoneNumber}
                  </TableCell>
                  <TableCell className="px-6 py-4">{contact.jobTitle}</TableCell>
                  <TableCell className="px-6 py-4">{contact.company}</TableCell>
                  <TableCell className="px-6 py-4 flex gap-2">
                    <IconButton
                      onClick={() => handleEdit(contact)}
                      className="hover:bg-[#1DB95433] transition duration-200 p-2 rounded-full"
                    >
                      <Edit style={{ color: "#1DB954" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(contact._id)}
                      className="hover:bg-red-200 transition duration-200 p-2 rounded-full"
                    >
                      <Delete style={{ color: "#e53935" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredContacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ page }) => `Page ${page + 1}`}
        />

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle className="bg-[#1DB954] text-white">
            Edit Contact
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={editingContact?.name || ""}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={editingContact?.email || ""}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phoneNumber"
              value={editingContact?.phoneNumber || ""}
              onChange={handleChange}
            />
            <TextField
              label="Job Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="jobTitle"
              value={editingContact?.jobTitle || ""}
              onChange={handleChange}
            />
            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              margin="normal"
              name="company"
              value={editingContact?.company || ""}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              style={{ backgroundColor: "#1DB954", color: "white" }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Contacts;
