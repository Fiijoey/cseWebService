const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Fiifi:Fiifi@cluster0.kdphu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema for the professional profile
const professionalSchema = new mongoose.Schema({
  professionalName: String,
  base64Image: String,
  nameLink: {
    firstName: String,
    url: String,
  },
  primaryDescription: String,
  workDescription1: String,
  workDescription2: String,
  linkTitleText: String,
  linkedInLink: {
    text: String,
    link: String,
  },
  githubLink: {
    text: String,
    link: String,
  },
});

// Create a model
const Professional = mongoose.model("Professional", professionalSchema);

// REST endpoint to serve the professional data from MongoDB
app.get("/professional", async (req, res) => {
  try {
    const data = await Professional.findOne(); // Retrieve the first document in the collection
    if (!data) {
      return res.status(404).json({ error: "No professional data found" });
    }
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
