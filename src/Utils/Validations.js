export const emailValidation = (email) => {
    if(!email) return false
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
};

export const passwordValidation = (password) => {
    if(!password) return false
    return (/^(?=.*\d).{4,8}$/.test(password))
};

export const userNameValidation = (userName) => {
    if(!userName) return false
    return (/^[A-Za-z][A-Za-z0-9_]{3,29}$/.test(userName))
};