const mongoose = require("mongoose");

const House = require("./house")
const Admin = require("./admin")


const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    userType: { type: String, default: "User" },
    name: { type: String, required: true },
    googleId: { type: Number },
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String },

    mobileNumber: {
        type: Number,
        match: /^([7-9][0-9]{9})$/g,
    },
    address: {
        Street: { type: String },
        City: { type: String },
        pincode: { type: Number },
        state: { type: String },
        country: { type: String }
    },
    dateOfBirth: { type: Date },
    housesInterested: [{
        houseId: { type: mongoose.Schema.Types.ObjectID, ref: "House" },
        status: { type: String }

    }],
    wishlist:[{houseId: { type: mongoose.Schema.Types.ObjectID, ref: "House" }}],
    housesHistory: [{
        houseId: { type: mongoose.Schema.Types.ObjectID, ref: "House" },
        joinDate: { type: Date },
        vacateDate: { type: Date }
    }],
    token: {
        type: String,
    },
    passResetKey: { type: String },
    passKeyExpires: { type: Number },
    verificationKey: { type: String },
    verificationKeyExpires: { type: Number },
    isEmailVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: "false" }
})

module.exports = mongoose.model("User", userSchema);