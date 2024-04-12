const userModel = require("../Models/userModel");
const {v4: uuidv4} = require("uuid");
const {setUser} = require("../Services/auth");
const multer = require("multer");
const path = require("path");

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

const getAllUsers = async(req,res)=> {
    const userData = await userModel.find({});
    res.render("user", {
        userData,
        user:req.user,
    })
}

const userlogout = async (req,res)=> {
    res.clearCookie("token");
    res.redirect("/");
}

const deleteUser = async (req,res)=> {
    const id = req.params.id;
    // console.log(id);
    await userModel.deleteOne({_id:id});
    res.json({"msg": "Deleted Successfully"})
}

module.exports = {
    createUser,
    userLogin,
    userlogout,
    getAllUsers,
    deleteUser,
}