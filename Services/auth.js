// Statefull Authentican
// const sessionIdMaptoUser = new Map();

// function setUser(id, user) {
//     return sessionIdMaptoUser.set(id, user);
// }

// function getUser(id) {
//     return sessionIdMaptoUser.get(id);
// }
// <---------------------------------------------------------------***----------------------------------------------------------------------->
// Stateless Autentication
const jwt = require("jsonwebtoken");
const secret = "Mustafa@1234$"

function setUser(user){
    // if(!user) return null;
    return jwt.sign({
        _id:user._id,
        name:user.name,
        username:user.username,
        email:user.email,
        role:user.role,
    }, secret);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser,
}