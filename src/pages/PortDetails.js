import React from "react";
import { useLocation } from "react-router-dom";

const PortDetail = () => {
  const location = useLocation();
  const port = location.state || {};
  console.log(port); // Log the entire port object

  return (
    <div>
      <h1>Port Detail</h1>
      <h2>Filename: {port.filename}</h2>
      <pre>{port.content}</pre>
      {/* Render other properties of the port object as needed */}
    </div>
  );
};

export default PortDetail;
