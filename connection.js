const mongoose = require("mongoose");

function connectMongoDB(URL){
    return mongoose.connect(URL)
    .then(()=> console.log("MongoDB Connected Successfully"))
    .catch((err)=> console.log(`Mongo DB Error:- ${err}`));
}

module.exports = {
    connectMongoDB,
}