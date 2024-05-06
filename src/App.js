import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import AllOutput from "./pages/AllOutput";
import PortDetail from "./pages/PortDetails";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/allOutput" element={<AllOutput />} />
        <Route path="/port/:portNumber" element={<PortDetail />} />{" "}
        {/* Correct route */}
      </Routes>
    </Router>
  );
}

export default App;
