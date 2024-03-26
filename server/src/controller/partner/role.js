const role = require("../../models/partner/role")
const partnerAdmin = require("../../models/partner/admin");

exports.createRole = async (req, res) => {
    const { name, permission, createdBy } = req.body;
    try {
        const existingRole = await role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }
        const newRole = new role({
            name,
            permission,
            createdBy
        })
        const response = await newRole.save();
        return res.status(200).json({ status: "success", data: response })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Something went wrong" })
    }
}

exports.getAdminRole = async (req, res) => {
    try {
        const response = await role.find();
        if (response) {
            return res.status(200).json({
                data: { response },
                status: "success",
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.editParticularRole = async (req, res) => {
    try {
        const { name, permission } = req.body;
        const response = await role.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: name,
                    permission: permission
                },
            },
            { new: true }
        );
        const editUser = await partnerAdmin.findOneAndUpdate(
            {role : name},
            {
                $set: {
                    permission: permission
                },
            },
            {new: true}
        );
        if (response) {
            return res.status(200).json({
                // data: { response },
                status: "success",
                message: "Role Change Successfully",
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Something Wrong",
        });
    }
}

exports.deleteRole = async(req, res) => {
    try {
        const id = req.params.id;
        const response = await role.deleteOne({ _id: id });
        if (response) {
            return res.status(200).json({ status: "success" })
        }
    } catch (err) {
        return res.status(200).json({ message: "Something is wrong" })
    }
}