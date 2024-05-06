import styled from "styled-components";
import axiosInstance from "../../axiosInstance";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Navbar from "../Shared/Navbar";
import Modal from "../Shared/Modal";
import ModalBody from "./ModalBody";
import DonationTable from "./DonationTable";

import { Button } from "../Shared/shared";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
`;

const DonationsWrapper = styled.div`
  height: inherit;
  width: auto;
  background: #fff;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
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
        location.reload();
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
        notifySucess("Uspješno ste donirali!");
        location.reload();
      })
      .catch((err) => {
        notify(`Pogreška pri upisivanju statusa donacije ${err.message}`);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/donations/offered`)
      .then((response) => {
        if(response.status === 200) {
          setDonatedDonations([]);
        } else {
          setOfferedDonations(response.data.allDonationsOfType);
        }
      })
      .catch((error) => {
        notify(`Pogreška pri dohvaćanju nuđenih donacija ${error.message}`);
      });

    axiosInstance
      .get(`/donations/inNeed`)
      .then((response) => {
        if(response.status === 200) {
          setDonatedDonations([]);
        } else {
          setInNeedDonations(response.data.allDonationsOfType);
        }
      })
      .catch((error) => {
        notify(`Pogreška pri dohvaćanju traženih donacija ${error.message}`);
      });

    axiosInstance
      .get(`/donations/donated`)
      .then((response) => {
        if(response.status === 200) {
          setDonatedDonations([]);
        } else {
          setDonatedDonations(response.data.allDonationsOfType);
        }
      })
      .catch((error) => {
        notify(`Pogreška pri dohvaćanju doniranih donacija ${error.message}`);
      });
  }, []);

  return (
    <Wrapper id="modal-root">
      <Navbar />

      <DonationsWrapper>
        <Button
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
        >
          Donirajte!
        </Button>

        <DonationTable title="Nudi se" donations={offeredDonations} />
        <DonationTable
          title="Traži se"
          donations={inNeedDonations}
          updateDonationStatus={updateDonationStatus}
        />
        <DonationTable title="Donirano" donations={donatedDonations} />
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

    </Wrapper>
  );
}

export default Donations;
