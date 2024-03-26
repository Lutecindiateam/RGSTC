const fs = require("fs");
const upload = require("../../models/partner/upload");
const csv = require("csv-parser");
const agent = require("../../models/partner/agent");
const otp = require("../../models/partner/otp");
const preproposal = require("../../models/partner/preproposal");


exports.uploadProductsFromCSV = (req, res) => {
  // console.log(req.params);
  try {
    const csvData = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        csvData.push(row);
      })
      .on("end", async () => {
        const savedProducts = [];

        for (const row of csvData) {
          // console.log(row);

          if (
            !row.BusinessName ||
            !row.Address ||
            !row.Mobile ||
            !row.Pincode ||
            !row.City ||
            !row.State ||
            !row.Category ||
            !row.Subcategory ||
            !row.LeadStatus ||
            !row.Status
          ) {
            return res.status(400).json({
              status: "error",
              message: "Data validation failed for a row.",
            });
          }

          const product = {
            businessName: row.BusinessName,
            address: row.Address,
            mobile: row.Mobile,
            pincode: row.Pincode,
            city: row.City,
            state: row.State,
            category: row.Category,
            subcategory: row.Subcategory,
            leadStatus: row.LeadStatus,
            status: row.Status,
            p_id: req.params.id,
          };
          // console.log(product);
          // Save the product one at a time
          const savedProduct = await upload.create(product);
          if (savedProduct) {
            savedProducts.push(savedProduct);
          }
        }
        // console.log(savedProducts.length);
        // Send the response after processing all rows
        if (savedProducts.length > 0) {
          res.status(200).json({
            data: { savedProducts },
            status: "success",
            message: "Data uploaded successfully",
          });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.uploadShopData = async (req, res) => {
  try {
    // let amt;
    // console.log(req.body);
    // const { p_id } = req.params.id;
    const {
      applicant,
      project_name,
      mobile,
      gender,
      scheme,
      industry,
      project_brief,
      date_docSubmision,
      lastExam_passingYear,
      estimate_cost,
      applicant_id,
    } = req.body;

    const check_preproposal = await preproposal.findOne({ applicant_id: applicant_id, status: true }).exec();
    if (!check_preproposal) {
      return res.status(400).json({ message: "Your Preproposal has not been approved yet. Please wait for further notification." });
    }

    // const university = req.body.university || req.body.otherUniversity;
    // let documents = [];

    // const branch_name = JSON.parse(branch_obj);
    // if (req.files && req.files.length > 0) {
    //   documents = req.files.map((file) => {
    //     return { img: file.filename };
    //   });
    // }

    // if (course === "M.Tech") {
    //   if (category === "SC") {
    //     amt = branch_name.fees;
    //   } else {
    //     amt = branch_name.amount;
    //   }
    // } else if (course === "POLY FY & DSY") {
    //   if (category === "EBC" || category === "OBC") {
    //     amt = branch_name.fees;
    //   } else {
    //     amt = branch_name.amount;
    //   }
    // } else {
    //   amt = branch_name.amount;
    // }

    // console.log(amt);

    // const existingApplication = await upload
    //   .findOne({ mobile: req.body.mobile })
    //   .exec();
    // if (existingApplication) {
    //   return res.status(400).json({ message: "Same Application Already Exist" });
    // }


    // const parent_mobile = p_mobile !== "undefined" ? Number(p_mobile) : "NA";
    // const source = source_name !== "undefined" ? source_name : "Other";
    // const f_mobile = family_mobile !== "undefined" ? family_mobile : "NA";

    // const verify = await otp.findOne({ mobile: mobile }).exec();
    // if (!verify) {
    //   return res.status(400).json({ message: "Verify Candidate Mobile Number" });
    // }
    // // const verifycandidate = verify ? true : false

    // const p_verify = await otp.findOne({ mobile: p_mobile }).exec();
    // if (!p_verify) {
    //   return res.status(400).json({ message: "Verify Parent Mobile Number" });
    // }
    // const verifyparent = p_verify ? true : false

    const student = new upload({
      applicant,
      project_name,
      mobile,
      gender,
      scheme,
      industry,
      project_brief,
      date_docSubmision,
      lastExam_passingYear,
      estimate_cost,
      applicant_id
    });

    const response = await student.save();
    if (response) {
      return res.status(200).json({
        data: response,
        status: "success",
        message: "Data uploaded successfully",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.createPreproposal = async (req, res) => {
  try {
    const {
      title,
      institution_name,
      investigator_name,
      objective,
      methodology,
      start_date,
      end_date,
      approx_cost,
      project_scope,
      necessity,
      benefit,
      applicant_id,
      applicant_name,
      remark
    } = req.body;

    const student = new preproposal({
      title,
      institution_name,
      investigator_name,
      objective,
      methodology,
      start_date,
      end_date,
      approx_cost,
      project_scope,
      necessity,
      benefit,
      applicant_id,
      applicant_name,
      remark
    });

    const response = await student.save();
    if (response) {
      return res.status(200).json({
        data: response,
        status: "success",
        message: "Data uploaded successfully",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

exports.getPreProposal = async (req, res) => {
  try {
    const response = await preproposal.find();
    if (response) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
}

exports.editPreproposal = async (req, res) => {
  try {
    const response = await preproposal.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: true,
          remark: req.body.remark
        },
      },
      { new: true }
    )
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully"
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
}

exports.getEditorAdmission = async (req, res) => {
  try {
    const response = await upload.find();
    if (response.length > 0) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

exports.getaAgentSource = async (req, res) => {
  try {
    const response = await agent.find();
    if (response) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
    // console.log(req.params);
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};
