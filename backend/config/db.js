import mongoose from "mongoose";

const connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error in connecting database", error);
    }
}

export default connection;