import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiAuth from "../../services/apiAuth";
import { UserContext } from "../../contexts/UserContext";

export default function EditPageForm({ tipo, tipoFixed, id }) {

    const { user } = useContext(UserContext);

    const { state } = useLocation();

    const [form, setForm] = useState({ price: state?.price || "", description: state?.description || "" });

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
            .editTransaction(tipo, form, user.token, id)
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
            <button type="submit">Atualizar {tipoFixed}</button>
        </form>
    )
};