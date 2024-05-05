import styled from "styled-components";

import Navbar from "../Shared/Navbar";
import Settings from "./Settings";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
`;

function AccountSettings() {
  return (
    <Wrapper>
      <Navbar />
      <Settings />
    </Wrapper>
  );
}

export default AccountSettings;
