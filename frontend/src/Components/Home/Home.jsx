
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

    return(
        <Wrapper>
            home
        </Wrapper>
    )
}

export default Home;