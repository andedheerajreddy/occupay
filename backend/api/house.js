const express = require("express");
const router = express.Router();
const itemLib = require("../lib/itemlib");
const mongoose = require("mongoose");
var fs = require('fs');
var path = require('path');
const houseModel = require("../models/house");
const adminModel = require("../models/admin");
const userModel = require("../models/user");
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
});
 
var upload = multer({ storage: storage });
router.post("/addpics",upload.array("file"),(req,res)=>
{
    console.log(req.files);
    let a=[]
    for(let i=0; i<req.files.length; i++)
    {
        var img=fs.readFileSync(req.files[i].path);
        var encode_image=img.toString('base64');
        var finalimage={
        filename: req.files[i].filename,
        contentType: req.files[i].mimetype,
        }
        a.push(finalimage);
    }
    // console.log(a);
    res.json({'data':a})
    //save here
})
router.post("/add",upload.single("file"),(req, res) => {
    let data = req.body;
    console.log(data);
    data._id = new mongoose.Types.ObjectId()
    data.adminId="60a69ab64a417f3f68819172"
    itemLib.createitem(data, houseModel, (err, itemDetails) => {
        if (err) {
            res.status(404).json({
                error: err
            })
        } else {
            const houseId = itemDetails._id;
            console.log(itemDetails);
           userId="60a69a7f4a417f3f68819170"
            itemLib.updateItemField({ _id:userId }, { $push: { houses: { houseId } } }, adminModel, (err, result) => {
                if (err) {
                    res.status(400).json({ message:"error",err });
                } else {

                    res.status(201).json({
                        message: "created",
                        itemDetails
                    })

                }
            })
        }
    })
})

router.get("/available", (req, res) => {
    itemLib.getItemByQueryWithSelect({ occupiedStatus: false, isDeleted: false }, houseModel, "-__v", (err, result) => {
        if (err) {
            res.status(400).json({
                message: "An error occurred",
            });
        } else {
            res.status(200).json({
                message: "Successfully retrieved",
                result,
            });
        }
    })
})


router.get("/:houseId", (req, res) => {
    itemLib.getItemByQueryWithPopulate({ _id: req.params.houseId, isDeleted: false }, houseModel, "adminId", (err, result) => {
        if (err || result.length <= 0) {
            res.status(400).json({
                message: "some error occurred",
            });
        } else {
            res.status(200).json({
                result: result[0],
            });
        }
    })
})

module.exports = router