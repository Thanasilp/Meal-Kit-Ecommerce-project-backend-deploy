import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

//Initialize
dotenv.config();
const app = express();
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

const allowedOrigins = [
  "https://jsd-admin.vercel.app", //admin
  "https://jsd-user.vercel.app", //user
  "http://localhost:5172", // For local development
  "http://localhost:5173", // For local development
];
// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or Authorization headers
  })
);

//when testing with api, put/api infront
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

//Checking Ecpress wheter it's working or not
const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("API is working");
});
app.listen(port, () => console.log(`Server is running on port : ${port}`));
