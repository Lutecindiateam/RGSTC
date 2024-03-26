import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segmented, Table, Input, Spin } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
    requestAdminAddIndustry
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
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
// import AddPermission from "../Permissions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const style = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    maxHeight: "90vh", // Set maximum height to 90% of the viewport height
    overflowY: "auto", // Enable vertical scrolling if content exceeds the height
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 4
};

const RolesModal = ({
    id,
    openUser,
    handleUserClose,
    list,
    user,
    onSubmit,
    spinning,
    setSpinning,
    ...props
}) => {

    const [data, setData] = useState({});
    const Permissions = ["access calendar", "access chat", "access fileManager", "scheme management", "preproposal approval", "first-approval","second-approval"]
    const [permission, setPermission] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPermission(
            // value
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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

    const handleSelect = (data) => {
        // console.log(data);
        setPermission(data);
    }
    const submitProductForm = () => {
        // Handle form submission here
        if (!data.name || permission.length === 0) {
            // Display an error message or handle empty fields as needed

            alert("Please fill in all fields.");
            return; // Exit early if any field is empty
        }
        setSpinning(true)
        // let form = new FormData();
        // form.append("name", data.name);
        // form.append("permission", permission)
        // form.append("createdBy", user.id)

        props.requestAdminAddIndustry({
            // data: form,
            name: data.name,
            permission: permission,
            createdBy: user.id
        });
        handleUserClose();
        setData({});
        setPermission([]);
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
                    Create Role
                </Typography>
                <hr />
                <div>
                    <label htmlFor="name">Name:</label>
                    <Input
                        size="large"
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder={`Enter Role Name`}
                        onChange={onChangeData}
                    />
                </div>

                <br />

                <label htmlFor="name">Permissions:</label>
                {/* <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">Select Role</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.role}
                        label="Age"
                        name="role"
                        onChange={onChangeData}
                        style={{ borderRadius: '10px' }}
                    >
                        {Permissions.map((value) => (
                            <MenuItem value={value}>{value}</MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
                <br />
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={permission}
                        onChange={handleChange}
                        input={<OutlinedInput label="Select" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {Permissions.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={permission.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* <AddPermission onDataUpdate={handleSelect} /> */}
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
            requestAdminAddIndustry
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RolesModal);
