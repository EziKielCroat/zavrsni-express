import styled from "styled-components";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Input, Button } from "../Shared/shared";
import { DONATION_STATUSES } from "./defaults";

const Label = styled.p`
  font-size: 14px;
  color: #483c58;
`;

const DonationTypeSelect = styled.select``;

const DonationOption = styled.option``;

const notify = (msg) => toast.error(msg);

function ModalBody({ sendDonationDetails }) {
  const [donationDetails, setDonationDetails] = useState({
    donationType: "",
    donationAmount: 0,
    donationDescription: "",
    donationStatus: DONATION_STATUSES.OFFERING,
  });

  const checkDonationDetails = () => {
    if (
      donationDetails.donationType &&
      donationDetails.donationAmount &&
      donationDetails.donationDescription
    ) {
      sendDonationDetails(donationDetails);
    } else {
      notify("Nepravilni podaci upisani za donaciju.")
    }
  };

  return (
    <>
      <Label>Vrsta vaše donacije: </Label>
      <DonationTypeSelect
        value={donationDetails.donationType}
        onChange={(e) => {
          setDonationDetails((prevDonationDetails) => ({
            ...prevDonationDetails,
            donationType: e.target.value,
          }));
        }}
      >
        <DonationOption value="hrana">Hrana</DonationOption>
        <DonationOption value="lijekovi">Lijekovi</DonationOption>
        <DonationOption value="igračke">Igračke</DonationOption>
        <DonationOption value="oprema">Oprema</DonationOption>
      </DonationTypeSelect>

      <Label>Iznos vaše donacije(€): </Label>
      <Input
        type="number"
        value={donationDetails.donationAmount}
        onChange={(e) => {
          setDonationDetails((prevDonationDetails) => ({
            ...prevDonationDetails,
            donationAmount: e.target.value,
          }));
        }}
      />

      <Label>Opis vaše donacije: </Label>
      <Input
        type="text"
        value={donationDetails.donationDescription}
        onChange={(e) => {
          setDonationDetails((prevDonationDetails) => ({
            ...prevDonationDetails,
            donationDescription: e.target.value,
          }));
        }}
      />

      <Button
        onClick={() => {
          checkDonationDetails();
        }}
      >
        Upišite vašu donaciju
      </Button>

    </>
  );
}

export default ModalBody;
