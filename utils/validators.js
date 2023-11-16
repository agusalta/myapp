const isPasswordSecure = (password) => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
    return regex.test(password);
};

module.exports = {
    isPasswordSecure,
}