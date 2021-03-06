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

const checkAuth = require("../middleware/checkauth");
const checkAuthAdmin = require("../middleware/checkauthadmin");
const checkAuthUser = require("../middleware/checkauthuser");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../frontend/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });
router.post("/addpics",checkAuth, upload.array("file", 6), (req, res) => {
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
router.patch("/addtowishlist/:id",checkAuth, (req, res) => {
    const userId = req.user.userId
    const houseID = req.params.id;
    console.log(houseID)
    itemLib.getItemByQuery({ "wishlist.houseId": houseID }, userModel, (err, item) => {
        if (err) {
            return res.status(400).json({
                message: "Some error",
            });
        } else {
            if (item.length > 0) {
                return res.status(200).json({
                    message: "Already existed",
                });
            } else {
                itemLib.updateItemField({ _id: userId }, { $push: { wishlist: { houseId: houseID } } }, userModel, async(err, result1) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Some error",
                        });
                    } else {
                        return res.status(200).json({
                            message: "Updated",
                        });
                    }
                })
            }
        }

    })

})
router.post("/add",checkAuth, upload.single("file"), (req, res) => {
    let data = req.body;
    console.log(data);
    data._id = new mongoose.Types.ObjectId()
    data.adminId =req.user.userId
    itemLib.createitem(data, houseModel, (err, itemDetails) => {
        if (err) {
            res.status(404).json({
                error: err
            })
        } else {
            const houseId = itemDetails._id;
            console.log(itemDetails);
            const userId =req.user.userId
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

router.get("/available", checkAuth,(req, res) => {
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


router.post("/filter",checkAuth, (req, res) => {
    console.log(req.body)
    let a = req.body;
    a.occupiedStatus = false;
    a.isDeleted = false
    console.log(a);
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
router.patch("/:id", checkAuth,(req, res) => {
    var houseId = req.params.id;
    let data = req.body;
    let pics = data.pics
    console.log(pics);
    if (pics && pics.length)
        delete data.pics
    itemLib.updateItemField({ _id: houseId }, { $set: data }, houseModel, (err, itemDetails) => {
        if (err) {
            res.status(404).json({
                error: err
            })
        } else {
            if (pics && pics.length > 0) {
                itemLib.updateItemField({ _id: req.params.id }, { $push: { pics: pics } }, houseModel, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            error: err,
                        });
                    } else {
                        return res.status(200).json({
                            message: "updated",
                            result,
                        });
                    }
                })
            }
            let result = itemDetails
            res.status(200).json({
                message: "updated",
                result,
            });
        }
    })
})
router.get("/:houseId", checkAuth,(req, res) => {
    itemLib.getItemByQueryWithPopulate({ _id: req.params.houseId, isDeleted: false }, houseModel, "adminId usersInterested.userId", (err, result) => {
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
router.get("/joineduser/:houseId", checkAuth,(req, res) => {
    let populateJson = {
        path: 'currentUser'}
    itemLib.getItemByQueryWithPopulate({ _id: req.params.houseId, isDeleted: false }, houseModel, populateJson, (err, result) => {
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