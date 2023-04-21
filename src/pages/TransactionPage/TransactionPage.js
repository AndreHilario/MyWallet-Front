import styled from "styled-components";
import TransactionForm from "./TransactionForm";
import { useParams } from "react-router-dom";

export default function TransactionPage() {

  let { tipo } = useParams();
  tipo = tipo.replace(":", "");
  let tipoFixed = tipo.replace(":", "");

  if (tipoFixed === "saida") {
    tipoFixed = "saída";
  }


  return (
    <TransactionsContainer>
      <h1>Nova {tipoFixed}</h1>

      <TransactionForm tipo={tipo} tipoFixed={tipoFixed} />

    </TransactionsContainer>
  )
};

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
