import axiosInstance from "../../axiosInstance";
import styled from "styled-components";
import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../Shared/Navbar";
import { Button, Input } from "../Shared/shared";
import { Twitter, Facebook, Instagram } from "../Shared/icons";

const notifySucess = (msg) => toast.success(msg);
const notify = (msg) => toast.error(msg);

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;

  iframe {
    margin-top: 20px;
    width: 80%;
    height: 40vh;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-top: 20px;
`;

const ContactForm = styled.div`
  width: 45%;
`;

const ContactInfo = styled.div`
  width: 45%;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: auto;

  a {
    margin: 15px;
  }
`;

function AboutUs() {
  const [userRequest, setUserRequest] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendRequest = () => {
    if (userRequest.name && userRequest.email && userRequest.message) {
      axiosInstance
        .post(`/requests`, userRequest)
        .then((res) => {
          notifySucess("Uspješno ste poslali svoj upit, neko će vam se javiti.");
          setUserRequest({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          notify(`Pogreška pri upisivanju upita ${error.message}`);
        });
    } else {
      notify("Trenutačni podaci nisu dovoljni za upis upita.");
    }
  };

  return (
    <Wrapper>
      <Navbar />

      <iframe
        id="google-maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751424.973836109!2d10.706122026392375!3d47.66619207163909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079b259d2a7f%3A0x1012d47bdde4c1af!2sAustrija!5e0!3m2!1shr!2shr!4v1682890478856!5m2!1shr!2shr"
        width="600"
        height="300"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <ContactWrapper>
        <ContactForm>
          <Input
            value={userRequest.name}
            onChange={(e) => {
              setUserRequest((prevUserReq) => ({
                ...prevUserReq,
                name: e.target.value,
              }));
            }}
            placeholder="Vaše ime"
          />
          <Input
            value={userRequest.email}
            onChange={(e) => {
              setUserRequest((prevUserReq) => ({
                ...prevUserReq,
                email: e.target.value,
              }));
            }}
            placeholder="Vaš kontakt email"
          />
          <Input
            value={userRequest.message}
            onChange={(e) => {
              setUserRequest((prevUserReq) => ({
                ...prevUserReq,
                message: e.target.value,
              }));
            }}
            placeholder="Vaša poruka"
          />

          <Button
            onClick={() => {
              sendRequest();
            }}
          >
            Pošaljite vaš upit
          </Button>
        </ContactForm>
        <ContactInfo>
          <p>Email: </p>
          <a href="mailto:azilzivotinjesplit001@gmail.com">
            azilzivotinjesplit001@gmail.com
          </a>
          <p>Telefonski broj: </p>
          <a href="tel:+385996379852">+385 99 6379 852</a> <br />
          <br />
          <a href="twitter.com">
            <Twitter />
          </a>
          <a href="instagram.com">
            <Instagram />
          </a>
          <a href="facebook.com">
            <Facebook />
          </a>
        </ContactInfo>
      </ContactWrapper>
    </Wrapper>
  );
}

export default AboutUs;
