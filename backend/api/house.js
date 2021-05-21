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
            res.status(200).json(itemDetails)
        }
    })
})


module.exports = router