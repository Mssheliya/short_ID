const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
// const {loggedinUserOnly,checkauth} = require("./Middelwares/auth");
const {checkforAuthentication, restrictTo} = require("./Middelwares/auth");
const {connectMongoDB} = require("./connection");
const app = express();
const port = 8000;

const url_Router = require("./Routes/urlRoutes");
const user_Router = require("./Routes/userRoutes");
const static_Router = require("./Routes/statisRoutes");

// DB Connection
connectMongoDB("mongodb://127.0.0.1:27017/Short_id");

// middelwares
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use(cookieParser());
app.use(checkforAuthentication);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.use("/api/url", restrictTo(["USER","ADMIN"]), url_Router);
app.use("/api/user", user_Router);
app.use("/", static_Router);


app.listen(port,()=> console.log(`Your Server Running On Port:- ${port}`));
