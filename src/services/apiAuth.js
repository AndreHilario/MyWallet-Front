import axios from "axios";

const REACT_APP_API_URL = "http://localhost:5000";


function signIn(form) {
    const promise = axios.post(`${REACT_APP_API_URL}/login`, form);
    return promise;
}
function signUp(form) {

    const promise = axios.post(`${REACT_APP_API_URL}/cadastro`, form);
    return promise;
};

const apiAuth = { signIn, signUp };
export default apiAuth;