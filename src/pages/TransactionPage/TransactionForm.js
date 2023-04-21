import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAuth from "../../services/apiAuth";
import { UserContext } from "../../contexts/UserContext";
import { TransactionContext } from "../../contexts/TransactionContext";

export default function TransactionForm({ tipo, tipoFixed }) {

    const [form, setForm] = useState({ price: "", description: "" });
    const [disabled, setDisabled] = useState(false);

    const { price, description } = form;

    const { user } = useContext(UserContext);
    const { setTransaction } = useContext(TransactionContext);

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
                const { price, description } = res.data;
                setTransaction({ price, description });
                setDisabled(false);
                navigate("/home");
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