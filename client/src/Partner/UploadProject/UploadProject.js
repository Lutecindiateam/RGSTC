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
  requestApplyJob,
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

const UploadData = (props) => {

  const state = ["maharastra"];

  const category = [
    "SC",
    "OBC",
    "Open",
    "ST",
    "VJNT",
    "Muslim Minority",
    "SBC",
    "EWS",
    "EBC"
  ];


  const gender = ["Male", "Female"];

  const team = ["Assistance for S&T Applications", "Assistance for S&T Applications through University System", "Setting up Science and Innovation Activity Centres", "RGSTC MSME Internship Program", "Assistance to Collaborative Projects between Institutions and Industries for Technology Development / Adoption(CPIITA)"];

  const industry = [
    "Information Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Automotive",
    "Energy",
    "Construction",
    "Telecommunications",
    "Aerospace"
  ]
  const university = [
    "University of Mumbai",
    "Savitribai Phule Pune University",
    "Shivaji University",
    "Dr. Babasaheb Ambedkar Marathwada University",
    "Nagpur University (Rashtrasant Tukadoji Maharaj Nagpur University)",
    "SNDT Women's University",
    "Bharati Vidyapeeth",
    "Symbiosis International University",
    "Yashwantrao Chavan Maharashtra Open University",
    "Maharashtra University of Health Sciences",
    "Sant Gadge Baba Amravati University (SGBAU)",
  ];

  const downloadTemplate = () => {
    const csvTemplate =
      "candidateName,Address,Mobile,Pincode,City,State,Category,Subcategory,LeadStatus,Status";
    const blob = new Blob([csvTemplate], { type: "text/csv" });
    saveAs(blob, "template.csv");
  };
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
  // const [document, setDocument] = useState([]);
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setCsvFile(file);
  // };

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   if (csvFile) {
  //     const formData = new FormData();
  //     formData.append("csvFile", csvFile);
  //     try {
  //       props.requestAddResume({
  //         id: user.id,
  //         token: user.token,
  //         data: {
  //           formData,
  //         },
  //       });
  //       setLoader(true);
  //     } catch (error) {
  //       console.error(error);
  //       alert("Error uploading CSV file. Please Check Format");
  //       setLoader(false);
  //     }
  //   } else {
  //     Swal.fire("Error!", "Please select a CSV file.", "error");
  //   }
  // };

  // const handleDocument = (e) => {
  //   setDocument([...document, e.target.files[0]]);
  // };
  // console.log(document);

  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [verifyotp, setVerifyOtp] = useState("");

  const [potp, setPOtp] = useState("");
  const [pshowOTP, setPShowOTP] = useState(false);
  const [pverifyotp, setPVerifyOtp] = useState("");


  const onchangeOtp = (e) => {
    setOtp(e.target.value);
  }
  const onchangeParentOtp = (e) => {
    setPOtp(e.target.value);
  }

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

  const handleUniversity = (value) => {
    setShowOtherInput(value === "Other");
  };

  const handleCourse = (value) => {
    // setCourses(value === "MCA" || value === "MBA")
    // console.log(value);  
    setCourses(value);
  }
  const onFinish = async (values) => {
    const { source: sourceName } = values;
    // Get the user ID corresponding to the selected name (assuming you have a mapping)
    const selectedUser = source.find((user) => user.name === sourceName);
    const sourceId = selectedUser ? selectedUser._id : null;

    try {
      let formData = new FormData();
      formData.append("applicant", values?.applicant?.toUpperCase());
      formData.append("project_name", values?.project_name?.toUpperCase());
      formData.append("mobile", values.mobile);
      formData.append("gender", values.gender);
      formData.append("scheme", values.scheme);
      formData.append("industry", values.industry);
      formData.append("project_brief", values.project_brief);
      formData.append("date_docSubmision", values.date_docSubmision);
      formData.append("lastExam_passingYear", values.lastExam_passingYear);
      formData.append("estimate_cost", values.estimate_cost);
      formData.append("applicant_id", user.id)
      // formData.append("course", values.course);
      // formData.append("branch_obj", values.branch_obj);
      // formData.append("team", values.team);
      // formData.append("source_name", values.source);
      // formData.append("family_mobile", values.family_mobile);
      // formData.append("category", values.category);
      // formData.append("p_id", user.id);
      // formData.append("source_id", sourceId);
      // formData.append("p_mobile", values.p_mobile);
      // formData.append("entrance_exam", values.entrance_exam);
      // formData.append("dtenumber", values.dtenumber);
      // formData.append("capround", values.capround);
      // formData.append("erpid", values.erpid);
      // formData.append("stu_rec_fees", values.stu_rec_fees);
      // if (showOtherInput) {
      //   formData.append("otherUniversity", values.otherUniversity);
      // } else {
      //   formData.append("university", values.university);
      // }
      // formData.append("admission_date", values.admission_date);
      // formData.append("tution_fees", values.tution_fees);
      // formData.append("deve_fees", values.deve_fees);
      // formData.append("total_fees", values.total_fees);
      // formData.append("govt_fees", values.govt_fees);
      // formData.append("discount", values.discount);
      // formData.append("student_fees", values.student_fees);
      // formData.append("paid_fees", values.paid_fees);
      // formData.append("balance_fees", values.balance_fees);
      // formData.append("doc_cap_lett", values.doc_cap_lett);

      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // } 
      props.requestApplyJob({
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
    let applyJobData = props.candidate.applyJobData;
    if (applyJobData !== undefined) {
      if (applyJobData?.data?.status == "success") {
        Swal.fire("Success!", "Data Uploaded successfully.", "success");
        setLoader(false);
        form.resetFields();
        navigate(
          `/doc/${applyJobData.data.data.course}/${applyJobData.data.data.branch}/${applyJobData.data.data._id}`
        );

        props.candidate.applyJobData = undefined;
      } else {
        Swal.fire("Alert!", applyJobData.data.message, "error");
        setLoader(false);
        props.candidate.applyJobData = undefined;
      }
    }
  }, [props.candidate.applyJobData]);

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

  const onClickOtpLoading = async () => {
    setOtploader(true);
    try {
      const response = await axios.post('/send/otp/', { number: otp });
      // Handle response
      if (response.data.type === "success") {
        alert("OTP sent successfully.")
        setOtploader(false);
        setShowOTP(true)
      }
    } catch (error) {
      // Handle error
      alert("Something went wrong. Please try again.")
      console.error('Error:', error);
      setOtploader(false);
    }
  };

  async function onOTPVerify() {
    setOtploader(true);
    try {
      const response = await axios.post('/verify/otp/', { otp: verifyotp, number: otp });
      // Handle response
      if (response.data.type === "success") {
        alert("Mobile Number Verified successfully")
        // setUser(response.data);
        setOtploader(false);
        setShowOTP(false)
        setVerifyOtp("")
        // setPh("");
        setOtp("");
      } else {
        if (response.data.type === "error") {
          alert(response.data.message)
        }
      }
      setOtploader(false);

    } catch (error) {
      // Handle error
      setOtploader(false);
      console.error('Error:', error);
    }
  }

  const onClickPOtpLoading = async () => {
    setOtploader(true);
    try {
      const response = await axios.post('/send/otp/', { number: potp });
      // Handle response
      if (response.data.type === "success") {
        alert("OTP sent successfully.")
        setOtploader(false);
        setPShowOTP(true)
      }
    } catch (error) {
      // Handle error
      alert("Something went wrong. Please try again.")
      console.error('Error:', error);
      setOtploader(false);
    }
  };

  async function onPOTPVerify() {
    setOtploader(true);
    try {
      const response = await axios.post('/verify/otp/', { otp: pverifyotp, number: potp });
      // Handle response
      if (response.data.type === "success") {
        alert("Mobile Number Verified successfully")
        // setUser(response.data);
        setOtploader(false);
        setPShowOTP(false)
        setPVerifyOtp("")
        // setPh("");
        setPOtp("");
      } else {
        if (response.data.type === "error") {
          alert(response.data.message)
        }
      }
      setOtploader(false);

    } catch (error) {
      // Handle error
      setOtploader(false);
      alert("Something went wrong. Please try again.")
      console.error('Error:', error);
    }
  }

  const handleResend = async () => {
    if (otp) {
      const response = await axios.post('/resend', { number: otp });
      if (response.data.type === "success") {
        alert("Resend OTP Successfully")
      }
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  const handleParentResend = async () => {
    if (potp) {
      const response = await axios.post('/resend', { number: potp });
      if (response.data.type === "success") {
        alert("Resend OTP Successfully")
      }
    } else {
      alert("Something went wrong. Please try again.")
    }
  }
  return (
    <Layout>
      <Fragment>
        <Card bordered={false} style={{ background: "#ececec" }}>
          <Title level={4} className="m-2 text-center">
            Detailed Project Details
          </Title>
          <hr />
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={24}>
              <Col span={12}>
                {/* Project Name */}
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  name="project_name"
                  label="Project Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input Project Name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Project Name" />
                </Form.Item>

                {/* Select Scheme */}
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  name="scheme"
                  label="Select Scheme"
                  rules={[
                    {
                      required: true,
                      message: "Please select Scheme!",
                    },
                  ]}
                >
                  <Select
                    name="Team/Staff"
                    loading={!state}
                    showSearch
                    placeholder="Select Scheme"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    {team &&
                      team.map((team) => (
                        <Select.Option key={team} value={team}>
                          {team}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>

                {/* Applicant Name */}
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  name="applicant"
                  label="Applicant Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input Applicant Name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Applicant Name" />
                </Form.Item>

               
                {/* Duration Start Date */}
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  name="date_docSubmision"
                  label="Duration Start Date"
                  rules={[
                    {
                      required: true,
                      message: "Please input Date!",
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
                {/* Duration End Date */}
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  label="Duration End Date"
                  name="lastExam_passingYear"
                  rules={[
                    {
                      required: true,
                      message: "Please input date!",
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>

              </Col>

              <Col span={12}>
               
                {/* Applicant Mobile Number */}
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  label="Applicant Mobile Number"
                  name="mobile"
                  validateTrigger="onChange"
                  rules={[
                    {
                      required: true,
                      message: "Please enter mobile number!",
                    },
                    {
                      len: 10,
                      message: "Mobile Number must be exactly 10 digits!",
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Mobile Number must contain only numbers!",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter Applicant Mobile Number" onChange={onchangeOtp} />
                </Form.Item>

                {/* Select Industry */}
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  name="industry"
                  label="Select Industry"
                  rules={[
                    {
                      required: true,
                      message: "Please select Industry!",
                    },
                  ]}
                >
                  <Select
                    name="Source"
                    loading={!state}
                    showSearch
                    placeholder="Select Industry"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    {industry &&
                      industry.map((source) => (
                        <Select.Option key={source} value={source}>
                          {source}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>

              

                {/* Estimated Cost */}
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  label="Estimated Cost"
                  name="estimate_cost"
                  rules={[
                    {
                      required: true,
                      message: "Please input estimated cost!",
                    }
                  ]}
                >
                  <Input type="number" placeholder="Enter Estimated Cost" />
                </Form.Item>

                {/* Explain Project in Brief */}
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  name="project_brief"
                  label="Explain Project in Brief"
                  rules={[
                    {
                      required: true,
                      message: "Please input Project Name!",
                    },
                  ]}
                >
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Enter about project"
                  ></textarea>
                </Form.Item>
              </Col>
            </Row>

            {/* Submit Button */}
            <Form.Item
              style={{ marginBottom: "15px" }}
              className={styles.addProductBtnContainer}
              wrapperCol={{
                offset: 7,
                span: 12,
              }}
            >
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

    // <Layout>
    //   <Fragment>
    //     <Card bordered={false} style={{ background: "#ececec" }}>
    //       <Title level={4} className="m-2 text-center">
    //         Detailed Project Details
    //       </Title>
    //       <hr />
    //       <Form
    //         form={form}
    //         name="basic"
    //         labelCol={{
    //           span: 7,
    //         }}
    //         labelWrap
    //         wrapperCol={{
    //           span: 12,
    //         }}
    //         initialValues={{
    //           remember: true,
    //         }}
    //         onFinish={onFinish}
    //         onFinishFailed={onFinishFailed}
    //         autoComplete="off"
    //       >
    //         <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           name="project_name"
    //           label="Project Name"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please input Project Name!",
    //             },
    //           ]}
    //         >
    //           <Input placeholder="Enter Project Name" />
    //         </Form.Item>
    //         <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           name="scheme"
    //           label="Select Scheme"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please select Scheme!",
    //             },
    //           ]}
    //         >
    //           <Select
    //             name="Team/Staff"
    //             loading={!state}
    //             showSearch
    //             placeholder="Select Scheme"
    //             optionFilterProp="children"
    //             filterOption={(input, option) =>
    //               option.children.includes(input)
    //             }
    //             filterSort={(optionA, optionB) =>
    //               optionA.children
    //                 .toLowerCase()
    //                 .localeCompare(optionB.children.toLowerCase())
    //             }
    //           >
    //             {team &&
    //               team.map((team) => (
    //                 <Select.Option key={team} value={team}>
    //                   {team}
    //                 </Select.Option>
    //               ))}
    //           </Select>
    //         </Form.Item>
    //         <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           name="applicant"
    //           label="Applicant Name"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please input Applicant Name!",
    //             },
    //           ]}
    //         >
    //           <Input placeholder="Enter Applicant Name" />
    //         </Form.Item>
    //          <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           label="Applicant Mobile Number"
    //           name="mobile"
    //           validateTrigger="onChange"

    //           rules={[
    //             {
    //               required: true,
    //               message: "Please enter mobile number!",
    //             },
    //             {
    //               len: 10,
    //               message: "Mobile Number must be exactly 10 digits!",
    //             },
    //             {
    //               pattern: /^[0-9]+$/,
    //               message: "Mobile Number must contain only numbers!",
    //             },
    //             // {
    //             //   type: 'number',
    //             //   min: 0,
    //             //   message: "Mobile Number cannot be negative!",
    //             // },
    //           ]}
    //         >
    //           <Input type="text" placeholder="Enter Applicant Mobile Number" onChange={onchangeOtp}
    //           />
    //         </Form.Item>
    //         {showOTP &&
    //           <>
    //             <div style={{ display: "flex", justifyContent: "center" }}>
    //               <h6>Enter OTP</h6> &nbsp;&nbsp;
    //               <OtpInput
    //                 value={verifyotp}
    //                 onChange={setVerifyOtp}
    //                 OTPLength={4}
    //                 otpType="number"
    //                 disabled={false}
    //                 autoFocus
    //                 className="opt-container "
    //               ></OtpInput>
    //               <b><a type="button" onClick={handleResend} class="text-danger">Resend OTP</a></b>
    //             </div>
    //             <Form.Item
    //               style={{ marginBottom: "15px" }}
    //               className={styles.addProductBtnContainer}
    //             >
    //               <Button
    //                 type="primary"
    //                 // htmlType="submit"
    //                 shape="round"
    //                 loading={otploader}
    //                 onClick={onOTPVerify}
    //                 style={{ backgroundColor: "#2c3e50" }}
    //               >
    //                 Verify OTP
    //               </Button>
    //             </Form.Item>
    //           </>}
    //         {otp && !showOTP &&
    //           <Form.Item
    //             style={{ marginBottom: "15px" }}
    //             className={styles.addProductBtnContainer}
    //           >
    //             <Button
    //               type="primary"
    //               // htmlType="submit"
    //               shape="round"
    //               loading={otploader}
    //               onClick={onClickOtpLoading}
    //               style={{ backgroundColor: "#2c3e50" }}
    //             >
    //               Send OTP
    //             </Button>
    //           </Form.Item>
    //         }
           
    //         <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           name="date_docSubmision"
    //           label="Duration Start Date"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please input Date!",
    //             },
    //           ]}
    //         >
    //           <Input type="date" />
    //         </Form.Item>
    //         <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           label="Duration End Date"
    //           name="lastExam_passingYear"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please input date!",
    //             },
    //           ]}
    //         >
    //           <Input type="date" />
    //           {/* <DatePicker picker="year" placeholder="Select Last Exam Passing Year" style={{ width: "100%" }} /> */}
    //         </Form.Item>

    //         <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           name="industry"
    //           label="Select Industry"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please select Industry!",
    //             },
    //           ]}
    //         >
    //           <Select
    //             name="Source"
    //             loading={!state}
    //             showSearch
    //             placeholder="Select Industry"
    //             optionFilterProp="children"
    //             filterOption={(input, option) =>
    //               option.children.includes(input)
    //             }
    //             filterSort={(optionA, optionB) =>
    //               optionA.children
    //                 .toLowerCase()
    //                 .localeCompare(optionB.children.toLowerCase())
    //             }
    //           >
    //             {industry &&
    //               industry.map((source) => (
    //                 <Select.Option key={source} value={source}>
    //                   {source}
    //                 </Select.Option>
    //               ))}
    //           </Select>
    //         </Form.Item>

    //         <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           name="project_brief"
    //           label="Explain Project in Brief"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please input Project Name!",
    //             },
    //           ]}
    //         >
    //           <textarea
    //             class="form-control"
    //             rows="3"
    //             placeholder="Enter about project"
    //           ></textarea>
    //           {/* <Input placeholder="Enter Project Name" style={{ width: "100%", height: "100px" }} /> */}
    //         </Form.Item>
    //         <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           label="Estimated Cost"
    //           name="estimate_cost"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please input estimated cost!",
    //             }
    //           ]}
    //         >
    //           <Input type="number" placeholder="Enter Estimated Cost" />
    //         </Form.Item>
    //         <Form.Item
    //           style={{ marginBottom: "15px" }}
    //           className={styles.addProductBtnContainer}
    //         >
    //           <Button
    //             type="primary"
    //             htmlType="submit"
    //             shape="round"
    //             loading={loader}
    //             onClick={onClickLoading}
    //             style={{ backgroundColor: "#2c3e50" }}
    //           >
    //             Submit
    //           </Button>
    //         </Form.Item>
    //       </Form>
    //     </Card>
    //   </Fragment>
    // </Layout>
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
      requestApplyJob,
      requestAdminGetProfile,
      requestJobDetails,
      requestGetComment
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UploadData);


{/* <Form.Item
              style={{ marginBottom: "15px" }}
              name="category"
              label="Select Category"
              rules={[
                {
                  required: true,
                  message: "Please select category!",
                },
              ]}
            >
              <Select
                name="category"
                loading={!category}
                showSearch
                placeholder="Select Category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {category &&
                  category.map((brandSingle) => (
                    <Select.Option key={brandSingle} value={brandSingle}>
                      {brandSingle}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item> */}
{/* <Form.Item
              style={{ marginBottom: "15px" }}
              name="gender"
              label="Select Gender"
              rules={[
                {
                  required: true,
                  message: "Please select Gender!",
                },
              ]}
            >
              <Select
                name="gender"
                loading={!state}
                showSearch
                placeholder="Select Gender"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {gender &&
                  gender.map((gender) => (
                    <Select.Option key={gender} value={gender}>
                      {gender}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item> */}
{/* <Form.Item
              style={{ marginBottom: "15px" }}
              name="course"
              label="Select Course"
              rules={[
                {
                  required: true,
                  message: "Please select Course",
                },
              ]}
            >
              <Select
                name="course"
                loading={!state}
                showSearch
                placeholder="Select Course"
                optionFilterProp="children"
                onChange={handleCourse}
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {course &&
                  course.map((course) => (
                    <Select.Option key={course.course} value={course.course}>
                      {course.course}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item> */}
{/* <Form.Item
              style={{ marginBottom: "15px" }}
              name="branch_obj"
              label="Select Branch"
              rules={[
                {
                  required: true,

                  // required: !courses,
                  message: "Please select Branch",
                },
              ]}

            >
              <Select
                name="branch_obj"
                loading={!state}
                showSearch
                placeholder="Select Branch"
                // disabled={courses}

                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {courses &&
                  course.find((course) => course.course === courses)
                    .branch.map((branch) => (
                      <Select.Option key={branch.name} value={JSON.stringify(branch)}>
                        {`${branch.name}`}
                      </Select.Option>
                    ))}

              </Select>
            </Form.Item> */}


{/* <Form.Item
              style={{ marginBottom: "15px" }}
              label="Parent Mobile Number"
              name="p_mobile"
              rules={[
                {
                  required: true,
                  message: "Please input Mobile Number!",
                },
                {
                  len: 10,
                  message: "Mobile Number must be exactly 10 digits!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && value !== getFieldValue('mobile')) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Parent Mobile Number cannot be same as ApplicantMobile Number!'));
                  },
                }),
              ]}
            >
              <Input type="number" placeholder="Enter Parent Mobile Number" onChange={onchangeParentOtp} />
            </Form.Item>
            {pshowOTP &&
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h6>Enter OTP</h6> &nbsp;&nbsp;

                  <OtpInput
                    value={pverifyotp}
                    onChange={setPVerifyOtp}
                    OTPLength={4}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container "
                  ></OtpInput>
                  <b><a type="button" onClick={handleParentResend} class="text-danger">Resend OTP</a></b>
                </div>
                <Form.Item
                  style={{ marginBottom: "15px" }}
                  className={styles.addProductBtnContainer}
                >
                  <Button
                    type="primary"
                    // htmlType="submit"
                    shape="round"
                    loading={otploader}
                    onClick={onPOTPVerify}
                    style={{ backgroundColor: "#2c3e50" }}
                  >
                    Verify OTP
                  </Button>
                </Form.Item>
              </>}
            {potp && !pshowOTP &&
              <Form.Item
                style={{ marginBottom: "15px" }}
                className={styles.addProductBtnContainer}
              >
                <Button
                  type="primary"
                  // htmlType="submit"
                  shape="round"
                  loading={otploader}
                  onClick={onClickPOtpLoading}
                  style={{ backgroundColor: "#2c3e50" }}
                >
                  Send OTP
                </Button>
              </Form.Item>
            }
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Family Mobile Number"
              name="family_mobile"
              rules={[
                // {
                //   required: true,
                //   message: "Please input Mobile Number!",
                // },
                {
                  len: 10,
                  message: "Mobile Number must be exactly 10 digits!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Family Mobile Number" />
            </Form.Item> */}