const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {
    applicant: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    estimate_cost: {
      type: Number
    },
    project_brief: {
      type: String,
      trim: true
    },
    scheme: {
      type: String
    },
    project_name: {
      type: String,
      trim: true
    },
    industry: {
      type: String
    },
    parent_mobile: {
      type: String,

      // required: true,
      // trim: true,
    },
    f_mobile: {
      type: String,
    },
    gender: {
      type: String,

      required: true,
      trim: true,
    },
    course: {
      type: String,

      // required: true,
      trim: true,
    },
    branch: {
      type: String,

      // required: true,
      // trim: true,
      // default: "NA",
    },
    // amount: {
    //   type: String,
    //   trim: true
    // },
    // fees: {
    //   type: String,
    //   trim: true
    // },
    date_docSubmision: {
      type: String,

      required: true,
      trim: true,
    },
    lastExam_passingYear: {
      type: String,

      required: true,
      trim: true,
    },
    team: {
      type: String,

      // required: true,
      trim: true,
    },
    source: {
      type: String,
      // required: true,
      default: "NA",
    },

    p_id: {
      type: String,
      // required: true,
    },
    documents: {
      adhar: { type: String, default: null },
      photo: { type: String, default: null },
      sign: { type: String, default: null },
      tc: { type: String, default: null },
      tenth: { type: String, default: null },
      twelfth: { type: String, default: null },
      caste: { type: String, default: null },
      ncl: { type: String, default: null },
      domicile: { type: String, default: null },

      csv: {
        type: String,
        default: null,
      },

      cet: { type: String, default: null },
      other: { type: String, default: null },
      other2: { type: String, default: null },
      other3: { type: String, default: null },
      migration: { type: String, default: null },
      deploma: { type: String, default: null },
      allotment: { type: String, default: null },
    },
    adv_payble_amt: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      default: false,
    },
    source_id: {
      type: String,
    },
    applicant_id: {
      type: String
    },
    rejection: {
      type: String,
      default: null,
    },
    rej_name: {
      type: String,
      default: null,
    },
    rej_remark: {
      type: String,
    },
    required: {
      type: String,
      default: "Not Present"
    },
    stage: {
      type: String,
      default: null
    },
    referee_remark: {
      type: String,
      trim: true
    },
    committee_remark: {
      type: String,
      trim: true
    }
    // verifycandidate: {
    //   type: Boolean,
    //   default: false
    // },
    // verifyparent: {
    //   type: Boolean,
    //   default: false
    // }
  },

  { timestamps: true }
);

module.exports = mongoose.model("upload", applySchema);
