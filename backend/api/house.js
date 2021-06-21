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
        cb(null, __dirname + '/../../frontend/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });
router.post("/addpics", upload.array("file",6), (req, res) => {
    console.log(req.files);
    let a = []
    for (let i = 0; i < req.files.length; i++) {
        var img = fs.readFileSync(req.files[i].path);
        var encode_image = img.toString('base64');
        var finalimage = {
            filename: req.files[i].filename,
            contentType: req.files[i].mimetype,
        }
        a.push(finalimage);
    }
    // console.log(a);
    res.json({ 'data': a })
        //save here
})
router.patch("/addtowishlist/:id", (req, res)=>
{
    const userId = "60cdc02cd333591b4c72eba6"
    const houseID=req.params.id;
    itemLib.updateItemField({ _id: userId}, { $push: {wishlist : { houseID } } },userModel , async(err, result1) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else {
            await res.status(200).json({
                message: "Updated",
            });
        }
    })
})
router.post("/add", upload.single("file"), (req, res) => {
    let data = req.body;
    console.log(data);
    data._id = new mongoose.Types.ObjectId()
    data.adminId = "60a69ab64a417f3f68819172"
    itemLib.createitem(data, houseModel, (err, itemDetails) => {
        if (err) {
            res.status(404).json({
                error: err
            })
        } else {
            const houseId = itemDetails._id;
            console.log(itemDetails);
            const userId = "60a69ab64a417f3f68819172"
            itemLib.updateItemField({ _id: userId }, { $push: { houses: { houseId } } }, adminModel, (err, result) => {
                if (err) {
                    res.status(400).json({ message: "error", err });
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


router.post("/filter", (req, res) => {
    console.log(req.body)
    let a = req.body;
    a.occupiedStatus = false;
    a.isDeleted = false
    console.log(a)

    itemLib.getItemByQuery(a, houseModel, (err, result) => {
        if (err) {
            res.status(400).json({
                message: err,
            });
        } else {
            res.status(200).json({
                message: "Successfully retrieved",
                result,
            });
        }
    })
})
router.patch("/:id",(req, res) => {
    var houseId=req.params.id;
    let data=req.body;
    let pics=data.pics
    console.log(pics);
    delete data.pics
    itemLib.updateItemField({ _id: houseId},{$set:data},houseModel,(err, itemDetails) => {
        if (err) {
            res.status(404).json({
                error: err
            })
        } else {
            itemLib.updateItemField({ _id: req.params.id }, { $push:{pics:pics} }, houseModel, (err, result) => {
                if (err) {
                    res.status(500).json({
                        error: err,
                    });
                } else {
                   console.log("updated Pics");
                }
            })
            const houseId = itemDetails._id;
            console.log(itemDetails);
            userId = "60a69ab64a417f3f68819172"
            itemLib.updateItemField({ _id: userId }, { $push: { houses: { houseId } } }, adminModel, (err, result) => {
                if (err) {
                    res.status(400).json({ message: "error", err });
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