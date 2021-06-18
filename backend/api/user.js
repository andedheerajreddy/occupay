const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const itemLib = require("../lib/itemlib");
const houseModel = require("../models/house");
const adminModel = require("../models/admin");
const userModel = require("../models/user");
const admin = require("../models/admin");
const { Router } = require("express");

router.post("/signup", (req, res) => {
    itemLib.getItemByQuery({ email: req.body.email }, userModel, (err, user) => {
        if (err) {
            res.status(500).json({
                error: err.toString(),
            });
        } else {
            if (user.length >= 1) {
                res.status(409).json({
                    message: "Email already exists",
                });
            } else {

                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = {
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            mobileNumber: req.body.mobileNumber,
                            isEmailVerified: false,
                            address: req.body.address,
                            dateOfBirth: req.body.dateOfBirth,

                        };



                        itemLib.createitem(user, userModel, (err, result) => {
                            if (err) {
                                res.status(500).json({
                                    error: err,
                                });
                            } else {
                                res.status(201).json({
                                    message: "user created",
                                    userDetails: {
                                        userId: result._id,
                                        email: result.email,
                                        name: result.name,
                                        mobileNumber: result.mobileNumber,
                                        address: result.address,
                                        dateOfBirth: result.dateOfBirth
                                    },
                                })
                            }
                        })
                    }
                });
            }
        }
    })

})


router.post("/login", (req, res) => {
    itemLib.getItemByQuery({ email: req.body.email }, userModel, (err, user) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed: Email not found probably",
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed",
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            userType: user[0].userType,
                            userId: user[0]._id,
                            email: user[0].email,
                            name: user[0].name,
                            mobileNumber: user[0].mobileNumber,
                            address: user[0].address,
                            dateOfBirth: user[0].dateOfBirth
                        },
                        process.env.jwtSecret, {
                            expiresIn: "1d",
                        }
                    );

                    return res.status(200).json({
                        message: "Auth successful",
                        userDetails: {
                            userType: user[0].userType,
                            userId: user[0]._id,
                            name: user[0].name,
                            email: user[0].email,
                            mobileNumber: user[0].mobileNumber,
                            address: user[0].address,
                            dateOfBirth: user[0].dateOfBirth
                        },
                        token: token,
                    });
                }
                res.status(401).json({
                    message: "Auth failed1",
                });

            })
        }
    })
})

router.patch("/requesthouse/:houseId", (req, res) => {
    let houseid = req.params.houseId
        //need to be updated later
    req.user = "60a76a519d3fa66024750a82"
    itemLib.updateItemField({ _id: req.user }, { $push: { housesInterested: { houseId: houseid, status: "Pending" } } }, userModel, (err, result) => {
        if (err) {
            res.status(404).json({
                message: err,
            });
        } else { /////////
            itemLib.updateItemField({ _id: req.params.houseId }, { $push: { usersInterested: { userId: req.user, status: "Pending" } } }, houseModel, (err, result1) => {
                if (err) {
                    res.status(404).json({
                        message: err,
                    });
                } else {
                    res.status(200).json({
                        message: "Updated",
                        status: "Pending"
                    });
                }
            })
        }
    })
})
module.exports = router