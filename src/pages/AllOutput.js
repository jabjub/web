import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllOutput() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3002/api/allData');
        setAllData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const renderData = (data) => {
    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong>
            {item.type === 'file' && item.content && <pre>{item.content}</pre>}
            {item.type === 'directory' && renderData(item.contents)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="allOutput">
      <h1 style={{ margin: 0, padding: '10px', backgroundColor: 'rgb(56, 176, 0)', color: 'white' }}>All Output Tool</h1>
      <section className="outputSection" style={{ flex: 1, margin: '20px', padding: '20px', backgroundColor: '#fefae0', border: '2px solid #ccc', borderRadius: '5px', overflow: 'auto' }}>
        <div>
          {renderData(allData)}
        </div>
      </section>
    </div>
  );
}

export default AllOutput;
