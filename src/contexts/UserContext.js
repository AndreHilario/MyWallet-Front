import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const localSUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(localSUser !== null ? localSUser : {});
    const navigate = useNavigate();

    useEffect(() => {
        if (localSUser === null) {
            navigate("/")
        } else {
            navigate("/home")
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};