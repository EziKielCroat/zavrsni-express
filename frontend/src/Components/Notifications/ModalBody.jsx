
import { Input, Button, Label } from "../Shared/shared";
import { useState } from "react";
import toast from "react-hot-toast";

const notify = (msg) => toast.error(msg);

function ModalBody({ sendNewNotification, isAdmin }) {
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
      notify("Trenutačni podaci nisu dovoljni za upisati notifikaciju.")
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
        disabled={!isAdmin}
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
