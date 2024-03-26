const scheme = require("../../models/partner/scheme");
const partnerAdmin = require("../../models/partner/admin")
const bcrypt = require("bcrypt");

exports.saveScheme = async (req, res) => {
    try {
        const data = req.body;
        const response = await scheme.create(data);
        return res.status(200).json({ message: "success", scheme: response })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Something is wrong" })
    }
}

exports.getScheme = async (req, res) => {
    try {
        const response = await scheme.find();
        return res.status(200).json({ status: "success", data: response })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Something is wrong" })
    }
}

exports.getRefereeCommittee = async (req, res) => {
    try {
        const response = await partnerAdmin.find({ role: "editor", role: "admin" })
        console.log(response);
    } catch (err) {
        console.log(err.message);
        return res.status(200).json({ message: "Something is wrong" })
    }
}

exports.addAdminUsers = async (req, res) => {
    try {
        const { email, name, password, role, permission } = req.body;
        const existingUser = await partnerAdmin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = new partnerAdmin({
            name,
            email,
            password,
            role,
            permission,
            // active,
        });
        user.password = await bcrypt.hash(password, 10);
        const response = await user.save()
        return res.status(200).json({ status: "success", data: response })
    } catch (err) {
        console.log(err.message);
        return res.status(200).json({ message: "Something is wrong" })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await partnerAdmin.deleteOne({ _id: id });
        if (response) {
            return res.status(200).json({ status: "success" })
        }
    } catch (err) {
        console.log(err.message);
        return res.status(200).json({ message: "Something is wrong" })
    }
}