import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from './routes/userRoute.js';
import companyRoute from './routes/companyRoute.js';
import jobRoute from './routes/jobRoute.js';
import applicationRoute from './routes/applicationRoute.js';
import cloudinary from './utils/cloudinary.js'; 
dotenv.config();
const app = express();
import path from 'path';


// middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173', // Allows requests only from this frontend
    credentials: true // Allows browser ot sende cookies and authentication headers
}
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;


// Serve static frontend files
const __dirname = path.resolve();

// test api
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend!",
        success: true,
        name: "anant",
        city: "dhampur"
    })
})

// api 
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);


// serve all frontend files
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at port ${PORT}`);
})