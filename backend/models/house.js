const mongoose = require("mongoose");

const Admin = require("./admin")
const User = require("./user")

const houseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    houseName: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectID, ref: "Admin" },
    houseDescription: { type: String, required: true },
    pics: [{
        filename: String,
        contentType: String
    }],
    usersInterested: [{
        userId: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
        status: { type: String }
    }],
    ratings: [{
        userId: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
        rating: { type: Number }
    }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
        comment: { type: String }
    }],
    address: {
        Street: { type: String },
        City: { type: String },
        pincode: { type: Number },
        state: { type: String },
        country: { type: String }
    },
    occupiedStatus: { type: Boolean, default: false },
    availableFor: { type: String },
    houseType: { type: String, required: true },
    cost: {
        rentPerMonth: { type: Number },
        maintenance: { type: Number },
        advance: { type: Number }
    },
    propertyAge: { type: String, required: true },
    preferred_tenant: { type: String, required: true },
    property_type: { type: String, required: true },
    parking: { type: String, required: true },
    balcony: { type: String, required: true },
    facing: { type: String, required: true },
    furnishing: { type: String, required: true },
    isParkingAvailable: { type: Boolean, default: false },
    usersJoined: [{
        userId: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
        joinDate: { type: Date }
    }],
    usersVacated: [{
        userId: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
        vacateDate: { type: Date }
    }],
    isDeleted: { type: Boolean, default: false }


})
module.exports = mongoose.model("House", houseSchema);