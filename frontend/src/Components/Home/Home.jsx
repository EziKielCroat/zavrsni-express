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
  // filtriraj po statusu udomljenosti i po vrsti zivotinje
  // grdi prikazi sve zivotinje (mozda slika za svaku)
  // udomi me ispod neudomljenih

  return (
    <Wrapper>
      <Navbar />
      <DisplayAnimals />
    </Wrapper>
  );
}

export default Home;
