import styled from "styled-components";
import axiosInstance from "../../../axiosInstance";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { Button } from "../../Shared/shared";

import NotifikacijePrikazi from "./NotifikacijePrikazi";
import Modal from "../../Shared/Modal";
import ModalBody from "../../Notifications/ModalBody";

const notifySucess = (msg) => toast.success(msg);
const notify = (msg) => toast.error(msg);

const NotifWrapper = styled.div`
  width: auto;
  background: #fff;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
  overflow-y: auto;
`;

const NotificationsWrapper = styled.div`
  height: inherit;
  width: auto;
  background: #fff;
  padding-left: 50px;
  padding-left: 50px;
`;

function Notifikacije() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const sendNewNotification = (notificationDetails) => {
    axiosInstance
      .post(`/notifications`, notificationDetails)
      .then((res) => {
        notifySucess("Uspješno ste upisali novu notifikaciju!");
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => {
        notify(`Pogreška pri upisivanju notifikacije ${err.message}`);
      });
  };

  const deleteNotification = (notificationId) => {
    axiosInstance
      .delete(`/notifications/${notificationId}`)
      .then((res) => {
        notifySucess("Uspješno ste izbrisali notifikaciju");
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => {
        notify(`Pogreška pri brisanju notifikacije ${err.message}`);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/notifications`)
      .then((res) => {
        setNotifications(res.data.allNotifications);
      })
      .catch((err) => {
        notify(`Pogreška pri dohvaćanju notifikacija ${err.message}`);
      });
  }, []);

  return (
    <>
      <NotifWrapper>
        <NotificationsWrapper>
          <Button
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            Nova obavijest
          </Button>

          <NotifikacijePrikazi
            notifications={notifications}
            deleteNotification={deleteNotification}
          />
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
              isAdmin={true}
            />
          </Modal>
        )}
      </NotifWrapper>
    </>
  );
}

export default Notifikacije;
