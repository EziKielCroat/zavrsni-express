import styled from "styled-components";
import { Label } from "../Notifications/ModalBody";

const WindowWrapper = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 10px;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  border-radius: 8px;
  border: 1px solid #dddddd;
`;

const vrsteZivotinja = {
  Pas: "Pas",
  Macka: "Macka",
  Ptica: "Ptica",
  Gmizavac: "Gmizavac",
  Ostalo: "Ostalo",
};

function FilterWindow({
  filterPosition,
  setFilterOpen,
  originalAnimals,
  setAnimals,
  resetAnimals,
}) {
  const { x, y } = filterPosition;

  const filterAnimalsByAdoption = (adoptionFilter) => {
    const filteredAnimals = originalAnimals.filter(
      (animal) => animal.adopted === (adoptionFilter === "true")
    );
    setAnimals(filteredAnimals);
  };

  const filterAnimalsByType = (typeFilter) => {
    const filteredAnimals = originalAnimals.filter(
      (animal) => animal.type === typeFilter
    );
    setAnimals(filteredAnimals);
  };

  const handleClose = () => {
    resetAnimals();
    setFilterOpen(false);
  };

  return (
    <WindowWrapper x={x} y={y}>
      <Label>Status udomljenosti</Label>
      <select onChange={(e) => filterAnimalsByAdoption(e.target.value)}>
        <option value={"true"}>Udomljeni</option>
        <option value={"false"}>Ne udomljeni</option>
      </select>

      <Label>Vrsta zivotinje</Label>
      <select onChange={(e) => filterAnimalsByType(e.target.value)}>
        {Object.entries(vrsteZivotinja).map(([key, value]) => (
          <option key={key} value={value}>{key}</option>
        ))}
      </select> <br /> <br />
      <button onClick={handleClose}>Close</button>
    </WindowWrapper>
  );
}

export default FilterWindow;
