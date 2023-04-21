import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAuth from "../../services/apiAuth";
import { UserContext } from "../../contexts/UserContext";
import { TransactionContext } from "../../contexts/TransactionContext";

export default function EditPageForm({ tipo, tipoFixed }) {

    const { user } = useContext(UserContext);
    const { transaction } = useContext(TransactionContext);

    const [form, setForm] = useState({ price: transaction.price, description: transaction.description });
    const [disabled, setDisabled] = useState(false);

    const { price, description } = form;

    const navigate = useNavigate();

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function editTransaction(e) {
        e.preventDefault();

        setDisabled(true);

        apiAuth
            .editTransaction(tipo, form, user.token)
            .then(() => {
                setDisabled(false);
                navigate("/home");
            })
            .catch((err) => {
                setDisabled(false);
                alert(err.response.data)
            });
    };

    return (

        <form onSubmit={editTransaction}>
            <input
                placeholder="Valor"
                type="text"
                name="price"
                value={form && price}
                onChange={handleForm}
                required
                disabled={disabled}
            />
            <input
                placeholder="Descrição"
                type="text"
                name="description"
                value={form && description}
                onChange={handleForm}
                required
                disabled={disabled}
            />
            <button type="submit">Atualizar {tipoFixed}</button>
        </form>
    )
};