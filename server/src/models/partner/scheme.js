const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
    {
        scheme: {
            type: String,
            required: true,
            trim: true,
        },
        referee: {
            type: Array,
            trim: true,
        },
        committee: {
            type: Array,
            required: true,
            trim: true,
        },
        
    },

    { timestamps: true }
);

module.exports = mongoose.model("scheme", applySchema);
