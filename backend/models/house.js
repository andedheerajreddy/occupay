const mongoose = require("mongoose");

const Admin = require("./admin")
const User = require("./user")

const houseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    houseName: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectID, ref: "Admin" },
    houseDescription: { type: String, required: true },
    pics: [{ type: String }],
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
    occupiedStatus: { type: Boolean, default: false },
    availableFor: { type: String, required: true },
    houseType: { type: String, required: true },
    cost: {
        rentPerMonth: { type: Number },
        maintenance: { type: Number },
        advance: { type: Number }
    },
    propertyAge: { type: String, required: true },
    isParkingAvailable: { type: Boolean, required: true },
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