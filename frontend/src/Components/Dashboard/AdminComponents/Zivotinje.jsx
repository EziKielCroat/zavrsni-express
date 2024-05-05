import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "../../Shared/shared";
import Modal from "../../Shared/Modal";
import ZivotinjeBodyModal from "./ZivotinjeBodyModal";
import ZivotinjePrikazi from "./ZivotinjePrikazi";

function Zivotinje() {
  const [modalOpen, setModalOpen] = useState(false);
  const [allAnimals, setAllAnimals] = useState([]);

  const toggleModal = (newState) => {
    setModalOpen(newState);
  };

  const sendAnimal = (animalDetails) => {
    axios
      .post(
        `http://localhost:${import.meta.env.VITE_APP_PORT}/animals`,
        animalDetails
      )
      .then((res) => {
        alert("Uspješno ste upisali životinju");
        toggleModal(!modalOpen);
        location.reload();
      })
      .catch((err) => {
        console.error(err);
        // implementiraj toast
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:${import.meta.env.VITE_APP_PORT}/animals`)
      .then((res) => {
        if (res.data.sveZivotinje) {
          setAllAnimals(res.data.sveZivotinje);
        }
      })
      .catch((err) => {
        console.error(err);
        // implementiraj toast
      });
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          toggleModal(!modalOpen);
        }}
        style={{ marginBottom: "16px" }}
      >
        Upiši novu životinju!
      </Button>

      {allAnimals && <ZivotinjePrikazi animals={allAnimals} />}

      {modalOpen && (
        <Modal
          title="Upiši novu životinju"
          onClose={() => {
            toggleModal(!modalOpen);
          }}
        >
          <ZivotinjeBodyModal sendAnimalDetails={sendAnimal} />
        </Modal>
      )}
    </>
  );
}

export default Zivotinje;
