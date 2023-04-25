import styled from "styled-components";

export const Value = styled.div`
  font-size: 16px;
  color: ${(props) => (props.status === "entrada" ? "green" : props.status === "saida" ? "red" : "black")};
  margin-top: 10px;
  span {
    margin-left: 10px;
  }
`;
export const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
  a {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 18px;
    color: #000000;
    text-decoration: none;
    padding-top: 30px;
  }
`;
export const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 1000px;
  overflow-y: auto; 
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      margin-top: 10px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

export const ListItemEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  p {
    font-size: 22px;
    color: gray;
    text-align: center;
    line-height: 26px;
    align-self: center;
  }
`;