import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import toast from "react-hot-toast";

import { Button } from "../../Shared/shared";

const notifySucess = (msg) => toast.success(msg);
const notify = (msg) => toast.error(msg);

function Upiti() {
  const [queries, setQueries] = useState([]);

  const deleteQuery = (queryId) => {
    axiosInstance
      .delete(`/requests/${queryId}`)
      .then((res) => {
        notifySucess("Upit je uspješno obrisan!");
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => notify(`Pogreška pri brisanju upita ${err.message}`));
  };

  useEffect(() => {
    axiosInstance
      .get(`/requests`)
      .then((res) => {
        setQueries(res.data.allQueries);
      })
      .catch((err) => notify(`Pogreška pri dohvaćanju upita ${err.message}`));
  }, []);

  return (
    <div>
      <h2>Queries:</h2>
      <table
        style={{
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
          {queries.map((query) => (
            <tr style={{ textAlign: "center" }} key={query._id}>
              <td>{query.name}</td>
              <td>{query.email}</td>
              <td>{query.message}</td>
              <td>
                <Button
                  onClick={() => {
                    deleteQuery(query._id);
                  }}
                >
                  Izbriši
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Upiti;
