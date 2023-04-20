import axios from "axios";

export const port = process.env.REACT_APP_API_URL;

function signIn(form) {
    const promise = axios.post(`${port}/`, form);
    return promise;
};

function signUp(form) {

    const promise = axios.post(`${port}/cadastro`, form);
    return promise;
};

function getConfig(token) {
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

function getHomeItems(token) {
    const config = getConfig(token);
    const response = axios.get(`${port}/home`, config)

    return response;
};

const apiAuth = { signIn, signUp, getHomeItems };
export default apiAuth;