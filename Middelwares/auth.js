const {getUser} = require("../Services/auth");

function checkforAuthentication(req,res,next){
    const token = req.cookies?.token;
    req.user = null;
    if(!token) return next();
    const user = getUser(token);

    req.user = user
    return next();
}

function restrictTo(roles = []){
    return (req,res,next)=> {
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthurized");

        next();
    };
}

module.exports = {
    checkforAuthentication,
    restrictTo,
}

// const loggedinUserOnly = async (req,res,next)=> {
//     const useruid = req.cookies?.uid;

//     if(!useruid) return res.redirect("/login");
//     const user = getUser(useruid);
//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// const checkauth = async (req,res,next)=> {
//     const useruid = req.cookies?.uid;
//     const user = getUser(useruid);
//     req.user = user;
//     next();
// }

// module.exports = {
//     loggedinUserOnly,
//     checkauth,
// }