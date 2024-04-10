const express = require("express");
const Route = express.Router();
const {restrictTo} = require("../Middelwares/auth");
const {
    createUser,
    userLogin,
    userlogout,
    getAllUsers,
    deleteUser,
    upload,
} = require("../Controllers/userController");

Route.post("/", upload.single("userImageURL"), createUser);
Route.post("/login", userLogin);
Route.get("/", restrictTo(["ADMIN"]), getAllUsers);
Route.get("/logout", userlogout);
Route.get("/delete/:id", deleteUser);

module.exports = Route;