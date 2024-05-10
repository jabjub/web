import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [isValidIp, setIsValidIp] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setIpAddress(value);
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    setIsValidIp(ipRegex.test(value));
  };

  const handleScanSubmit = async (e) => {
    e.preventDefault();

    if (!isValidIp) {
      alert("Please enter a valid IP address!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/api/startScan", {
        ipAddress,
      });

      const { commands } = response.data;
      console.log("Commands to execute:", commands);

      // Handle commands in your UI as needed
      if (commands && commands.length > 0) {
        await processCommands(commands);
      } else {
        alert("No commands to execute.");
      }
    } catch (error) {
      console.error("Error starting scan:", error);
      alert("Failed to start scan. Please try again.");
    }
  };

  const processCommands = async (commands) => {
    for (const command of commands) {
      const userChoice = prompt(
        `Command to execute:\n${command}\nType "EXECUTE" to execute, or "SKIP" to skip.`
      );

      if (!userChoice || userChoice.toUpperCase() === "SKIP") {
        console.log("Command skipped.");
      } else if (userChoice.toUpperCase() === "EXECUTE") {
        await executeCommand(command);
      } else {
        console.log("Invalid choice. Command skipped.");
      }
    }
  };

  const executeCommand = async (command) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/executeCommand",
        {
          command,
        }
      );

      const { nextCommand, output } = response.data;
      console.log("Command executed successfully. Next command:", nextCommand);
      console.log("Command output:", output);
    } catch (error) {
      console.error("Error executing command:", error);
      alert("Failed to execute command. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="input-container">
        <form onSubmit={handleScanSubmit}>
          <label className="input-label">Enter IP Address:</label>
          <input
            type="text"
            value={ipAddress}
            onChange={handleInputChange}
            placeholder="Enter IP address..."
            className="input-field"
          />
          <button
            type="submit"
            className="submit-button"
            style={{
              backgroundColor: isValidIp ? "#4caf50" : "#f44336",
              cursor: isValidIp ? "pointer" : "not-allowed",
            }}
            disabled={!isValidIp}
          >
            Start Scan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
