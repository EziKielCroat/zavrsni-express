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

const Input = styled.input`
  border-radius: 6px;
  border: 1px solid #dddddd;
  color: rgba(26, 7, 16, 0.79);
  width: 100%;
  height: 26px;
  margin-top: 16px;
  margin-bottom: 10px;
  transition: 2s linear all;

  &:focus {
    border: 2px solid #ef498f;
  }
`;

const Button = styled.button`
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
`;

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
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
    if (userInfo.email && userInfo.password) {
      logUserIn();
    } else {
      // current data is not sufficent to log you into an account
      // ovo bi napravia sa toastom(err handlnig)
    }
  };

  const logUserIn = () => {
    axios
      .post(`http://localhost:${import.meta.env.VITE_APP_PORT}/login`, userInfo)
      .then((res) => {
        alert("Uspješno ste se ulogirali, bit će te prebaćeni na home");
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        setUserInfo({
          username: "",
          email: "",
          role: "user",
          password: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // TOAST IMplementiraj
      });
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Login</Title>
        </Header>

        <FieldsWrapper>
          <Label>Upišite vaš e-mail</Label>
          <Input
            type="email"
            value={userInfo.email}
            onChange={(e) => changeDetails(e.target.value, "email")}
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
            Ulogirajte se u svoj račun
          </Button>
        </FieldsWrapper>
      </Container>
    </Wrapper>
  );
}

export default Login;
