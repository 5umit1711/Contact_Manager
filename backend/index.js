import express from "express"
import connection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cors from "cors"

const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.send("Hello");
})

app.use("/api", userRoutes);
app.use("/api", contactRoutes);

app.listen(PORT, async()=>{
    await connection();
    console.log("Server started");
})