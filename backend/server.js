import express from "express"
import cors from 'cors'
import connectCloudinary from "./src/config/cloudinary.js";
import 'dotenv/config'
import connectDB from "./src/config/mongodb.js";
import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";
import authroutes from "./src/routes/auth.js";

// app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()
connectDB()

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

// Initializing Routers
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.use("/api/auth", authroutes);

app.get("/", (req, res) => res.send("API Working"))

app.listen(port, () => console.log(`Server started on ${port}`))