import mongoose from "mongoose";
const mongoURL = "mongodb+srv://sumit1711kd:1XXU2f0hAlFiVd89@cluster0.7iffx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connection = async()=>{
    try {
        await mongoose.connect(mongoURL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error in connecting database", error);
    }
}

export default connection;