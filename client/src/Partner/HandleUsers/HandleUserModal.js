import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segmented, Table, Input, Spin } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
    requestAdminAddFunctional
} from "../../Redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Layout from "../Layout";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AgentGraph from "../AgentGraph";
// import { Input } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';


const style = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    maxHeight: "90vh", // Set maximum height to 90% of the viewport height
    overflowY: "auto", // Enable vertical scrolling if content exceeds the height
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 4
};

const UserModel = ({
    id,
    openUser,
    handleUserClose,
    list,
    user,
    onSubmit,
    spinning,
    setSpinning,
    role,
    ...props
}) => {

    const [data, setData] = useState({});

    function onChangeData(e) {
        if (e.target.type === "radio") {
            setData((data) => ({
                ...data,
                [e.target.name]: parseInt(e.target.value),
            }));
        } else {
            setData((data) => ({
                ...data,
                [e.target.name]: e.target.value,
            }));
        }
    }

    const submitProductForm = () => {
        // Handle form submission here
        if (!data.name || !data.email || !data.password || !data.role) {
            // Display an error message or handle empty fields as needed

            alert("Please fill in all fields.");
            return; // Exit early if any field is empty
        }
        setSpinning(true)
        const findRole = role.filter((value) => value._id === data.role);

        let form = new FormData();
        form.append("email", data.email);
        form.append("name", data.name);
        form.append("password", data.password);
        form.append("role", findRole[0].name);
        // form.append("permission", findRole[0].permission);
        findRole[0].permission.forEach((item) => form.append("permission[]", item))
        props.requestAdminAddFunctional({
            data: form,
        });
        handleUserClose();
        setData({});
    };
    return (
        <Modal
            open={openUser}
            onClose={handleUserClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onSubmit={submitProductForm}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create User
                </Typography>
                <hr />
                <div>
                    <label htmlFor="name">Name:</label>
                    <Input
                        size="large"
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder={`Enter User Name`}
                        onChange={onChangeData}
                    />
                </div>

                <br />
                <div>
                    <label htmlFor="email">Email:</label>
                    <Input
                        size="large"
                        label="Email"
                        id="email"
                        name="email"
                        value={data.email}
                        placeholder={`Enter Email`}
                        onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Set New Password:</label>
                    <Input
                        size="large"
                        label="Password"
                        id="password"
                        name="password"
                        value={data.password}
                        placeholder={`Enter Password`}
                        onChange={onChangeData}
                    />
                </div>
                <br />
                <label htmlFor="name">Role:</label>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">Select Role</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.role}
                        name="role"
                        label="Select Role"
                        onChange={onChangeData}
                        style={{ borderRadius: '10px' }}
                    >

                        {role?.map((value, index) => (
                            <MenuItem key={index} value={value._id}>
                                {value.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={submitProductForm}>
                        Create
                    </Button>
                </div>
            </Box>
        </Modal>

    );
};

const mapStateToProps = (state) => {
    return {
        candidate: state.candidate,
        employee: state.employee,
        data: state.data,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            requestAdminAddFunctional
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(UserModel);
