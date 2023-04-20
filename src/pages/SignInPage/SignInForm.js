import MyWalletLogo from "../../components/MyWalletLogo";
import { useState, useContext } from "react";
import apiAuth from "../../services/apiAuth";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";


export default function SignInForm() {

    const [form, setForm] = useState({ email: "", password: "" });
    const [disabled, setDisabled] = useState(false);

    const { email, password } = form;

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function setLogin(e) {
        e.preventDefault();

        setDisabled(true);

        apiAuth.signIn(form)
            .then((res) => {
                console.log(res.data)
                const { name, token } = res.data;
                setUser({ name, token });
                localStorage.setItem("user", JSON.stringify({ name, token }));
                setDisabled(false);
                navigate("/home");

            })
            .catch((err) => {
                setDisabled(false);
                alert(err.message);
            });
    }


    return (

        <form onSubmit={setLogin}>
            <MyWalletLogo />
            <input
                placeholder="E-mail"
                type="email"
                name="email"
                value={email}
                onChange={handleForm}
                required
                disabled={disabled}
            />
            <input
                placeholder="Senha"
                type="password"
                autoComplete="new-password"
                name="password"
                value={password}
                onChange={handleForm}
                required
                disabled={disabled}
            />
            <button type="submit">Entrar</button>
        </form>
    )
};