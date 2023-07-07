const setUser = (value) => {
    localStorage.setItem("user", JSON.stringify(value));
}

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export default { setUser, getUser };