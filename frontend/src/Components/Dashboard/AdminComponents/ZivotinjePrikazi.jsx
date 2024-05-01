import { useState } from "react";
import { Button } from "../../Register/Register";

function ZivotinjePrikazi({ animals }) {
  const [editingRows, setEditingRows] = useState({});
  const [newAnimalDetails, setNewAnimalDetails] = useState({});

  const handleToggleEditing = (animal) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [animal._id]: !prevEditingRows[animal._id],
    }));
  };

  const handleInputChange = (e, animalId, key) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewAnimalDetails((prevDetails) => ({
      ...prevDetails,
      [animalId]: {
        ...prevDetails[animalId],
        [key]: value,
      },
    }));
  };

  const handleFinishEditing = (animalId) => {
    console.log(
      "New inputs for animal with ID",
      animalId,
      ":",
      newAnimalDetails[animalId]
    );
    handleToggleEditing(animalId);
  };

  return (
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
          <th>Ime</th>
          <th>Vrsta</th>
          <th>Dob</th>
          <th>Opis</th>
          <th>Čipiran</th>
          <th>Zadnji pregled</th>
        </tr>
      </thead>
      <tbody>
        {animals.map((animal) => (
          <tr style={{ textAlign: "center" }} key={animal._id}>
            <td>
              {editingRows[animal._id] ? (
                <input
                  value={newAnimalDetails[animal._id]?.name || animal.name}
                  onChange={(e) => handleInputChange(e, animal._id, "name")}
                />
              ) : (
                animal.name
              )}
            </td>
            <td>
              {editingRows[animal._id] ? (
                <select
                  value={newAnimalDetails[animal._id]?.type || animal.type}
                  onChange={(e) => handleInputChange(e, animal._id, "type")}
                >
                  <option>Pas</option>
                  <option>Macka</option>
                  <option>Ptica</option>
                  <option>Gmizavac</option>
                  <option>Ostalo</option>
                </select>
              ) : (
                animal.type
              )}
            </td>
            <td>
              {editingRows[animal._id] ? (
                <input
                  type="number"
                  value={newAnimalDetails[animal._id]?.age || animal.age}
                  onChange={(e) => handleInputChange(e, animal._id, "age")}
                />
              ) : (
                animal.age
              )}
            </td>
            <td>
              {editingRows[animal._id] ? (
                <input
                  type="text"
                  value={
                    newAnimalDetails[animal._id]?.description ||
                    animal.description
                  }
                  onChange={(e) =>
                    handleInputChange(e, animal._id, "description")
                  }
                />
              ) : (
                animal.description
              )}
            </td>
            <td>
              {editingRows[animal._id] ? (
                <input
                  type="checkbox"
                  checked={
                    newAnimalDetails[animal._id]?.chipped || animal.chipped
                  }
                  onChange={(e) => handleInputChange(e, animal._id, "chipped")}
                />
              ) : animal.chipped ? (
                "Yes"
              ) : (
                "No"
              )}
            </td>
            <td>
              {editingRows[animal._id] ? (
                <input
                  type="date"
                  value={
                    newAnimalDetails[animal._id]?.lastCheckup ||
                    animal.lastCheckup
                  }
                  onChange={(e) =>
                    handleInputChange(e, animal._id, "lastCheckup")
                  }
                />
              ) : (
                new Date(animal.lastCheckup).toLocaleDateString()
              )}
            </td>
            <td>
              <Button
                onClick={() => {
                  if (editingRows[animal._id]) {
                    handleFinishEditing(animal._id);
                  } else {
                    handleToggleEditing(animal);
                  }
                }}
              >
                {editingRows[animal._id] ? "Završi" : "Uredi"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ZivotinjePrikazi;
