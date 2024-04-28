
import styled from "styled-components";

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


function Home () {
// filtriraj po statusu udomljenosti i po vrsti zivotinje
// grdi prikazi sve zivotinje (mozda slika za svaku)
// udomi me ispod neudomljenih
// navbar je gori bitan(napravit neki comp s kojin na svin pageovima koristin isti navbar componentu)
    return(
        <Wrapper>
            home
        </Wrapper>
    )
}

export default Home;