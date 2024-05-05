import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

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

  const deleteDonation = (donationId) => {
    axios
      .delete(
        `http://localhost:${
          import.meta.env.VITE_APP_PORT
        }/donations/${donationId}`
      )
      .then((res) => {
        alert("Uspješno ste izbrisali donaciju!");
        location.reload();
      })
      .catch((err) => {
        console.error("progreska pri brisanju donacije: ", err);
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
