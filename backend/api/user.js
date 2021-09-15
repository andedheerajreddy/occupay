const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const emailTemplates = require("../emails/email");

const itemLib = require("../lib/itemlib");
const houseModel = require("../models/house");
const adminModel = require("../models/admin");
const userModel = require("../models/user");
const admin = require("../models/admin");
const { Router } = require("express");

const shortid = require("shortid");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SendgridAPIKey);

router.post("/resendVerificationEmail", async(req, res, next) => {
    const { email } = req.body;

    var flag = 0;
    console.log(flag)
    const user = await userModel.findOne({ email });
    if (user) {

        if (user.verificationKey == null) {
            return res.status(200).json({ message: "already verified" })
        }
        user.verificationKey = shortid.generate();
        user.verificationKeyExpires = new Date().getTime() + 20 * 60 * 1000;
        await user
            .save()
            .then((result) => {
                const msg = {
                    to: email,
                    from: process.env.sendgridEmail,
                    subject: "OCCUPAY: Email Verification",
                    text: " ",
                    html: emailTemplates.VERIFY_EMAIL(result),
                };

                sgMail
                    .send(msg)
                    .then((result) => {
                        res.status(200).json({
                            message: "Password reset key sent to email",
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            // message: "something went wrong1",
                            error: err.toString(),
                        });
                    });
            })
            .catch((err) => {
                res.status(400).json({
                    message: "Some error occurred",
                    error: err.toString(),
                });
            });
    } else {
        return res.status(400).json({
            message: "email not found",

        })
    }
});
router.patch("/removehouse/:houseid",(req, res)=>{  
     let userId = "60cdc02cd333591b4c72eba6"
itemLib.updateItemField({ _id: userId }, { $pull: { wishlist: { houseId: req.params.houseid } } }, userModel, async(err, result) => {
        if(err)
        {
            res.status(404).json({
                message: "error occured",
            });
        }
        else
        {
            res.status(200).json({
                result: result,
                message:"removed"
                
            });   
        }
    })
})
router.patch("/verifyEmail", async(req, res, next) => {
    console.log(req.body)
    const { verificationKey } = req.body;
    await userModel.findOne({ email: req.body.email })
        .then(async(user) => {
            if (user.verificationKey == null) {
                return res.status(200).json({ message: "already verified" })

            }

            if (Date.now() > user.verificationKeyExpires) {
                res.status(401).json({
                    message: "Pass key expired",
                });
            }
            if (verificationKey != user.verificationKey) {
                return res.status(409).json({
                    message: "Invalid verification key",
                    error: err.toString(),
                });
            }
            user.verificationKeyExpires = null;
            user.verificationKey = null;
            user.isEmailVerified = true;
            await user
                .save()
                .then((result1) => {
                    res.status(200).json({
                        message: "User verified",
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Some error",
                        error: err.toString(),
                    });
                });
        })
        .catch((err) => {
            res.status(409).json({
                message: "Invalid verification key",
                error: err.toString(),
            });
        });
});



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



                        itemLib.createitem(user, userModel, async(err, result) => {
                            if (err) {
                                res.status(500).json({
                                    error: err,
                                });
                            } else {
                                result.verificationKey = shortid.generate();
                                result.verificationKeyExpires =
                                    new Date().getTime() + 20 * 60 * 1000;
                                await result
                                    .save()
                                    .then((result1) => {
                                        const msg = {
                                            to: result.email,
                                            from: process.env.sendgridEmail,
                                            subject: "OCCUPAY: Email Verification",
                                            text: " ",
                                            html: emailTemplates.VERIFY_EMAIL(result1),
                                        };

                                        sgMail
                                            .send(msg)
                                            .then((result) => {
                                                console.log("Email sent");
                                            })
                                            .catch((err) => {
                                                console.log(err.toString());
                                                res.status(500).json({
                                                    // message: "something went wrong1",
                                                    error: err,
                                                });
                                            });
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
                                    });
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
router.get("/",(req, res)=>
{
    let userId = "60cdc02cd333591b4c72eba6"
    itemLib.getItemByQuery({_id:userId},userModel,(err,result)=>
    {
        if(err)
        {
            res.status(404).json({
                message: "error occured",
            });
        }
        else
        {
            res.status(200).json({
                result: result[0],
            });   
        }
    })
})
router.patch("/updateprofile",(req, res)=>{
    let userId = "60cdc02cd333591b4c72eba6";
    itemLib.updateItemField({ _id: userId},{$set:req.body},userModel, (err, itemDetails) => {
        if (err) {
            res.status(404).json({
                error: err
            })
        } else {
            res.status(200).json({
                message: "Updated",
            });

        }
    }
)})
router.patch("/requesthouse/:houseId", (req, res) => {
    let houseid = req.params.houseId
    req.user = "60cdc02cd333591b4c72eba6"
    itemLib.getItemByQuery({_id:req.user,"housesInterested.houseId": houseid },userModel,(err, item) => {
        if(err)
        {
            return res.status(400).json({
                message: "Some error",
            });
        }
        else
        {   console.log(item);
            if(item.length>0)
            {
                return res.status(200).json({
                    message: "Already existed",
                });
            }
            else
            {
                itemLib.updateItemField({ _id: req.user }, { $push: { housesInterested: { houseId: houseid, status: "Pending" } } }, userModel, (err, result) => 
                {
                    if (err) {
                        res.status(404).json({
                            message: err,
                        });
                    } else { 
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
            }
        }

    })
    
})
router.get("/wishlist", (req, res) => {
    const userId = "60cdc02cd333591b4c72eba6";
    let populateJson = {
        path: 'wishlist',
        populate: { path: 'houseId' }
    }
    itemLib.getItemByQueryWithPopulate({ _id: userId, isDeleted: false }, userModel, populateJson, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Error",
            });
        } else {
            res.status(200).json({
                result,
            });
        }
    })

})

router.get("/getacceptedusers",(req,res)=>{
    const userId = "60cdc02cd333591b4c72eba6";
    let populateJson = {
        path: 'housesInterested',
        populate: { path: 'houseId' }
    }
    itemLib.getItemByQueryWithPopulate({ _id: userId, isDeleted: false,"housesInterested.status": "Accepted" }, userModel, populateJson, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Error",
            });
        } else {
            res.status(200).json({
                result,
            });
        }
    })
})
module.exports = router