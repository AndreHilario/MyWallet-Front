import { useContext } from "react";
import { BiExit } from "react-icons/bi";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    }

    return (
        <BiExit onClick={handleLogout} />
    )
};