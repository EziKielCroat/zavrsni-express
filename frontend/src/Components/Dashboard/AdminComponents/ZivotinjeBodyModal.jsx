import styled from "styled-components";
import { useState } from "react";

import { Button, Input, Label } from "../../Shared/shared";

const AnimalTypeSelect = styled.select``;
const AnimalTypeOption = styled.option``;

function ZivotinjeBodyModal({ sendAnimalDetails }) {
  const [animalDetails, setAnimalDetails] = useState({
    name: "",
    type: "",
    age: 0,
    description: "",
    chipped: false,
    adopted: false,
    lastCheckup: new Date(),
  });

  const checkAnimalDetails = () => {
    if (
      animalDetails.name &&
      animalDetails.type &&
      animalDetails.age &&
      animalDetails.description
    ) {
      sendAnimalDetails(animalDetails);
      setAnimalDetails({
        name: "",
        type: "",
        age: 0,
        description: "",
        chipped: false,
        lastCheckup: new Date(),
      });
    } else {
      // implementiraj toast , nepravilni podaci upisani za upis životinje
    }
  };

  const changeDetails = (newValue, property) => {
    setAnimalDetails((oldUserInfo) => ({
      ...oldUserInfo,
      [property]: newValue,
    }));
  };

  return (
    <>
      <Label>Ime životinje: </Label>
      <Input
        type="text"
        value={animalDetails.name}
        onChange={(e) => {
          changeDetails(e.target.value, "name");
        }}
      />
      <Label>Vrsta životinje</Label>
      <AnimalTypeSelect
        value={animalDetails.type}
        onChange={(e) => {
          changeDetails(e.target.value, "type");
        }}
        defaultValue="Pas"
      >
        <AnimalTypeOption>Pas</AnimalTypeOption>
        <AnimalTypeOption>Macka</AnimalTypeOption>
        <AnimalTypeOption>Ptica</AnimalTypeOption>
        <AnimalTypeOption>Gmizavac</AnimalTypeOption>
        <AnimalTypeOption>Ostalo</AnimalTypeOption>
      </AnimalTypeSelect>
      <Label>Dob životinje: </Label>
      <Input
        type="number"
        value={animalDetails.age}
        onChange={(e) => {
          changeDetails(e.target.value, "age");
        }}
      />
      <Label>Opis životinje: </Label>
      <Input
        type="text"
        value={animalDetails.description}
        onChange={(e) => {
          changeDetails(e.target.value, "description");
        }}
      />
      <Label>Čipiran/na? </Label>
      <Input
        type="checkbox"
        value={animalDetails.chipped}
        onChange={(e) => {
          changeDetails(e.target.value, "chipped");
        }}
      />
      <Label>Zadnji pregled? </Label>
      <Input
        type="date"
        value={animalDetails.lastCheckup}
        onChange={(e) => {
          changeDetails(e.target.value, "lastCheckup");
        }}
      />
      <Label>Udomljen/a? </Label>
      <Input
        type="checkbox"
        value={animalDetails.adopted}
        onChange={(e) => {
          changeDetails(e.target.value, "adopted");
        }}
      />
      <Button
        onClick={() => {
          checkAnimalDetails();
        }}
      >
        Upiši životinju
      </Button>
    </>
  );
}

export default ZivotinjeBodyModal;
