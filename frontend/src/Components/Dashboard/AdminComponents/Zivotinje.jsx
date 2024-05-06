import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";

import { Button } from "../../Shared/shared";
import Modal from "../../Shared/Modal";
import ZivotinjeBodyModal from "./ZivotinjeBodyModal";
import ZivotinjePrikazi from "./ZivotinjePrikazi";

const notifySucess = (msg) => toast.success(msg);
const notify = (msg) => toast.error(msg);

function Zivotinje() {
  const [modalOpen, setModalOpen] = useState(false);
  const [allAnimals, setAllAnimals] = useState([]);

  const toggleModal = (newState) => {
    setModalOpen(newState);
  };

  const sendAnimal = (animalDetails) => {
    axiosInstance
      .post(`/animals`, animalDetails)
      .then((res) => {
        notifySucess("Uspješno ste upisali životinju");
        toggleModal(!modalOpen);
        location.reload();
      })
      .catch((err) => {
        notify(`Pogreška pri upisivanju životinje ${err.message}`);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/animals`)
      .then((res) => {
        if (res.data.allAnimals) {
          setAllAnimals(res.data.allAnimals);
        }
      })
      .catch((err) => {
        notify(`Pogreška pri dohvaćanju životinje ${err.message}`);
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
