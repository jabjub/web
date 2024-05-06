const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import the cors middleware

const app = express();

app.use(cors()); // Enable CORS for all routes

// Resolve the '~/results' path to an absolute path
const resultsFolder = path.resolve(
  process.env.HOME + "/Downloads/results/results"
);

// Define a route to serve the data from all files and directories under the "results" folder
app.get("/api/allData", (req, res) => {
  // Function to read files and directories recursively
  function readFilesAndDirectoriesRecursively(directory) {
    const items = fs.readdirSync(directory);
    const data = [];

    items.forEach((item) => {
      const itemPath = path.join(directory, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        // Recursively read subdirectories
        const subdirectoryData = readFilesAndDirectoriesRecursively(itemPath);
        data.push({ [item]: subdirectoryData });
      } else {
        // Read file contents
        const fileContent = fs.readFileSync(itemPath, "utf8");
        data.push({ filename: item, content: fileContent });
      }
    });

    return data;
  }

  // Read data from all files and directories under the "results" folder
  const allData = readFilesAndDirectoriesRecursively(resultsFolder);

  // Send the data as a JSON response
  res.json(allData);
});

// Start the server on port 3002
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
