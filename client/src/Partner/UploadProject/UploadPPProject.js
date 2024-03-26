import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
    Typography,
    Upload,
    DatePicker
} from "antd";
import { toast } from "react-toastify";
import { Fragment, useEffect, useState } from "react";
import styles from "../AddProd.module.css";
import Layout from "../Layout";
import { bindActionCreators } from "redux";
import {
    requestAddResume,
    requestPreProposal,
    requestAdminGetProfile,
    requestJobDetails,
    requestGetComment
} from "../../Redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import moment from 'moment';
import axios from "axios";
import OtpInput from "otp-input-react";

const PerProjectUpload = (props) => {
    const { Title } = Typography;
    const [fileList, setFileList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [otploader, setOtploader] = useState(false);
    const [csvFile, setCsvFile] = useState(null);
    const [user, setUser] = useState({});
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [source, setSource] = useState([]);
    const [courses, setCourses] = useState(false);
    const [course, setCourse] = useState([])


    useEffect(() => {
        let loginData = props.candidate.loginData;
        if (loginData !== undefined) {
            if (loginData?.data?.status === "success") {
                setUser(loginData.data.data);
                props.requestGetComment();
            }
        }
    }, [props.candidate.loginData]);

    // console.log(user);
    useEffect(() => {
        let loginData = props.data.loginData;
        if (loginData !== undefined) {
            if (loginData?.data?.status == "success") {
                if (loginData?.data?.data.role === "admin") {
                    setUser(loginData.data.data);
                }
            }
        }
    }, [props.data.loginData]);

    useEffect(() => {
        let commentsData = props.candidate.commentsData;
        if (commentsData !== undefined) {
            if (commentsData?.data?.status == "success") {
                // if (candidateForJobData?.data?.data.role === "admin") {
                setCourse(commentsData.data.data.response);
                // }
            }
        }
    }, [props.candidate.commentsData]);

    useEffect(() => {
        let candidateForJobData = props.employee.candidateForJobData;
        // console.log(candidateForJobData);
        if (candidateForJobData !== undefined) {
            if (candidateForJobData?.data?.status == "success") {
                // if (candidateForJobData?.data?.data.role === "admin") {
                setSource(candidateForJobData.data.data.response);
                // }
            }
        }
    }, [props.employee.candidateForJobData]);

    const onFinish = async (values) => {
        const { source: sourceName } = values;
        // Get the user ID corresponding to the selected name (assuming you have a mapping)
        const selectedUser = source.find((user) => user.name === sourceName);
        const sourceId = selectedUser ? selectedUser._id : null;

        try {
            let formData = new FormData();
            formData.append("title", values?.title?.toUpperCase());
            formData.append("institution_name", values?.institution_name?.toUpperCase());
            formData.append("investigator_name", values.investigator_name);
            formData.append("objective", values.objective);
            formData.append("methodology", values.methodology);
            formData.append("start_date", values.start_date);
            formData.append("end_date", values.end_date);
            formData.append("approx_cost", values.approx_cost);
            formData.append("project_scope", values.project_scope);
            formData.append("necessity", values.necessity);
            formData.append("benefit", values.benefit);
            formData.append("applicant_id", user.id);
            formData.append("applicant_name", user.name);


            props.requestPreProposal({
                token: user.token,
                data: {
                    formData,
                },
            });
            setLoader(true);
        } catch (error) {
            toast.error("error at creating");
            setLoader(false);
        }
    };

    useEffect(() => {
        let preProposalData = props.candidate.preProposalData;
        if (preProposalData !== undefined) {
            if (preProposalData?.data?.status == "success") {
                Swal.fire("Success!", "PreProposal Submitted Successfully. Your proposal will now undergo review by the committee.", "success");
                setLoader(false);
                form.resetFields();
                // navigate(
                //     `/doc/${preProposalData.data.data.course}/${preProposalData.data.data.branch}/${preProposalData.data.data._id}`
                // );

                props.candidate.preProposalData = undefined;
            } else {
                Swal.fire("Alert!", preProposalData.data.message, "error");
                setLoader(false);
                props.candidate.preProposalData = undefined;
            }
        }
    }, [props.candidate.preProposalData]);

    const onFinishFailed = (errorInfo) => {
        setLoader(false);
        toast.error("Something went wrong !");
        console.log("Failed:", errorInfo);
    };

    const handelChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const onClickLoading = () => {
        setLoader(true);
    };


    return (
        <Layout>
            <Fragment>
                <Card bordered={false} style={{ background: "#ececec" }}>
                    <Title level={4} className="m-2 text-center">
                        Add Pre-Proposal  Details
                    </Title>
                    <hr />
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 24, // Labels take full width for mobile layout
                        }}
                        wrapperCol={{
                            span: 24, // Input fields take full width for mobile layout
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row gutter={[16, 16]}> {/* Add gutter spacing between form items */}
                            {/* Left Side */}
                            <Col xs={24} sm={12}> {/* For extra small and small screens, take full width. For larger screens, take half width */}
                                <Form.Item
                                    name="title"
                                    label="Title of the project proposal"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Project Title!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Project Title" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name="institution_name"
                                    label="Name of the Institution where the work will be carried out"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Institution Name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Institution Name" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name="investigator_name"
                                    label="Name of the Investigator"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Investigator Name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Applicant Name" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name="objective"
                                    label="Objective of the project"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Objective!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Objective" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name="methodology"
                                    label="Methodology"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Methodology!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Methodology" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name="start_date"
                                    label="Start Date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Date!",
                                        },
                                    ]}
                                >
                                    <Input type="date" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    label="End Date"
                                    name="end_date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Date!",
                                        },
                                    ]}
                                >
                                    <Input type="date" />
                                    {/* <DatePicker picker="year" placeholder="Select Last Exam Passing Year" style={{ width: "100%" }} /> */}
                                </Form.Item>
                                {/* Add other form items for left side */}
                            </Col>
                            {/* Right Side */}
                            <Col xs={24} sm={12}> {/* For extra small and small screens, take full width. For larger screens, take half width */}
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    label="Approximate cost of the project "
                                    name="approx_cost"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Cost!",
                                        }
                                    ]}
                                >
                                    <Input type="number" placeholder="Enter Estimated Cost" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name="project_scope"
                                    label="What is the scope of the project? What end results are expected?"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Project Scope!",
                                        },
                                    ]}
                                >
                                    <textarea
                                        class="form-control"
                                        rows="3"
                                        placeholder="Enter about project"
                                    ></textarea>
                                    {/* <Input placeholder="Enter Project Name" style={{ width: "100%", height: "100px" }} /> */}
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name="necessity"
                                    label="Why do you feel the necessity to undertake this work?"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter!",
                                        },
                                    ]}
                                >
                                    <textarea
                                        class="form-control"
                                        rows="3"
                                        placeholder="Enter about project"
                                    ></textarea>
                                    {/* <Input placeholder="Enter Project Name" style={{ width: "100%", height: "100px" }} /> */}
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name="benefit"
                                    label="Who will be benefited by the proposed work and what is the scope for its replication?"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter!",
                                        },
                                    ]}
                                >
                                    <textarea
                                        class="form-control"
                                        rows="3"
                                        placeholder="Enter about project"
                                    ></textarea>
                                    {/* <Input placeholder="Enter Project Name" style={{ width: "100%", height: "100px" }} /> */}
                                </Form.Item>
                                {/* Add other form items for right side */}
                            </Col>
                        </Row>

                        {/* Repeat the above pattern for other form fields */}

                        <Form.Item className={styles.addProductBtnContainer}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                shape="round"
                                loading={loader}
                                onClick={onClickLoading}
                                style={{ backgroundColor: "#2c3e50" }}
                            >
                                Submit Proposal
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Fragment>
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
            requestAddResume,
            requestPreProposal,
            requestAdminGetProfile,
            requestJobDetails,
            requestGetComment
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PerProjectUpload);
