const express = require("express");
const Route = express.Router();
const {restrictTo} = require("../Middelwares/auth");
const {
    createUser,
    userLogin,
    userlogout,
    getAllUsers,
} = require("../Controllers/userController");

Route.post("/", createUser);
Route.post("/login", userLogin);
Route.get("/", restrictTo(["ADMIN"]), getAllUsers)
Route.get("/logout", userlogout);

module.exports = Route;