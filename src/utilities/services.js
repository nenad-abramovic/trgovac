const registerUser = async () => {
    try {
        let data = await fetch('http://localhost:4000/users');
        let json = await data.json();
        return json;
    } catch (e) {
        console.error(e);
    }
};

const loginUser = async () => {
    try {
        let data = await fetch('http://localhost:4000/users');
        let json = await data.json();
        return json;
    } catch (e) {
        console.error(e);
    }
};

export {
    registerUser,
    loginUser,
}