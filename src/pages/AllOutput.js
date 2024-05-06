import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllOutput.css"; // Import CSS file for styling

const AllOutput = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/allData")
      .then((response) => response.json())
      .then((data) => {
        setScans(data);
      })
      .catch((err) => console.error("Error fetching scans:", err));
  }, []);

  const getOpenPorts = (ipAddress) => {
    const openPorts = {
      tcp: [],
      udp: [],
    };

    scans.forEach((scan) => {
      const ip = Object.keys(scan)[0];
      if (ip === ipAddress) {
        const portData = scan[ip][3].scans;
        //console.log(portData);
        portData.forEach((port) => {
          const portNumber = Object.keys(port)[0];
          const portInfo = port[portNumber];

          let filename = null; // Define filename here
          let content = null; // Define content here

          if (
            portInfo &&
            typeof portInfo === "object" &&
            portInfo[0].filename
          ) {
            if (portInfo[0].filename.endsWith(".txt")) {
              console.log(portInfo);
              filename = portInfo[0].filename;
              content = portInfo[0].content;
            }
          }

          if (portNumber.startsWith("tcp")) {
            if (filename && content) {
              openPorts.tcp.push({
                port: portNumber,
                filename: filename,
                content: content,
              });
            } else {
              openPorts.tcp.push({ port: portNumber });
            }
          } else if (portNumber.startsWith("udp")) {
            if (filename && content) {
              openPorts.udp.push({
                port: portNumber,
                filename: filename,
                content: content,
              });
            } else {
              openPorts.udp.push({ port: portNumber });
            }
          }
        });
      }
    });

    return openPorts;
  };

  return (
    <div className="allOutput">
      <h1 className="header">All Output Tool</h1>
      <section className="outputSection">
        {scans.map((scan, index) => {
          const ipAddress = Object.keys(scan)[0];
          const { tcp, udp } = getOpenPorts(ipAddress);
          return (
            <div className="entry" key={index}>
              <div className="entryHeader">
                <h3>{ipAddress}</h3>
              </div>
              <div className="entryContent">
                <div className="portSection">
                  <h4>TCP Ports:</h4>
                  {tcp.map((port, idx) => {
                    //////////////////////////////////////////////////console.log(port); // Add this line
                    return (
                      <Link
                        key={idx}
                        to={{
                          pathname: `/port/${port.port}`,
                          state: port, // Pass the entire port object
                        }}
                        className="portBadge"
                      >
                        {port.port}
                      </Link>
                    );
                  })}
                </div>
                {udp.map((port, idx) => (
                  <Link
                    key={idx}
                    to={{
                      pathname: `/port/${port.port}`,
                      state: port, // Pass the entire port object
                    }}
                    className="portBadge"
                  >
                    {port.port}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default AllOutput;
