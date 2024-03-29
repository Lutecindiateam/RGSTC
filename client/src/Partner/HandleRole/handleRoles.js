import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segmented, Table, Input, Spin } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
    requestAdminCategoryJob,
    requestAdminCompanyDetails,
    requestAdminEditSize,
    requestGetCandidate,
    requestGetApplyJob,
    requestGetInterview,
    requestAdminEditPeriod,
    requestCandidateProfile,
    requestAdminDegree,
    requestAdminEditPosition,
    requestAdminDeleteSize
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
import RolesModal from "./handleRolesModal"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "../canvasJS.css"

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
    width: 500,
    maxHeight: "90vh", // Set maximum height to 90% of the viewport height
    overflowY: "auto", // Enable vertical scrolling if content exceeds the height
    bgcolor: "background.paper",
    border: "2px #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 4
};

const DetailsModal = ({
    id,
    open,
    handleClose,
    data,
    onChangeData,
    list,
    setData,
    user,
    onSubmit,
    submitDelete,
    permission,
    setPermission
}) => {
    const Permissions = ["access calendar", "access chat", "access fileManager", "scheme management", "preproposal approval", "first-approval", "second-approval"]

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPermission(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    useEffect(() => {
        if (id) {
            const selectedItem = list.find((item) => item._id === id);
            setData(selectedItem || {});
            setPermission(selectedItem.permission)
        }
    }, [id, list]);

    const submitProductForm = () => {
        // Validate the form data if needed
        // Call the onSubmit function and pass the form data
        onSubmit(data);

        // Close the modal if needed
        handleClose();
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onSubmit={submitProductForm}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update Role
                </Typography>
                <hr />
                <div>
                    <label htmlFor="name">Name:</label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        // placeholder={`Product Name`}
                        onChange={onChangeData}
                    />
                </div>
                <br />
                <label htmlFor="name">Permissions:</label>
                <FormControl fullWidth size="small">
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
                <br />
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={submitProductForm}>
                        Update
                    </Button>
                    &nbsp;
                    <Button variant="contained" style={{ backgroundColor: "red" }} onClick={submitDelete}>
                        Delete
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};
const CreateRole = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [id, setId] = useState(null);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [graphId, setGraphId] = useState(null);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState({});
    const [list, setList] = useState([]);
    const [status, setStatus] = useState("true");
    const [open, setOpen] = React.useState(false);
    const [editorStatus, setEditorStatus] = useState(null);
    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate();
    const [openUser, setOpenUser] = useState(false)
    const [permission, setPermission] = React.useState([]);

    const handleOpen = (id) => {
        setId(id);
        setOpen(true);
    };
    const handleClose = () => {
        setId(null);
        setOpen(false);
    };

    const handleUserOpen = (id) => {
        setOpenUser(true);
    }

    const handleUserClose = () => {
        setOpenUser(false);
    }

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
    const submitDelete = () => {
        setSpinning(true);
        props.requestAdminDeleteSize({
            id: id
        })
        handleClose();
    }

    const onSubmit = (values) => {
        setSpinning(true);
        props.requestAdminEditPosition({
            name: values.name,
            permission: permission,
            id: values._id,
        });
        // for (const [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }
    };

    useEffect(() => {
        let editPositionData = props.data.editPositionData;
        if (editPositionData !== undefined) {
            if (editPositionData?.data?.status === "success") {
                Swal.fire("Success!", "Role successfully update.", "success");
                props.data.editPositionData = undefined;
                setSpinning(false);
            } else {
                if (editPositionData?.data?.message) {
                    Swal.fire("Sorry!", `${editPositionData?.data?.message}`, "error");
                    props.data.editPositionData = undefined;
                    setSpinning(false)
                }
            }
        }
    }, [props.data.editPositionData]);

    useEffect(() => {
        let deleteSizeData = props.data.deleteSizeData;
        if (deleteSizeData !== undefined) {
            if (deleteSizeData?.data?.status === "success") {
                Swal.fire("Success!", "Role successfully deleted.", "success");
                props.data.deleteSizeData = undefined;
                setSpinning(false);
            } else {
                if (deleteSizeData?.data?.message) {
                    Swal.fire("Sorry!", `${deleteSizeData?.data?.message}`, "error");
                    props.data.deleteSizeData = undefined;
                    setSpinning(false)
                }
            }
        }
    }, [props.data.deleteSizeData]);

    useEffect(() => {
        let addIndustryData = props.data.addIndustryData;
        if (addIndustryData !== undefined) {
            if (addIndustryData?.data?.status === "success") {
                Swal.fire("Success!", "Role successfully added.", "success");
                props.data.addIndustryData = undefined;
                setSpinning(false);
            } else {
                if (addIndustryData?.data?.message) {
                    Swal.fire("Sorry!", `${addIndustryData?.data?.message}`, "error");
                    props.data.addIndustryData = undefined;
                    setSpinning(false)
                }
            }
        }
    }, [props.data.addIndustryData]);

    useEffect(() => {
        let loginData = props.data.loginData;
        if (loginData !== undefined) {
            if (loginData?.data?.status == "success") {
                if (
                    loginData?.data?.data.role === "superadmin"
                ) {
                    props.requestAdminDegree({
                        token: loginData.data.data.token,
                    });
                }
            }
        }
    }, [props?.data?.loginData, props.candidate.candidatePictureData, props.data.addIndustryData, props.data.editPositionData, props.data.deleteSizeData]);


    useEffect(() => {
        let degreeData = props.data.degreeData;
        if (degreeData !== undefined) {
            if (degreeData?.data?.status === "success") {
                setList(degreeData.data.data.response);
            }
        }
    }, [props.data.degreeData]);

    useEffect(() => {
        let loginData = props.data.loginData;
        if (loginData !== undefined) {
            if (loginData?.data?.status === "success") {
                setUser(loginData.data.data);
            }
        }
    }, [props.data.loginData]);

    const columns = [
        { field: "id", headerName: "Sr.No.", flex: 1, headerClassName: 'custom-header' },
        { field: "name", headerName: "Role", flex: 1, headerClassName: 'custom-header' },
        // { field: "documents", headerName: "Documets", flex: 1 },
        { field: "role", headerName: "Permissions", flex: 1, headerClassName: 'custom-header' },
        {
            field: "more",
            headerName: "Action",
            headerClassName: 'custom-header',
            flex: 1,
            renderCell: (params) => (
                // <ViewBtn onClick={() => handleOpen(params.row.more)} />
                <Button onClick={() => handleOpen(params.row.more)}>
                    <div style={{ background: "blue", color: "white", height: "30px", width: "40px" , borderRadius: "5px"}}>
                        <RemoveRedEyeIcon  />
                    </div>
                </Button>
            ),
        },
    ];

    const rows = list.map((item, index) => ({
        id: index + 1,
        name: item.name,
        role: item.permission,
        more: item._id,

    }));

    return (
        <Layout>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="user" variant="h6" component="h2">
                    Manage Roles and Permissions
                </Typography>
                <Button variant="contained" onClick={handleUserOpen}>
                    Add Role
                </Button>
            </div>
            <br />
            <div style={{ height: "100%", width: "100%" }}>
                <div style={{ marginBottom: "20px" }}> {/* Add margin bottom to create space */}
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </div>
            </div>
            <DetailsModal
                id={id}
                open={open}
                handleClose={handleClose}
                data={data}
                onChangeData={onChangeData}
                list={list}
                setData={setData}
                user={user}
                onSubmit={onSubmit}
                submitDelete={submitDelete}
                permission={permission}
                setPermission={setPermission}
            />{" "}
            <RolesModal
                openUser={openUser}
                handleUserClose={handleUserClose}
                spinning={spinning}
                setSpinning={setSpinning}
                user={user}
            />
            <Spin spinning={spinning} fullscreen />

        </Layout>
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
            requestAdminCategoryJob,
            requestGetCandidate,
            requestGetApplyJob,
            requestAdminCompanyDetails,
            requestAdminEditSize,
            requestGetInterview,
            requestAdminEditPeriod,
            requestCandidateProfile,
            requestAdminDegree,
            requestAdminEditPosition,
            requestAdminDeleteSize
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole);
