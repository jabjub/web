const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// Define the paths to the folders
const baseFolder = path.resolve(process.env.HOME + "/Downloads");
const resultsFolder = path.join(baseFolder, "/results");
const nestedResultsFolder = path.join(resultsFolder, "/results");

// Route to execute the provided command
app.post("/api/executeProvidedCommand", (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: "Command is required" });
  }

  // Set the working directory to the base results folder before executing the command
  const options = { cwd: resultsFolder };

  // Execute the provided command with the specified options
  exec(command, options, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return res.status(500).json({ error: "Command execution failed" });
    }
    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
      return res.status(400).json({ error: "Command execution error" });
    }

    console.log(`Command stdout: ${stdout}`);
    res.status(200).json({ result: stdout });
  });
});

// Route to serve data from all files and directories under the base results folder
app.get("/api/allData", (req, res) => {
  function readFilesAndDirectoriesRecursively(directory) {
    const items = fs.readdirSync(directory);
    const data = [];

    items.forEach((item) => {
      const itemPath = path.join(directory, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        const subdirectoryData = readFilesAndDirectoriesRecursively(itemPath);
        data.push({ [item]: subdirectoryData });
      } else {
        const fileContent = fs.readFileSync(itemPath, "utf8");
        data.push({ filename: item, content: fileContent });
      }
    });

    return data;
  }

  const allData = readFilesAndDirectoriesRecursively(nestedResultsFolder);
  res.json(allData);
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
