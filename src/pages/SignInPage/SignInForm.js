import MyWalletLogo from "../../components/MyWalletLogo";
import { useState } from "react";
import apiAuth from "../../services/apiAuth";
import { useContext } from "react/cjs/react.production.min";
import { UserContext } from "../../contexts/UserContext";


export default function SignInForm() {

    const [form, setForm] = useState({ name: "", email: "" });
    const [disabled, setDisabled] = useState(false);

    const { setUser } = useContext(UserContext);

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function setLogin(e) {
        e.preventDefault();

        setDisabled(true);

        apiAuth.signIn(form)
            .then((res) => {
                const { token } = res.data;
                setUser({ token });
                localStorage.setItem("user", JSON.stringify({ token }));

            })
            .catch((err) => {
                alert(err.message)
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
                autocomplete="new-password"
                name="password"
                value={email}
                onChange={handleForm}
                required
                disabled={disabled}
            />
            <button type="submit">Entrar</button>
        </form>
    )
};