const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("hello");
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI; // Use environment variable
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define port
const PORT = process.env.PORT || 5000; // Use environment variable for port
app.listen(PORT, () => console.log(`App started at port ${PORT}...`));
