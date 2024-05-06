import styled from "styled-components";
import axiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, Input, Label } from "../Shared/shared";

const SettingsWrapper = styled.div`
  height: inherit;
  width: auto;
  background: #fff;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingsWindow = styled.div`
  height: 600px;
  width: 100%;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 8px;
  padding-left: 8px;
  padding-right: 8px;

  @media (min-width: 760px) {
    width: 600px;
  }
`;

const SettingsTitle = styled.h2`
  padding: 10px;
  color: #3f334d;
  text-align: center;
`;

const Divider = styled.div`
  height: 1px;
  width: inherit;
  background-color: #dddddd;
  margin-bottom: 16px;
`;

const notifySucess = (msg) => toast.success(msg);
const notify = (msg) => toast.error(msg);

function Settings() {
  const [userInformation, setUserInformation] = useState({
    username: "",
    email: "",
    role: "",
  });
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    notifySucess("Uspješno ste izlogirani, prebacujemo vas na login stranicu.");
    navigate("/login");
  };

  const saveNewInfo = () => {
    axiosInstance
      .put(`/user-information/${userInformation._id}`, userInformation)
      .then((res) => {
        if (res.status === 201) {
          notifySucess("Korisnicke informacije uspjesno spremljene!");

          setTimeout(() => {
            location.reload();
          }, 500);
        }
      })
      .catch((err) =>
        notify(`Pogreška pri spremanju korisničih podataka ${err.message}`)
      );
  };

  useEffect(() => {
    axiosInstance
      .get(`/user-information`)
      .then((res) => setUserInformation(res.data))
      .catch((err) =>
        notify(`Pogreška pri dohvaćanju korisničih podataka ${err.message}`)
      );
  }, []);

  return (
    <SettingsWrapper>
      <SettingsWindow>
        <SettingsTitle>Tvoji podaci</SettingsTitle>
        <Divider />
        <Label>Vaše ime</Label>
        <Input
          type="text"
          value={userInformation.username}
          onChange={(e) => {
            setUserInformation((prevUserInformation) => ({
              ...prevUserInformation,
              username: e.target.value,
            }));
          }}
          disabled={!isEditing}
        />
        <Label>Vaš email</Label>
        <Input
          type="text"
          value={userInformation.email}
          onChange={(e) => {
            setUserInformation((prevUserInformation) => ({
              ...prevUserInformation,
              email: e.target.value,
            }));
          }}
          disabled={!isEditing}
        />
        <Label>Vaša uloga</Label>
        <Input
          type="text"
          value={userInformation.role}
          onChange={(e) => {
            setUserInformation((prevUserInformation) => ({
              ...prevUserInformation,
              role: e.target.value,
            }));
          }}
          disabled={!isEditing}
        />
        <Button
          onClick={() => {
            if (isEditing) {
              saveNewInfo();
            } else {
              setIsEditing(!isEditing);
            }
          }}
        >
          {isEditing ? "Završi" : "Promjeni podatke"}
        </Button>
        <Button
          style={{ marginTop: "16px" }}
          onClick={() => {
            logOut();
          }}
        >
          Odjavi se
        </Button>
      </SettingsWindow>
    </SettingsWrapper>
  );
}

export default Settings;
