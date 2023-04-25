import apiAuth from "../../services/apiAuth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { ListItemContainer, ListItemEmpty, TransactionsContainer, Value } from "./styledMenu";

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
      });

  }, [reloadPage, user.token, homeItems]);


  function deleteItem(id, status, price, description) {

    if (window.confirm(`Você selecionou a transação de ${status}, com valor ${price} e descrição ${description}, certeza ao deletar ?`)) {

      apiAuth
        .deleteTransaction(user.token, id)
        .then(() => {
          let refreshWindow = reloadPage + 1;
          setReloadPage(refreshWindow);
        })
        .catch((err) => {
          alert(err.response.data)
        });
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
                      <Link to={{ pathname: `/editar-registro/${value.status}/${value._id}`, state: { price: value.price, description: value.description } }}>{value.description}</Link>
                    </strong>
                  </div>
                  <Value status={value.status}>{value.price}
                    <span onClick={() => deleteItem(value._id, value.status, value.price, value.description)}>X</span>
                  </Value>
                </ListItemContainer>
              )
            })}

          </ul>
      }
      <article>
        <strong>Saldo</strong>
        <Value status={(sumIn - sumOut) > 0 ? "entrada" : ((sumIn - sumOut) < 0 ? "saida" : "equal")}>{
          formattedBalance}
        </Value>
      </article>
    </TransactionsContainer>
  )
};
