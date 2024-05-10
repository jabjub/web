const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const baseFolder = path.resolve(process.env.HOME + "/Downloads");
const resultsFolder = path.join(baseFolder, "/results");
const nestedResultsFolder = path.join(resultsFolder, "/results");
console.log(process.env.PATH);

const pty = require("node-pty");

app.get("/api/startScan", (req, res) => {
  const ipAddress = "10.3.20.50";

  const command =
    "/home/kali/.local/share/pipx/venvs/semiautorecon/bin/semiautorecon";
  const args = [ipAddress];
  const options = { cwd: resultsFolder };

  try {
    console.log("Command:", command);
    console.log("Arguments:", args);

    const shell = pty.spawn(command, args, {
      name: "xterm-color",
      cols: 80,
      rows: 30,
      cwd: resultsFolder,
      env: process.env,
    });

    let stdoutData = "";

    shell.on("data", (data) => {
      stdoutData += data;
      console.log("Semiautorecon stdout:", data.toString());
    });

    shell.on("exit", (code) => {
      console.log(`Semiautorecon exited with code ${code}`);
      console.log("Semiautorecon output:", stdoutData);

      const commands = parseSemiautoreconOutput(stdoutData);
      console.log("Parsed Commands:", commands);

      if (code !== 0) {
        return res
          .status(500)
          .json({ error: "Semiautorecon process exited with non-zero status" });
      }

      return res.send({ commands });
    });
  } catch (e) {
    console.error("Error occurred:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/executeCommand", (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: "Command is required" });
  }

  const childProcess = spawn(command, { shell: true });

  let stdoutData = "";
  let stderrData = "";

  childProcess.stdout.on("data", (data) => {
    stdoutData += data.toString();
  });

  childProcess.stderr.on("data", (data) => {
    stderrData += data.toString();
  });

  childProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(`Error executing command: ${stderrData}`);

      return res.status(500).json({ error: "Command execution failed" });
    }

    console.log(`Command output: ${stdoutData}`);
    res
      .status(200)
      .json({ message: "Command executed successfully", output: stdoutData });
  });
});

function parseSemiautoreconOutput(output) {
  const regex =
    /\[!\]\sSemiAutoRecon wants to execute the following command:\s(.+)\sType "EXECUTE" to execute this command, "SKIP" to skip it/g;
  const commands = [];
  let match;
  console.log("this is the output ", output);
  while ((match = regex.exec(output)) !== null) {
    commands.push(match[1]);
  }

  return commands;
}

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

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
