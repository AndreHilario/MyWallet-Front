import styled from "styled-components";
import TransactionForm from "./TransactionForm";

export default function TransactionsPage() {


  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>

      <TransactionForm />

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
