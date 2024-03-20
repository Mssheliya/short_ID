const express = require("express");
const {
    createURL,
    handleredirectURL,
    urlAnalatics,
    geturlbyUser,
    deleteURL,
} = require("../Controllers/urlController");

const Route = express();

Route.post("/", createURL);
Route.get("/", geturlbyUser)
Route.get("/:shortID", handleredirectURL);
Route.get("/delete/:id", deleteURL)
Route.get("/analatics/:shortID", urlAnalatics);

module.exports = Route;