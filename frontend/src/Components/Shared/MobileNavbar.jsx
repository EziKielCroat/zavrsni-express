import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { PAGES } from "./Navbar";
import { Close } from "./icons";

const MobileNavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? "0" : "-100%")};
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  transition: left 0.3s ease-in-out;
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: #2d2537;
  font-size: 18px;
  margin-bottom: 20px;
  transition: color 0.2s ease-in-out;
  display: flex;
  align-self: center;
  margin-top: 50px;

  &:hover {
    color: #3f334d;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 20px;
`;

function MobileNavbar({ open, onClose }) {
  return (
    <MobileNavWrapper open={open}>
      <CloseButton onClick={onClose}>
        <Close />
      </CloseButton>
      {Object.entries(PAGES).map(([label, path]) => (
        <MobileNavLink to={path} key={path} onClick={onClose}>
          {label}
        </MobileNavLink>
      ))}
    </MobileNavWrapper>
  );
}

export default MobileNavbar;
