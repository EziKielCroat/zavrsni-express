import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export const Input = styled.input`
  border-radius: 6px;
  border: 1px solid #dddddd;
  color: rgba(26, 7, 16, 0.79);
  width: 100%;
  height: 40px;
  margin-top: 16px;
  margin-bottom: 10px;
  transition: 1s linear all;

  &:focus {
    border: 2px solid #ef498f;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 56px;
  background-color: #ef498f;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;

  transition: 0.3s linear all;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    cursor: pointer;
  }
`;

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
      // current data is not sufficent to make an account
      // ovo bi napravia sa toastom(err handlnig)
    }
  };

  const registerAccount = () => {
    axios
      .post(
        `http://localhost:${import.meta.env.VITE_APP_PORT}/register`,
        userInfo
      )
      .then((res) => {
        console.log(res);
        alert("Uspješno ste se registrirali! Bit će te prebaćeni na prijavu. ");
        setUserInfo({
          username: "",
          email: "",
          role: "user",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        // TOAST IMplementiraj
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
          >
            Krejirate svoj račun
          </Button>
        </FieldsWrapper>
      </Container>
    </Wrapper>
  );
}

export default Register;
