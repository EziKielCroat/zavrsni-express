import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "../Shared/Navbar";
import Modal from "../Shared/Modal";
import ModalBody from "./ModalBody";
import NotificationDisplay from "./NotificationDisplay";

import { Button } from "../Register/Register";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
`;

const NotificationsWrapper = styled.div`
  height: inherit;
  width: auto;
  background: #fff;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
`;

function Notifications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const sendNewNotification = (notificationDetails) => {
    axios
      .post(
        `http://localhost:${import.meta.env.VITE_APP_PORT}/notifications`,
        notificationDetails
      )
      .then((res) => {
        alert("Uspješno ste upisali novu notifikaciju!");
        location.reload();
      })
      .catch((err) => {
        console.error("progreska pri upisivanju notifikacije: ", err);
        // implementiraj toast
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:${import.meta.env.VITE_APP_PORT}/notifications`)
      .then((res) => {
        console.log(res.data.sveNotifikacije);
        setNotifications(res.data.sveNotifikacije);
      })
      .catch((err) => {
        console.error("progreska pri upisivanju notifikacije: ", err);
        // implementiraj toast
      });
  }, []);

  return (
    <Wrapper id="modal-root">
      <Navbar />

      <NotificationsWrapper>
        <Button
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
        >
          Nova obavijest
        </Button>

        <NotificationDisplay notifications={notifications} />
      </NotificationsWrapper>
      {modalOpen && (
        <Modal
          title={"Objavite novu notifikaciju!"}
          onClose={() => {
            setModalOpen(!modalOpen);
          }}
        >
          <ModalBody sendNewNotification={sendNewNotification} isAdmin={false}/>
        </Modal>
      )}
    </Wrapper>
  );
}

export default Notifications;
