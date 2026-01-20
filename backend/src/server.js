const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req,res) => {
    res.send("Backend is running!!");
})

app.listen(PORT,()=>{
    console.log(`Server running on Port: ${PORT}`);
});
