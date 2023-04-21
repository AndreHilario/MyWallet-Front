import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import apiAuth from "../../services/apiAuth";
import MenuHomePage from "./MenuHomePage";
import HeaderHomePage from "./HeaderHomePage";
import FooterHomePage from "./FooterHomePage";

export default function HomePage() {

  const [homeItems, setHomeItems] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {

    apiAuth
      .getHomeItems(user.token)
      .then((res) => {
        setHomeItems(res.data);

      })
      .catch((err) => {
        alert(err.response.data);
      })

  }, [user.token]);

  return (
    <HomeContainer>
      <HeaderHomePage />

      <MenuHomePage homeItems={homeItems} />

      <FooterHomePage />

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;