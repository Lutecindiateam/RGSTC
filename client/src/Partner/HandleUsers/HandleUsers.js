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
  requestAdminSize,
  requestAdminEditContact,
  requestAdminDeleteCareer,
  requestAdminDegree
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
import { useNavigate } from "react-router-dom";
import UserModel from "./HandleUserModal"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "../canvasJS.css"


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
  role
}) => {
  useEffect(() => {
    if (id) {
      const selectedItem = list.find((item) => item._id === id);
      setData(selectedItem || {});
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
          Edit User
        </Typography>
        <hr />
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            size="large"
            id="name"
            name="name"
            value={data.name}
            // placeholder={`Product Name`}
            onChange={onChangeData}
          />
        </div>
        <br />
        {/* <div>
          <label htmlFor="role">Role:</label>
          <Input
            label="Role"
            id="role"
            name="role"
            value={data.role}
          // placeholder={`Quantity`}
          // onChange={onChangeData}
          />
        </div> */}
        <label htmlFor="name">Role:</label>
        <FormControl fullWidth size="small">
          <Select
            labelId="role"
            id="role"
            value={data.role}
            name="role"
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
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            size="large"
            label="Email"
            id="email"
            name="email"
            value={data.email}
            // placeholder={`Quantity`}
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
            onChange={onChangeData}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={submitProductForm}>
            Submit
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

const Reset = (props) => {
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
  const [role, setRole] = useState([]);

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

  // const handleGraph = (id) => {
  //   // setSpinning(true);
  //   setGraphId(id);
  //   // navigate(`/handle/${id}`)
  // }
  const submitDelete = () => {
    setSpinning(true);
    props.requestAdminDeleteCareer({
      id: id
    })
    handleClose();
  }

  const onSubmit = (values) => {
    setSpinning(true);

    //put condition for value._id not select
    const findRole = role.filter((value) => value._id === values.role);
    // Handle form submission here
    let form = new FormData();
    form.append("email", values.email);
    form.append("name", values.name);
    form.append("password", values.password);
    form.append("role", findRole[0].name);
    // form.append("permission", findRole[0].permission);
    findRole[0].permission.forEach((item) => form.append("permission[]", item))


    props.requestAdminEditContact({
      data: form,
      id: values._id,
    });
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  };

  useEffect(() => {
    let editContactData = props.data.editContactData;
    if (editContactData !== undefined) {
      if (editContactData?.data?.status === "success") {
        Swal.fire("Success!", "User successfully updated.", "success");
        props.data.editContactData = undefined;
        setSpinning(false);
      } else {
        if (editContactData?.data?.message) {
          Swal.fire("Sorry!", `${editContactData?.data?.message}`, "error");
          props.data.editContactData = undefined;
          setSpinning(false)
        }
      }
    }
  }, [props.data.editContactData]);

  useEffect(() => {
    let deleteCareerData = props.data.deleteCareerData;
    if (deleteCareerData !== undefined) {
      if (deleteCareerData?.data?.status === "success") {
        Swal.fire("Success!", "User successfully deleted.", "success");
        props.data.deleteCareerData = undefined;
        setSpinning(false);
      } else {
        if (deleteCareerData?.data?.message) {
          Swal.fire("Sorry!", `${deleteCareerData?.data?.message}`, "error");
          props.data.deleteCareerData = undefined;
          setSpinning(false)
        }
      }
    }
  }, [props.data.deleteCareerData]);

  useEffect(() => {
    let addFunctionalData = props.data.addFunctionalData;
    if (addFunctionalData !== undefined) {
      if (addFunctionalData?.data?.status === "success") {
        Swal.fire("Success!", "User successfully added.", "success");
        props.data.addFunctionalData = undefined;
        setSpinning(false);
      } else {
        if (addFunctionalData?.data?.message) {
          Swal.fire("Sorry!", `${addFunctionalData?.data?.message}`, "error");
          props.data.addFunctionalData = undefined;
          setSpinning(false)
        }
      }
    }
  }, [props.data.addFunctionalData]);

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        if (
          // loginData?.data?.data.role === "admin" ||
          // loginData?.data?.data.role === "editor" ||
          loginData?.data?.data.role === "superadmin"
        ) {
          props.requestAdminSize({
            // id: loginData.data.data.id,
            // role: loginData.data.data.role,
            token: loginData.data.data.token,
          });
          props.requestAdminDegree();
        }
      }
    }
  }, [props?.data?.loginData, props.data.editContactData, props.data.addFunctionalData, props.data.deleteCareerData]);

  // useEffect(() => {
  //   let loginData = props.candidate.loginData;
  //   if (loginData !== undefined) {
  //     if (loginData?.data?.status == "success") {
  //       if (loginData?.data?.data.role === "reset") {
  //         props.requestGetJobAlert({
  //           // id: loginData.data.data.id,
  //           // role: loginData.data.data.role,
  //           token: loginData.data.data.token,
  //         });
  //       }
  //     }
  //   }
  // }, [props.candidate.loginData, props.candidate.candidatePictureData]);

  useEffect(() => {
    let sizeData = props.data.sizeData;
    if (sizeData !== undefined) {
      if (sizeData?.data?.status === "success") {
        setList(sizeData.data.data.response);
      }
    }
  }, [props.data.sizeData]);

  useEffect(() => {
    let degreeData = props.data.degreeData;
    if (degreeData !== undefined) {
      if (degreeData?.data?.status === "success") {
        setRole(degreeData.data.data.response);
      }
    }
  }, [props.data.degreeData]);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      }
    }
  }, [props.candidate.loginData]);

  const columns = [
    { field: "id", headerName: "Sr.No.", width: 100, headerClassName: 'custom-header' },
    { field: "name", headerName: "Name", flex: 1, headerClassName: 'custom-header' },
    // { field: "documents", headerName: "Documets", flex: 1 },
    { field: "role", headerName: "Role", flex: 1, headerClassName: 'custom-header' },
    {
      field: "more",
      headerName: "Action",
     headerClassName: 'custom-header',
      flex: 1,
      renderCell: (params) => (
        <Button onClick={() => handleOpen(params.row.more)}>
          <div style={{ background: "blue", color: "white", height: "30px", width: "40px", borderRadius: "5px" }}>
            <RemoveRedEyeIcon />
          </div>
        </Button>
      ),
    },
  ];

  const rows = list.map((item, index) => ({
    id: index + 1,
    name: item.name,
    role: item.role,
    more: item._id,
    
    // graph: {
    //   id: item._id
    // }
  }));

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography id="user" variant="h6" component="h2">
          Manage User
        </Typography>
        <Button variant="contained" onClick={handleUserOpen}>
          Add User
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
        role={role}
      />{" "}
      <UserModel
        openUser={openUser}
        handleUserClose={handleUserClose}
        spinning={spinning}
        setSpinning={setSpinning}
        role={role}
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
      requestAdminSize,
      requestAdminEditContact,
      requestAdminDeleteCareer,
      requestAdminDegree
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Reset);