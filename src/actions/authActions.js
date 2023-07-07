import authService from '../service/authService';

export const login = async (username, password) => {
    return await authService.login(username, password)
}

export const logout = () => {
    return authService.logout();
}