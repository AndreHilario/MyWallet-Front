import styled from "styled-components";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import apiAuth from "../../services/apiAuth";
import MenuHomePage from "./MenuHomePage";
import { Link } from "react-router-dom";
import Logout from "../../components/Logout";

export default function HomePage() {

  const [homeItems, setHomeItems] = useState([]);

  const { user } = useContext(UserContext);
  console.log(user)

  useEffect(() => {

    apiAuth
      .getHomeItems(user.token)
      .then((res) => {
        setHomeItems(res.data);

      })
      .catch((err) => {
        alert(err.message);
      })

  }, [user.token]);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <Logout />
      </Header>

      <MenuHomePage homeItems={homeItems} />

      <ButtonsContainer>

        <button>
          <Link to={"/nova-transacao/:entrada"}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </Link>
        </button>

        <button>
          <Link to={"/nova-transacao/:saida"}>
            <AiOutlineMinusCircle />
            <p>Nova <br /> saída</p>
          </Link>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;