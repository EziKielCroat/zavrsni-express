import styled from "styled-components";
import axiosInstance from "../../../axiosInstance";
import { useState, useEffect } from "react";

import { Button } from "../../Shared/shared";

import NotifikacijePrikazi from "./NotifikacijePrikazi";
import Modal from "../../Shared/Modal";
import ModalBody from "../../Notifications/ModalBody";

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
      .post(
        `/notifications`,
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

  const deleteNotification = (notificationId) => {
    axiosInstance
      .delete(`/notifications/${notificationId}`)
      .then((res) => {
        alert("Uspješno ste izbrisali notifikaciju");
        location.reload();
      })
      .catch((err) => {
        console.error("pogreska pri brisanju notifikaciju", err); // implementiraj toast
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/notifications`)
      .then((res) => {
        setNotifications(res.data.sveNotifikacije);
      })
      .catch((err) => {
        console.error("progreska pri upisivanju notifikacije: ", err);
        // implementiraj toast
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
