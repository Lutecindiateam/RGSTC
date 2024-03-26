import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segmented, Table, Input } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
    requestCommitteePreproposal,
    requestAdminCompanyDetails,
    requestGetCandidate,
    requestGetApplyJob,
    requestPreproposalApproval,
    requestGetInterview,
    requestAdminCompanyJob,
    requestAdminFunctionalCandidate,
    requestAdminAddSize
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

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    maxHeight: "90vh", // Set maximum height to 90% of the viewport height
    overflowY: "auto", // Enable vertical scrolling if content exceeds the height
    bgcolor: "background.paper",
    border: "2px solid #000",
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
}) => {

    
    useEffect(() => {
        if (id) {
            const selectedItem = list.find((item) => item._id === id);
            setData(selectedItem || {});
        }
    }, [id, list]);

    

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            // onSubmit={submitProductForm}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                     PreProposal Details
                </Typography>
                <hr />
                <div>
                    <label htmlFor="Project">Title of the project proposal:</label>
                    <Input
                        id="projectName"
                        name="projectName"
                        value={data.title}
                        placeholder={`Project Name`}
                    // onChange={onChangeData}
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="applicant">Applicant Name:</label>
                    <Input
                        label="NA"
                        id="applicant"
                        name="applicant"
                        value={data.applicant_name}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="gender">Approximate cost of the project :</label>
                    <Input
                        label="NA"
                        id="gender"
                        name="gender"
                        value={data.approx_cost}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="industry">Name of the Institution where the work will be carried out:</label>
                    <Input
                        label="NA"
                        id="industry"
                        name="industry"
                        value={data.institution_name}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="scheme">Name of the investigator:</label>
                    <Input
                        label="NA"
                        id="scheme"
                        name="scheme"
                        value={data.investigator_name}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="mobile">Objective of the project:</label>
                    <Input
                        label="NA"
                        id="mobile"
                        name="mobile"
                        value={data.objective}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />

                </div>
                <br />
                <div>
                    <label htmlFor="project_brief">Methodology:</label>
                    <Input
                        label="NA"
                        id="project_brief"
                        name="project_brief"
                        value={data.methodology}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="date_docSubmision">
                        Duration Start Date:
                    </label>
                    <Input
                        label="NA"
                        id="date_docSubmision"
                        name="date_docSubmision"
                        value={data.start_date}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="lastExam_passingYear">Duration End Date:</label>
                    <Input
                        label="NA"
                        id="lastExam_passingYear"
                        name="lastExam_passingYear"
                        value={data.end_date}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="estimate_cost">What is the scope of the project? What end results are expected?:</label>
                    <Input
                        label="NA"
                        id="estimate_cost"
                        name="estimate_cost"
                        value={data.project_scope}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="required">Why do you feel the necessity to undertake this work?:</label>
                    <Input
                        label="NA"
                        id="required"
                        name="required"
                        value={data.necessity}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="required">Who will be benefited by the proposed work and what is the scope for its replication?:</label>
                    <Input
                        label="NA"
                        id="stage"
                        name="stage"
                        value={data.benefit}
                        placeholder={`NA`}
                    // onChange={onChangeData}
                    />
                </div>
               
            </Box>
        </Modal>
    );
};
const PreProposalList = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [id, setId] = useState(null);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState({});
    const [list, setList] = useState([]);
    const [status, setStatus] = useState("true");
    const [open, setOpen] = React.useState(false);
    const [editorStatus, setEditorStatus] = useState(null);
    const [amount, setAmount] = useState([]);
    const newArray = list.filter((item) => item.status === "editor");

    const balance_money = amount.length > 0 && parseInt(amount[amount.length - 1]?.balance);
    const handleOpen = (id) => {
        setId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setId(null);
        setOpen(false);
        props.data.functionalCanditateData = undefined;
        props.employee.empAddJobData = undefined;
    };

    useEffect(() => {
        let functionalCanditateData = props.data.functionalCanditateData;
        if (functionalCanditateData !== undefined) {
            if (functionalCanditateData?.data?.status === "success") {
                setAmount(functionalCanditateData.data.data);
            }
        }
    }, [props.data.functionalCanditateData])


    function onChangeData(e) {

        if (parseFloat(e.target.value) < 0) {
            // Display an error message to the user
            alert("Please enter a positive number.");
            return; // Exit the function early
        }

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
    const handleApproval = (AdmId) => {
        const remark = window.prompt("Enter Approval Remark:");

        // Check if the user clicked "OK" and provided a remark
        if (remark !== null) {
            const userConfirmed = window.confirm(
                "Are you sure you want to proceed with the approval?"
            );
            if (userConfirmed) {
                props.requestPreproposalApproval({
                    id: AdmId,
                    token: user.token,
                    remark: remark,
                });
            } else {
                console.log("User canceled the action.");
            }
        }
    };

    useEffect(() => {
        let approveData = props.data.approveData;
        if (approveData !== undefined) {
            if (approveData?.data?.status == "success") {
                Swal.fire("Successful!", "Approved Successfully.", "success");
                props.data.approveData = undefined;
            } else {
                alert(approveData?.data?.message)
            }
        }
    }, [props.data.approveData]);

    useEffect(() => {
        let loginData = props.candidate.loginData;
        if (loginData !== undefined) {
            if (loginData?.data?.status == "success") {
                props.requestGetCandidate({
                    id: loginData.data.data.id,
                    role: loginData.data.data.role,
                    token: loginData.data.data.token,
                });
            }
        }
    }, []);

   
    useEffect(() => {
        let empLoginData = props.employee.empLoginData;
        if (empLoginData !== undefined) {
            if (empLoginData?.data?.status == "success") {
                setUser(empLoginData.data.data);
                props.requestGetInterview({
                    id: empLoginData.data.data.id,
                    role: empLoginData.data.data.role,
                    token: empLoginData.data.data.token,
                });
            }
        }
    }, []);

    useEffect(() => {
        let loginData = props.data.loginData;
        if (loginData !== undefined) {
            if (loginData?.data?.status == "success") {
                setUser(loginData.data.data);
                props.requestCommitteePreproposal({
                    token: loginData.data.data.token,
                });
            }
        }
    }, [
        props.data.loginData,
        props.data.addSizeData,
        //running currently
        props.data.approveData,

    ]);

    useEffect(() => {
        let getCandidateData = props.candidate.getCandidateData;
        // console.log(getCandidateData);
        if (getCandidateData !== undefined) {
            if (getCandidateData?.data?.status === "success") {
                setList(getCandidateData.data.data.response);
            }
        }
    }, [props.candidate.getCandidateData, props.data.loginData]);

    //Admin api
    useEffect(() => {
        let preproposalData = props.data.preproposalData;
        if (preproposalData !== undefined) {
            if (preproposalData?.data?.status == "success") {
                setList(preproposalData.data.data.response);
            }
        }
    }, [props.data.preproposalData, props.data.loginData]);


    useEffect(() => {
        let loginData = props.candidate.loginData;
        if (loginData !== undefined) {
            if (loginData?.data?.status === "success") {
                setUser(loginData.data.data);
            }
        }
    }, [props.candidate.loginData]);

    const columns = [
        { field: "id", headerName: "Sr.No.", width: 100 },
        { field: "applicant", headerName: "Applicant Name", flex: 1 },
        { field: "project", headerName: "Project Name", flex: 1 },
        {
            field: "more",
            headerName: "Details",
            flex: 1,
            renderCell: (params) => (
                <Button onClick={() => handleOpen(params.row.more)}>
                    More...
                </Button>
            ),
        },
        {
            field: "approval",
            headerName: "Approval",
            flex: 1,
            renderCell: (params) =>
                params.row.approval.status === false ? (
                    <Button
                        variant="contained"
                        onClick={() => handleApproval(params.row.approval.id)}
                    >
                        Approve
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={true}
                        style={{ backgroundColor: "green", color: "white" }}
                    >
                        Approved
                    </Button>
                ),
        },
        {
            field: "rejection",
            headerName: "Rejection",
            flex: 1,
            renderCell: (params) =>
                params.row.approval.status === false ? (
                    <Button
                        variant="contained"
                        // onClick={() => handleRejection(params.row.approval.id)}
                        style={{ backgroundColor: "red", color: "white" }}
                    >
                        Reject
                    </Button>
                ) : null,
        }
    ];

    const rows = list.map((item, index) => ({
        id: index + 1,
        applicant: item.applicant_name,
        project: item.title,
        more: item._id,
        approval: {
            id: item._id,
            status: item.status,
            stage: item.stage
        },

    }));

    return (
        <Layout>
            <div style={{ height: "100%", width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
            <DetailsModal
                id={id}
                open={open}
                handleClose={handleClose}
                data={data}
                onChangeData={onChangeData}
                list={list}
                setData={setData}
                // onSubmit={onSubmit}
                props={props}
            />{" "}
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
            requestCommitteePreproposal,
            requestGetCandidate,
            requestGetApplyJob,
            requestAdminCompanyDetails,
            requestPreproposalApproval,
            requestGetInterview,
            requestAdminCompanyJob,
            requestAdminFunctionalCandidate,
            requestAdminAddSize
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PreProposalList);
