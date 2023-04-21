import styled from "styled-components";
import apiAuth from "../../services/apiAuth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";


export default function MenuHomePage() {

  const [reloadPage, setReloadPage] = useState(0);
  const [homeItems, setHomeItems] = useState([]);
  const [formattedBalance, setFormattedBalance] = useState("0");
  const [sumOut, setSumOut] = useState(0);
  const [sumIn, setSumIn] = useState(0);

  const { user } = useContext(UserContext);

  useEffect(() => {

    apiAuth
      .getHomeItems(user.token)
      .then((res) => {
        setHomeItems(res.data);

        let sumPositive = 0;
        let sumNegative = 0;

        homeItems.forEach((value) => {
          if (value.status === "entrada") {
            sumPositive += parseFloat(value.price);
          } else {
            sumNegative += parseFloat(value.price);
          }
        });

        const balance = Math.abs(sumPositive - sumNegative);
        const newBalance = balance.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        });

        setFormattedBalance(newBalance);
        setSumIn(sumPositive);
        setSumOut(sumNegative);

      })
      .catch((err) => {
        alert(err.response.data);
      })

  }, [reloadPage, user.token, homeItems]);


  function deleteItem(id) {

    if (window.confirm("Quer mesmo deletar uma transação ?")) {

      apiAuth
        .deleteTransaction(user.token, id)
        .then(() => {
          let refreshWindow = reloadPage + 1;
          setReloadPage(refreshWindow);
        })
        .catch((err) => {
          alert(err.response.data)
        })
    }


  }

  return (
    <TransactionsContainer>
      {
        homeItems.length === 0 ?
          <ListItemEmpty>
            <p>Não há registros de <br />entrada ou saída</p>
          </ListItemEmpty>
          :
          <ul>
            {homeItems.map((value) => {
              return (
                <ListItemContainer key={value._id}>
                  <div>
                    <span>{value.date}</span>
                    <strong>
                      <Link to={`/editar-registro/${value.status}`}>{value.description}</Link>
                    </strong>
                  </div>
                  <Value status={value.status}>{value.price} <span onClick={() => deleteItem(value._id)}>X</span></Value>
                </ListItemContainer>
              )
            })}

          </ul>
      }
      <article>
        <strong>Saldo</strong>
        <Value status={(sumIn - sumOut) > 0 ? "entrada" : ((sumIn - sumOut) < 0 ? "saida" : "equal")}>{formattedBalance}</Value>
      </article>
    </TransactionsContainer>
  )
};

const Value = styled.div`
  font-size: 16px;
  color: ${(props) => (props.status === "entrada" ? "green" : props.status === "saida" ? "red" : "black")};
  span {
    margin-left: 10px;
  }
`;
const ListItemContainer = styled.li`
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
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

const ListItemEmpty = styled.div`
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