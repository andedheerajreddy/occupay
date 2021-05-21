const mongoose = require("mongoose");


const House = require("./house")
const User = require("./user")

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userType: { type: String, default: "Admin" },
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
        locality: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: Number }
    },
    dateOfBirth: { type: Date },
    houses: [{
        houseId: { type: mongoose.Schema.Types.ObjectID, ref: "House" }
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
module.exports = mongoose.model("Admin", adminSchema);