import MyWalletLogo from "../../components/MyWalletLogo";
import { useState } from "react";
import apiAuth from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";


export default function SignUpForm() {

    const [form, setForm] = useState({ name: "", email: "", password: "", checkPassword: "" });
    const [disabled, setDisabled] = useState(false);

    const { name, email, password, checkPassword } = form;

    const navigate = useNavigate();

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function sendNewProfile(e) {
        e.preventDefault();

        if(form.password !== form.checkPassword) {
            alert("Senhas diferentes!");
            return;
        }

        setDisabled(true);

        apiAuth.signUp(form)
            .then((res) => {
                console.log(res)
                setDisabled(false)
                navigate("/")
            })
            .catch((err) => {
                setDisabled(false)
                alert(err.response.data)
            })


    }
    return (

        <form onSubmit={sendNewProfile}>
            <MyWalletLogo />

            <input
                placeholder="Nome"
                type="text"
                name="name"
                value={name}
                onChange={handleForm}
                required
                disabled={disabled}

            />

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

            <input
                placeholder="Confirme a senha"
                type="password"
                autoComplete="new-password"
                name="checkPassword"
                value={checkPassword}
                onChange={handleForm}
                required
                disabled={disabled}

            />
            <button type="submit">Cadastrar</button>
        </form>

    )
};