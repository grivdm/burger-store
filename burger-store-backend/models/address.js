const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        address: {
            type: String,
            default: "take-out",
            maxlength: [100, "Address should not exceed 100 characters"],
        },
        
    },
    { timestamp: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);



const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
