import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
const port = 8080;
const urldb =
  "mongodb+srv://Fiifi:fiifi@cluster0.kdphu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB

mongoose
  .connect(urldb, clientOptions)

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
const Professional = mongoose.model(
  "Professional",
  professionalSchema,
  "profiles"
);

// REST endpoint to serve the professional data from MongoDB
app.get("/professional", async (req, res) => {
  try {
    const data = await Professional.findOne(); // Fetch the first document
    console.log("Query Result:", data);
    if (!data) {
      return res.status(404).json({ error: "No professional data found" });
    }
    res.json(data);
  } catch (err) {
    console.error("Error fetching professional data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/professional`);
});
