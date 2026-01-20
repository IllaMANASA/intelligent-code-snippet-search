const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const snippetRoutes = require("./routes/snippetRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

//routes
app.use("/api/snippets", snippetRoutes);

app.get('/', (req,res) => {
    res.send("Backend is running!!");
})

app.listen(PORT,()=>{
    console.log(`Server running on Port: ${PORT}`);
});
