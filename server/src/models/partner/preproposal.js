const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        institution_name: {
            type: String,
            trim: true,
        },
        investigator_name: {
            type: String,
            trim: true,
        },
        objective: {
            type: String,
            trim: true,
        },
        methodology: {
            type: String,
            trim: true,
        },
        start_date: {
            type: String,
            trim: true,
        },
        end_date: {
            type: String,
            trim: true,
        },
        approx_cost: {
            type: String,
            trim: true,
        },
        project_scope: {
            type: String,
            trim: true,
        },
        necessity: {
            type: String,
            required: true,
            trim: true,
        },
        benefit: {
            type: String,
            trim: true,
        },
        applicant_id: {
            type: String,
            required: true,
            trim: true,
        },
        applicant_name: {
            type: String,
            trim: true,
        },
        status: {
            type: Boolean,
            default: false
        },
        remark: {
            type: String,
            trim: true
        },
        reject: {
            type: Boolean,
            default: false
        }
    },

    { timestamps: true }
);

module.exports = mongoose.model("preproposal", applySchema);
