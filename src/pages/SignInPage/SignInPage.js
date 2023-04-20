import styled from "styled-components"
import { Link } from "react-router-dom"
import SignInForm from "./SignInForm"
import { port } from "../../services/apiAuth"



export default function SignInPage() {

  console.log(port)
  return (
    <SingInContainer>
      <SignInForm />
      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
