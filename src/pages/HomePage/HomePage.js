import styled from "styled-components";
import MenuHomePage from "./MenuHomePage";
import HeaderHomePage from "./HeaderHomePage";
import FooterHomePage from "./FooterHomePage";

export default function HomePage() {

  return (
    <HomeContainer>
      <HeaderHomePage />

      <MenuHomePage />

      <FooterHomePage />

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;