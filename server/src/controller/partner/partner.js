const Partner = require("../../models/partner/partner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const admin = require("../../models/admin");
const User = require("../../models/user");
const Admin = require("../../models/admin");
const agent = require("../../models/partner/agent");
const upload = require("../../models/partner/upload");
const partner = require("../../models/partner/partner");
const partnerAdmin = require("../../models/partner/admin")
// Make sure to replace this with the actual path to your Partner model
exports.getPartnerProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Partner.findById(id).exec();
    if (response) {
      return res.status(200).json({
        status: "success",
        data: response,
        message: "profile get succesfully",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.adminupdate = async (req, res) => {
  try {
    const update = await Partner.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          active: "success",
        },
      },
      { new: true }
    );

    if (update) {
      return res.status(201).json({
        message: "request find successfully",
        data: update,
        status: "success",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

exports.admin_action = async (req, res) => {
  // console.log(req);
  try {
    const pendinguser = await Partner.find();

    return res.status(200).json({
      message: "Request find successful",
      data: pendinguser,
      status: "success",
      // count: pendinguser.length,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.registerApplicant = async (req, res) => {
  try {
    const existingEmailPartner = await partner
      .findOne({
        email: req.body.email,
      })
      .exec();
    if (existingEmailPartner) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const {
      name,
      phone,
      gender,
      email,
      password,
      dob
    } = req.body;

    const applicant = new partner({
      name,
      phone,
      gender,
      email,
      password,
      dob,
      role: "clerk",
    });
    
    applicant.password = await bcrypt.hash(password, 10);
   
    const saveApplicant = await applicant.save();
    if (saveApplicant) {
      return res.status(201).json({
        message: "User created successfully",
        data: applicant,
        status: "success",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

exports.authenticate_partner = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // Check if user exists

    await Partner.findOne({ email }).then((user) => {
      // console.log(user);
      // console.log("EMAIL :: ", user)
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      } else if (user.active == "pending") {
        return res.status(400).json({
          error:
            "Your request is currently pending. Please contact our support team.",
        });
      }
      bcrypt.compare(password, user.password, function (error, isMatch) {
        // console.log("MATCH :: ", isMatch);
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 31556926 },
            (err, token) => {
              return res.status(200).json({
                data: { id: user.id, token: token, role: user.role , name: user.name},
                message: "Sign In success",
                status: "success",
              });
            }
          );
        } else {
          return res.status(400).json({ error: "Invalid password" });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Semething Went Wrong" });
  }
};

exports.forget_partner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const b_password = await bcrypt.hash(password, 10);

    const existingUser = await Partner.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "Email not found",
        status: "error",
      });
    }

    const forget = await Partner.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: b_password,
        },
      },
      { new: true }
    );
    if (forget) {
      return res.status(200).json({
        message: "forget password successful",
        status: "success",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.authenticate_agent = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // Check if user exists

    await agent.findOne({ email }).then((user) => {
      // console.log(user);
      // console.log("EMAIL :: ", user)
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      } else if (user.active == "pending") {
        return res.status(400).json({
          error:
            "Your request is currently pending. Please contact our support team.",
        });
      }
      bcrypt.compare(password, user.password, function (error, isMatch) {
        // console.log("MATCH :: ", isMatch);
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 31556926 },
            (err, token) => {
              return res.status(200).json({
                data: { id: user.id, token: token, role: user.role },
                message: "Sign In success",
                status: "success",
              });
            }
          );
        } else {
          return res.status(400).json({ error: "Invalid password" });
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error: "Semething Went Wrong" });
  }
};

exports.agentProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await agent.findById(id).exec();
    if (response) {
      return res.status(200).json({
        status: "success",
        data: response,
        message: "Agent profile get succesfully",
      });
    }
    // console.log(response);
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.getAgentStudent = async (req, res) => {
  // console.log(req.params.id);
  try {
    const response = await upload.find({ source_id: req.params.id });
    if (response.length > 0) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.getAdminUsers = async (req, res) => {
  try {
    const response = await partnerAdmin.find({ role: { $ne: "superadmin" } });
    if (response) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.editResetPass = async (req, res) => {
  try {
    const { email, name, role, password ,permission} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const response = await partnerAdmin.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email: email,
          name: name,
          role: role,
          password: hash,
          permission: permission
        },
      },
      { new: true }
    );
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};
exports.getInProgressProjects = async(req , res) => {
  try {
    const response = await upload.find({ applicant_id: req.params.id , status: { $ne : "true"}});
    if (response.length > 0) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
}
