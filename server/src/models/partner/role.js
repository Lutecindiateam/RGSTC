const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        permission: {
            type: Object,
            trim: true
        },
        createdBy: {
            type: Object,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("role", applySchema);
