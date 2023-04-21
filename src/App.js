import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import TransactionsPage from "./pages/TransactionPage/TransactionPage";
import UserProvider from "./contexts/UserContext";
import TransactionProvider from "./contexts/TransactionContext";
import EditPage from "./pages/EditPage/EditPage";

export default function App() {

  return (
    <PagesContainer>
      <BrowserRouter>
        <UserProvider>
          <TransactionProvider>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
              <Route path="/editar-registro/:tipo" element={<EditPage />} />
            </Routes>
          </TransactionProvider>
        </UserProvider>
      </BrowserRouter>
    </PagesContainer>
  )
};

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
