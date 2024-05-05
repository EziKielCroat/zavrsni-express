import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import MobileNavbar from "./MobileNavbar";

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: #eaf6ff;
`;

const Title = styled.h1`
  all: unset;
  color: #3f334d;
  font-size: 26px;
  font-weight: bold;
  margin-left: 50px;
`;

const LinksContainer = styled.div`
  margin-left: auto;
  padding-right: 50px;
  display: grid;
  grid-auto-flow: column;
  column-gap: 30px;

  a {
    text-decoration: none;
    color: #2d2537;
    transition: 0.2s linear scale;

    &:hover {
      font-weight: bold;
      scale: 1.2;
    }
  }

  .active {
    user-select: none;
    cursor: default;
    transition: none !important;
    scale: unset !important;
    font-weight: bold !important;
  }

  .mobile {
    transition: 0.2s linear scale;
    text-decoration: none;
    height: 32px;
    width: 32px;

    &:hover {
      scale: 1.2;
      cursor: pointer;
    }
  }
`;

const Menu = ({onClick}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 50 50"
      className="mobile"
      onClick={onClick}
    >
      <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
    </svg>
  );
};

export const PAGES = {
  Home: "/",
  "O nama": "/aboutus",
  Donacije: "/donations",
  Notifikacije: "/notifications",
  "Postavke računa": "/settings",
  Dashboard: "/dashboard",
};

function Navbar() {
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
  const isMobile = width <= 760;

  const toggleMobileNavbar = () => {
    setOpenMobileNavbar(!openMobileNavbar);
  };

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <NavWrapper>
      <Title>Azil za životinje</Title>

      <LinksContainer>
        {isMobile ? (
          <Menu
            onClick={() => {
              toggleMobileNavbar();
            }}
          />
        ) : (
          Object.entries(PAGES).map(([label, path]) => (
            <Link
              to={path}
              key={path}
              className={path === location.pathname ? "active" : ""}
            >
              {label}
            </Link>
          ))
        )}
      </LinksContainer>
      <MobileNavbar open={openMobileNavbar} onClose={toggleMobileNavbar} />
    </NavWrapper>
  );
}

export default Navbar;
