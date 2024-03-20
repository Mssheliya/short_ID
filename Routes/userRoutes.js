const express = require("express");
const Route = express.Router();
const {
    createUser,
    userLogin,
    userlogout,
} = require("../Controllers/userController");

Route.post("/", createUser);
Route.post("/login", userLogin);
Route.get("/", userlogout);

module.exports = Route;