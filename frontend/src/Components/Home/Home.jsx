import styled from "styled-components";
import Navbar from "../Shared/Navbar";
import DisplayAnimals from "./DisplayAnimals";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
`;

function Home() {
  // this check is implemented because of a weird issue I encountered where randomly the token wouldn't get set into localStorage
  const isAuthenticated = localStorage.getItem("token"); 

  return (
    <Wrapper>
      {isAuthenticated && (
        <>
          <Navbar />
          <DisplayAnimals />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
