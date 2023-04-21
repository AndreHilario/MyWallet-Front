import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import Logout from "../../components/Logout";
import styled from "styled-components";


export default function HeaderHomePage() {

    const { user } = useContext(UserContext);

    return (

        <Header>
            <h1>Olá, {user.name}</h1>
            <Logout />
        </Header>
    )
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;