import { Link } from "react-router-dom";
import styled from "styled-components";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {

  return (
    <SingUpContainer>
      
      <SignUpForm />

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
};

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
