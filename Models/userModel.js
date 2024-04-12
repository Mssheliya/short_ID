const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"USER",
    },
    // userImageURl:{
    //     type:String,
    //     default: "./userImages/useravatar.png",
    // }
    
},{timestamps:true});

const user = mongoose.model("user",userSchema);

module.exports = user;