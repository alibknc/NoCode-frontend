import axios from "axios";
import authReducer from '../reducers/authReducer';

const login = async (email, password) => {
    const response = await axios.get(`http://localhost:8080/auth?email=${email}&password=${password}`);

    if (response) {
        const data = response.data;
        authReducer.setUser(data);
        return true;
    }

    return false;
}

const logout = () => {
    authReducer.setUser("user", null)
}

export default { login, logout };