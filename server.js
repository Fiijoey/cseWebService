const express = require('express');
const app = express();
const port = 8080;

const professionalData = {
  professionalName: "John Doe",
  base64Image: "base64ImageStringHere", // Replace with actual base64 string
  nameLink: {
    firstName: "John",
    url: "https://example.com"
  },
  primaryDescription: "A brief introduction about John Doe.",
  workDescription1: "Work description part one.",
  workDescription2: "Work description part two.",
  linkTitleText: "Find me here:",
  linkedInLink: {
    text: "Visit LinkedIn",
    link: "https://linkedin.com/in/johndoe"
  },
  githubLink: {
    text: "Visit GitHub",
    link: "https://github.com/johndoe"
  }
};

app.get('/professional', (req, res) => {
  res.json(professionalData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
