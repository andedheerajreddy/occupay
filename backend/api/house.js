const express = require("express");
const router = express.Router();
const itemLib = require("../lib/itemlib");
const mongoose = require("mongoose");

const houseModel = require("../models/house");
const adminModel = require("../models/admin");
const userModel = require("../models/user");

router.post("/add", (req, res) => {
    let data = req.body;
    data._id = new mongoose.Types.ObjectId()
    itemLib.createitem(data, houseModel, (err, itemDetails) => {
        if (err) {
            res.status(404).json({
                error: err
            })
        } else {
            const houseId = itemDetails._id;
            itemLib.updateItemField({ _id: req.user.userId }, { $push: { houses: { houseId } } }, adminModel, (err, result) => {
                if (err) {
                    res.status(400).json({ error: "err1" });
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