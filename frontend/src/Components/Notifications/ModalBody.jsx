import styled from "styled-components";

import { Input, Button } from "../Register/Register";
import { useState } from "react";

export const Label = styled.p`
  font-size: 14px;
  color: #483c58;
`;

function ModalBody({ sendNewNotification }) {
  const [notificationDetails, setNotificationDetails] = useState({
    notificationTitle: "",
    notificationText: "",
    notificationImportant: false,
  });

  const checkNotificationDetails = () => {
    if (
      notificationDetails.notificationTitle &&
      notificationDetails.notificationText
    ) {
      sendNewNotification(notificationDetails);
    } else {
      // toast implementiraj, nepravilni podaci upisani za notifikaciju
    }
  };

  return (
    <>
      <Label>Naslov notifikacije: </Label>

      <Input
        type="text"
        value={notificationDetails.notificationTitle}
        onChange={(e) => {
          setNotificationDetails((prevDonationDetails) => ({
            ...prevDonationDetails,
            notificationTitle: e.target.value,
          }));
        }}
      />

      <Label>Tekst notifikacije </Label>
      <Input
        type="text"
        value={notificationDetails.notificationText}
        onChange={(e) => {
          setNotificationDetails((prevDonationDetails) => ({
            ...prevDonationDetails,
            notificationText: e.target.value,
          }));
        }}
      />

      <Label>Želite li izglasiti notifikaciju kao važnu? </Label>
      <Input
        type="checkbox"
        checked={notificationDetails.notificationImportant}
        onChange={() =>
          setNotificationDetails((prevDetails) => ({
            ...prevDetails,
            notificationImportant: !prevDetails.notificationImportant,
          }))
        }
      />

      <Button
        onClick={() => {
          checkNotificationDetails();
        }}
      >
        Upišite vašu notifikaciju
      </Button>
    </>
  );
}

export default ModalBody;
