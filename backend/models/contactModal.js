import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required:true,
    },
    jobTitle:{
        type: String,
        required: true,
    }
})

const Contacts = mongoose.model("Contacts", contactSchema);

export default Contacts;