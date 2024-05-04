import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "../../Register/Register";

function Upiti() {
  const [queries, setQueries] = useState([]);

  const deleteQuery = (queryId) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };
  
      axios.delete(`http://localhost:${import.meta.env.VITE_APP_PORT}/requests/${queryId}`, config)
        .then(res => {
          alert("Upit je uspješno obrisan!");
          location.reload();
        })
        .catch(err => console.error(err));
  }

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/requests`, config)
      .then(res => {
        setQueries(res.data.sviUpiti);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Queries:</h2>
      <table style={{
        width: "100%",
        backgroundColor: "#dddddd",
        borderRadius: "6px",
        padding: "15px",
      }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
        {queries.map(query => (
            <tr style={{textAlign: "center"}} key={query._id}>
              <td>{query.name}</td>
              <td>{query.email}</td>
              <td>{query.message}</td>
              <td><Button onClick={() => {deleteQuery(query._id)}}>Izbriši</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Upiti;
