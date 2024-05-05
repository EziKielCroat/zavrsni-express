import styled from "styled-components";
import { useState } from "react";

import Navbar from "../Shared/Navbar";
import { PAGE_VALUES } from "./pageDefaults";

import Zivotinje from "./AdminComponents/Zivotinje";
import Upiti from "./AdminComponents/Upiti";
import Donacije from "./AdminComponents/Donacije";
import Notifikacije from "./AdminComponents/Notifikacije";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
`;

const DisplayWrapper = styled.div`
  height: inherit;
  width: auto;
  background: #fff;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
`;

const HeaderWrapper = styled.div`
  background: #eaf6ff;
  width: auto;
  padding: 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  color: #3e2f4e;
  transition: 0.2s linear scale;
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};

  &:hover {
    cursor: pointer;
    font-weight: bold;
    scale: 1.2;
  }
`;

const OptionWrapper = styled.div`
  height: inherit;
  width: auto;
  background: #fff;
  margin-top: 10px;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
`;

const options = {
  [PAGE_VALUES.ZIVOTINJE]: Zivotinje,
  [PAGE_VALUES.UPITI]: Upiti,
  [PAGE_VALUES.DONACIJE]: Donacije,
  [PAGE_VALUES.NOTIFIKACIJE]: Notifikacije,
};

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("Zivotinje");

  const togglePage = (newCurrentPage) => {
    setCurrentPage(newCurrentPage);
  };

  const CurrentPageComponent = options[currentPage];

  return (
    <Wrapper id="modal-root">
      <Navbar />
      <DisplayWrapper>
        {/*treba bit responzivno */}
        <HeaderWrapper>
          {Object.keys(options).map((page) => (
            <Title
              key={page}
              isActive={currentPage === page}
              onClick={() => togglePage(page)}
            >
              {page}
            </Title>
          ))}
        </HeaderWrapper>
        <OptionWrapper>
          {options[currentPage] && <CurrentPageComponent />}
        </OptionWrapper>
      </DisplayWrapper>
    </Wrapper>
  );
}

export default Dashboard;
