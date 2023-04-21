import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function FooterHomePage() {
    return (
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
    )
};

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