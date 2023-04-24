import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAuth from "../../services/apiAuth";
import { UserContext } from "../../contexts/UserContext";

export default function TransactionForm({ tipo, tipoFixed }) {

    const [form, setForm] = useState({ price: "", description: "" });
    const [disabled, setDisabled] = useState(false);

    const { price, description } = form;

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function salveTransaction(e) {
        e.preventDefault();

        setDisabled(true);

        apiAuth
            .postTransaction(tipo, form, user.token)
            .then((res) => {
                setDisabled(false);
                navigate("/home", { state: { price, description } });
            })
            .catch((err) => {
                setDisabled(false);
                alert(err.response.data)
            });
    };

    return (

        <form onSubmit={salveTransaction}>
            <input
                placeholder="Valor"
                type="text"
                name="price"
                value={price}
                onChange={handleForm}
                required
                disabled={disabled}
            />
            <input
                placeholder="Descrição"
                type="text"
                name="description"
                value={description}
                onChange={handleForm}
                required
                disabled={disabled}
            />
            <button type="submit">Salvar {tipoFixed}</button>
        </form>
    )
};