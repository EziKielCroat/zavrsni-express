import styled from "styled-components";
import axiosInstance from "../../axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../Shared/shared";
import toast from "react-hot-toast";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 999;
`;

const Container = styled.div`
  width: 502px;
  height: 592px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 12px;
  padding-left: 25px;
  padding-right: 25px;
`;

const Header = styled.div`
  top: 0;
  width: auto;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const Title = styled.span`
  font-size: 18px;
  color: #1a0710;
`;

const FieldsWrapper = styled.div`
  width: auto;
  height: 470px;
`;

const Label = styled.span`
  color: rgba(26, 7, 16, 0.42);
`;
const notifySucess = (msg) => toast.success(msg);
const notify = (msg) => toast.error(msg);

function Register() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    role: "user",
    password: "",
  });
  const navigate = useNavigate();

  const changeDetails = (newValue, property) => {
    setUserInfo((oldUserInfo) => ({
      ...oldUserInfo,
      [property]: newValue,
    }));
  };

  const checkDetails = () => {
    if (
      userInfo.username &&
      userInfo.email &&
      (userInfo.role === "admin" || userInfo.role === "user") &&
      userInfo.password
    ) {
      registerAccount();
    } else {
      notify("Trenutačni podaci nisu dovoljni za napravit račun");
    }
  };

  const registerAccount = () => {
    axiosInstance
      .post(`/register`, userInfo)
      .then((res) => {
        notifySucess(
          "Uspješno ste se registrirali! Bit će te prebaćeni na prijavu. "
        );
        setUserInfo({
          username: "",
          email: "",
          role: "user",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        notify(`Registracija nije uspjela ${error.message}`);
      });
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Register</Title>
        </Header>

        <FieldsWrapper>
          <Label>Upišite vaše korisničko ime</Label>
          <Input
            type="text"
            value={userInfo.username}
            onChange={(e) => changeDetails(e.target.value, "username")}
          />
          <Label>Upišite vaš e-mail</Label>
          <Input
            type="email"
            value={userInfo.email}
            onChange={(e) => changeDetails(e.target.value, "email")}
          />
          <Label>
            Upišite vašu ulogu(&quot;admin&quot; ili &quot;user&quot;)
          </Label>
          <Input
            type="text"
            value={userInfo.role}
            onChange={(e) => changeDetails(e.target.value, "role")}
          />
          <Label>Upišite vašu šifru</Label>
          <Input
            type="password"
            value={userInfo.password}
            onChange={(e) => changeDetails(e.target.value, "password")}
          />

          <Button
            onClick={() => {
              checkDetails();
            }}
            style={{marginBottom: "20px"}}
          >
            Krejirate svoj račun
          </Button>

          <Label onClick={() => {navigate("/login")}} style={{cursor: "pointer", display: "flex", justifyContent: "center"}}>Imate račun? Ulogiraj te se</Label>

        </FieldsWrapper>
      </Container>
    </Wrapper>
  );
}

export default Register;
