const userModel = require("../Models/userModel");
const {v4: uuidv4} = require("uuid");
const {setUser} = require("../Services/auth");

const createUser = async (req,res)=> {
    const {name,email,username,password} = req.body;
    await userModel.create({
        name,
        email,
        username,
        password,
    });
    res.redirect("/login");
};

const userLogin = async (req,res)=> {
    const {username,password} = req.body;
    const user = await userModel.findOne({username,password});
    if(!user) return res.render("login", {errmsg:"Username Or Password are Incorrect"});
    // const sessionId = uuidv4();
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
}

const userlogout = async (req,res)=> {
    res.clearCookie("token");
    res.redirect("/");
}

module.exports = {
    createUser,
    userLogin,
    userlogout,
}