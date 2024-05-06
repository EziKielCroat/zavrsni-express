import styled from "styled-components";
import axiosInstance from "../../../axiosInstance";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Modal from "../../Shared/Modal";
import ModalBody from "../../Donations/ModalBody";
import TrazimoDonacije from "./TrazimoDonacije";
import NudiSeDonacije from "./NudiSeDonacije";
import DoniranoDonacije from "./DoniranoDonacije";

import { Button } from "../../Shared/shared";

const DonationsWrapper = styled.div`
  height: 60vh;
  width: auto;
  background: #fff;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
  overflow-y: auto;
`;

const notifySucess = (msg) => toast.success(msg);
const notify = (msg) => toast.error(msg);

function Donations() {
  const [modalOpen, setModalOpen] = useState(false);

  const [offeredDonations, setOfferedDonations] = useState([]);
  const [inNeedDonations, setInNeedDonations] = useState([]);
  const [donatedDonations, setDonatedDonations] = useState([]);

  const sendDonationDetails = (donationDetails) => {
    axiosInstance
      .post(`/donations`, donationDetails)
      .then((res) => {
        notifySucess("Vaša donacija je uspješno zapisana.");
        setTimeout(() => {
          location.reload();
        }, 500);
        setModalOpen(!modalOpen);
      })
      .catch((err) => {
        notify(`Pogreška pri upisivanju donacije ${err.message}`);
      });
  };

  const updateDonationStatus = (donationId, newDonationStatus) => {
    axiosInstance
      .patch(`/donations/${donationId}`, { donationStatus: newDonationStatus })
      .then((res) => {
        notifySucess("Uspješno ste ažurirali status donacije!");
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => {
        notify(`Pogreška pri ažuriranju donacije ${err.message}`);
      });
  };

  const deleteDonation = (donationId) => {
    axiosInstance
      .delete(`/donations/${donationId}`)
      .then((res) => {
        notifySucess("Uspješno ste izbrisali donaciju!");
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => {
        notify(`Pogreška pri brisanju donacije ${err.message}`);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/donations/offered`)
      .then((response) => {
        if (response.status === 200) {
          setOfferedDonations([]);
        } else {
          setOfferedDonations(response.data.allDonationsOfType);
        }
      })
      .catch((error) => {
        notify(`Pogreška dohvaćanju nuđenih donacija ${error.message}`);
      });

    axiosInstance
      .get(`/donations/inNeed`)
      .then((response) => {
        if (response.status === 200) {
          setInNeedDonations([]);
        } else {
          setInNeedDonations(response.data.allDonationsOfType);
        }
      })
      .catch((error) => {
        notify(`Pogreška dohvaćanju traženih donacija ${error.message}`);
      });

    axiosInstance
      .get(`/donations/donated`)
      .then((response) => {
        if (response.status === 200) {
          setDonatedDonations([]);
        } else {
          setDonatedDonations(response.data.allDonationsOfType);
        }
      })
      .catch((error) => {
        notify(`Pogreška dohvaćanju doniranih donacija ${error.message}`);
      });
  }, []);

  return (
    <>
      <DonationsWrapper>
        <Button
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
        >
          Donirajte!
        </Button>

        <TrazimoDonacije
          donations={inNeedDonations}
          updateDonationStatus={updateDonationStatus}
          deleteDonation={deleteDonation}
        />
        <NudiSeDonacije
          donations={offeredDonations}
          updateDonationStatus={updateDonationStatus}
        />
        <DoniranoDonacije
          donations={donatedDonations}
          updateDonationStatus={updateDonationStatus}
          deleteDonation={deleteDonation}
        />
      </DonationsWrapper>
      {modalOpen && (
        <Modal
          title={"Donirajte što možete!"}
          onClose={() => {
            setModalOpen(!modalOpen);
          }}
        >
          <ModalBody sendDonationDetails={sendDonationDetails} />
        </Modal>
      )}
    </>
  );
}

export default Donations;
