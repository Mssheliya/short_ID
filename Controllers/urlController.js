const urlModel = require("../Models/urlModel");
const shortID = require("shortid"); 
const confirm = require("prompt-confirm");

const createURL = async(req,res)=> {
    const body = req.body;
    if(!body.URL) return res.status(400).json("URl Are required");
    const shortid = shortID(); 

    const data = await urlModel.create({
        shortID:shortid,
        redirectURL: body.URL,
        createdBy: req.user._id,
    });
    res.render("generateshortID", {
        id: data.shortID,
        user: req.user,
    })
    // res.status(201).json({
    //     "msg":"Success",
    //     "ShortID": data.shortID
    // })
}

const handleredirectURL = async(req,res)=> {
    const shortid = req.params.shortID;
    // console.log(shortid);
   const redi = await urlModel.findOneAndUpdate({shortID:shortid},{
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });
    res.redirect(redi.redirectURL);
}

const deleteURL = async (req,res)=> {
    const shortid = req.params.id;
    // console.log(shortid);
    await urlModel.deleteOne({ shortID:shortid });
    // return res.redirect("/api/url");
    return res.json({"msg":"Deleted Successfully"})
    // return console.log("Deleted Success FUlly");
}

const urlAnalatics = async(req,res)=> {
    const shortid = req.params.shortID;
    const result = await urlModel.findOne({shortID:shortid});
    res.status(200).json({
        "TotalClicks": result.visitHistory.length,
        "Analatics": result.visitHistory
    })
}

const geturlbyUser = async (req,res)=> {
    const urls = await urlModel.find({createdBy:req.user._id});
    res.render("home", {
        urls: urls,
        user: req.user,
    })
}
module.exports = {
    createURL,
    handleredirectURL,
    urlAnalatics,
    geturlbyUser,
    deleteURL,
}