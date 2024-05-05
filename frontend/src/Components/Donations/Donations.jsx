import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

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

function Donations() {
  const [modalOpen, setModalOpen] = useState(false);

  const [offeredDonations, setOfferedDonations] = useState([]);
  const [inNeedDonations, setInNeedDonations] = useState([]);
  const [donatedDonations, setDonatedDonations] = useState([]);

  const sendDonationDetails = (donationDetails) => {
    axios
      .post(
        `http://localhost:${import.meta.env.VITE_APP_PORT}/donations`,
        donationDetails
      )
      .then((res) => {
        alert("Vaša donacija je uspješno zapisana.");
        location.reload();
        setModalOpen(!modalOpen);
      })
      .catch((err) => {
        console.error("progreska pri upisivanju donacije: ", err);
        // implementiraj toast
      });
  };

  const updateDonationStatus = (donationId, newDonationStatus) => {
    axios
      .patch(
        `http://localhost:${
          import.meta.env.VITE_APP_PORT
        }/donations/${donationId}`,
        { donationStatus: newDonationStatus }
      )
      .then((res) => {
        alert("Uspješno ste donirali!");
        location.reload();
      })
      .catch((err) => {
        console.error("progreska pri upisivanju donacije: ", err);
        // implementiraj toast
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:${import.meta.env.VITE_APP_PORT}/donations/offered`
      )
      .then((response) => {
        setOfferedDonations(response.data.sveDonacijeTipa);
      })
      .catch((error) => {
        console.error("Error fetching offered donations:", error);
      });

    axios
      .get(`http://localhost:${import.meta.env.VITE_APP_PORT}/donations/inNeed`)
      .then((response) => {
        setInNeedDonations(response.data.sveDonacijeTipa);
      })
      .catch((error) => {
        console.error("Error fetching donations in need:", error);
      });

    axios
      .get(
        `http://localhost:${import.meta.env.VITE_APP_PORT}/donations/donated`
      )
      .then((response) => {
        setDonatedDonations(response.data.sveDonacijeTipa);
      })
      .catch((error) => {
        console.error("Error fetching donated donations:", error);
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
