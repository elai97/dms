const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            "username": {
                "type": "String"
            },
            "email": {
                "type": "String"
            },
            "password": {
                "type": "String"
            },
            "roles": [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Role"
                }
            ],
            "status": {
                "type": "String",
                default: "Approved"
            },
            "organization": {
                "type": "String",
                default: ""
            },

        },
        {
            timestamps: true
        },
    )
);

module.exports = User;