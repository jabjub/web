import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./Details.css"; // Ensure this file is created and contains relevant styles

const Details = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const port = params.get("port");
  const filename = params.get("filename");
  const content = params.get("content");

  return (
    <div className="details">
      <h1>Port Details</h1>
      {port ? (
        <div>
          <h2>Port: {port}</h2>
          {filename && <p>Filename: {filename}</p>}
          {content && <pre>{content}</pre>}
        </div>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
};

export default Details;
