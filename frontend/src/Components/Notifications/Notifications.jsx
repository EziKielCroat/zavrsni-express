import styled from "styled-components";
import axiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../Shared/Navbar";
import Modal from "../Shared/Modal";
import ModalBody from "./ModalBody";
import NotificationDisplay from "./NotificationDisplay";

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

const NotificationsWrapper = styled.div`
  height: inherit;
  width: auto;
  background: #fff;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
`;

const notifySucess = (msg) => toast.success(msg);
const notify = (msg) => toast.error(msg);

function Notifications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const sendNewNotification = (notificationDetails) => {
    axiosInstance
      .post(
        `/notifications`,
        notificationDetails
      )
      .then((res) => {
        notifySucess("Uspješno ste upisali novu notifikaciju!");
        location.reload();
      })
      .catch((err) => {
        notify(`Pogreška pri upisivanju nove notifikacije ${err.message}` );
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/notifications`)
      .then((res) => {
        setNotifications(res.data.allNotifications);
      })
      .catch((err) => {
        notify(`Pogreška pri dohvaćanju notifikacija: ${err.message}` );
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
          <ModalBody
            sendNewNotification={sendNewNotification}
            isAdmin={false}
          />
        </Modal>
      )}
    </Wrapper>
  );
}

export default Notifications;
