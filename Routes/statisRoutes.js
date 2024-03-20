const express = require("express");
const Route = express();
const {getUser} = require("../Services/auth");
const { restrictTo } = require("../Middelwares/auth");
const urlModel = require("../Models/urlModel");

Route.get("/admin", restrictTo(["ADMIN"]), async(req,res)=> {
    if(!req.user) return res.redirect("/login");
    const allurls = await urlModel.find();
    return res.render("home", {
        urls:allurls,
        user:req.user,
    })
})
Route.get("/",async (req,res)=> {
    // if(!req.user) return res.redirect("/login");
    // const allurls = await urlModel.find({ createdBy: req.user._id});
    return res.render("home", {
        // urls:allurls,
        user: req.user,
    })
});
Route.get("/generateShortID", async (req,res)=> {
    if(!req.user) return res.redirect("/login");
    res.render("generateshortID", {
        user: req.user,
    })
})

Route.get("/signup", async (req,res)=> {
    return res.render("signup");
});

Route.get("/login", async (req,res)=> {
    return res.render("login");
})


module.exports = Route;