import styled from "styled-components";
import EditPageForm from "./EditPageForm";
import { useParams } from "react-router-dom";

export default function EditPage() {

    let { tipo } = useParams();
    tipo = tipo.replace(":", "");
    let tipoFixed = tipo.replace(":", "");

    if (tipoFixed === "saida") {
        tipoFixed = "saída";
    }


    return (
        <EditTransactionsContainer>
            <h1>Editar {tipoFixed}</h1>

            <EditPageForm tipo={tipo} tipoFixed={tipoFixed} />

        </EditTransactionsContainer>
    )
};

const EditTransactionsContainer = styled.main`
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