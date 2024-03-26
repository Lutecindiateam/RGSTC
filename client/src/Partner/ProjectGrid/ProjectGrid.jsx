import React, { useEffect, useState } from 'react'
import { GridData } from './Components/ProjectGridData'
import Layout from '../Layout'
import { bindActionCreators } from "redux";
import {
    requestAdminMonthJob,
    requestGetCandidate
} from "../../Redux/actions";
import { connect } from "react-redux";
import './project.css';
import { useNavigate } from 'react-router-dom';

const ProjectGrid = (props) => {
    const [user, setUser] = useState({});
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    const handleDetails = () => {
        navigate("/project-details")
    }
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
        let loginData = props.data.loginData;
        if (loginData !== undefined) {
            if (loginData?.data?.status == "success") {
                const { role } = loginData?.data?.data;
                if (
                    role === "admin" || role === "editor" || role === "superadmin"
                ) {
                    setUser(loginData.data.data);
                    props.requestAdminMonthJob({
                        token: loginData.data.data.token,
                    });
                }
            }
        }
    }, [
        props.data.loginData,
    ]);
    useEffect(() => {
        let getInterviewData = props.employee.getInterviewData;
        // console.log(getCandidateData);
        if (getInterviewData !== undefined) {
            if (getInterviewData?.data?.status === "success") {
                setList(getInterviewData.data.data.response);
            }
        }
    }, [props.employee.getInterviewData, props.data.loginData]);

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
        let monthWiseJobData = props.data.monthWiseJobData;
        if (monthWiseJobData !== undefined) {
            if (monthWiseJobData?.data?.status == "success") {
                setList(monthWiseJobData.data.data.response);
            }
        }
    }, [props.data.monthWiseJobData, props.data.loginData]);


    return (
        <Layout>
            <div className="px-4 py-3 page-body">
                <ul className="row g-3 li_animate list-unstyled">
                    {list.map((data, index) => {
                        return (
                            <li key={index} className="col-lg-6 col-md-6">
                                <div className="card">
                                    <div className="card-header flex-nowrap align-items-center">
                                        <a href="#" className="h6 card-title mb-0">{data.project_name}</a>
                                        {/* <CardAction/> */}
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-1">
                                            <i className="fa fa-user me-3"></i>
                                            <span className="pe-2">Applicant :{data.applicant} </span>
                                            {/* <a href="#">Monsters.Inc</a> */}
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="fa fa-credit-card me-3"></i>
                                            <span className="pe-2">Estimate Cost: ₹ {data.estimate_cost} </span>
                                            {/* <a href="#">$2,742</a> */}
                                        </div>
                                        <div className="my-4">
                                            <span className="text-muted">Progress / 50%</span>
                                            <div className="progress mt-2" style={{ height: "3px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="hstack gap-3 mb-4">
                                            <div>
                                                <p className="mb-1 text-muted small">Task: </p>
                                                287
                                            </div>
                                            <div className="ms-auto">
                                                <p className="mb-1 text-muted small">Started: </p>
                                                {data.date_docSubmision}
                                            </div>
                                            <div className="vr"></div>
                                            <div>
                                                <p className="mb-1 text-muted small">Deadline: </p>
                                                {data.lastExam_passingYear}
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="avatar-list avatar-list-stacked d-flex">
                                                <span className="pe-3">Team</span>
                                                {/* {data.team.map((img, index) => {
                                                    return (
                                                        <img key={index} className="avatar sm rounded-circle" src={img} data-bs-toggle="tooltip" title="Avatar" />
                                                    )
                                                })} */}
                                            </div>
                                            <a href="#" data-bs-toggle="offcanvas" data-bs-target="#project_detail" onClick={handleDetails}>View Detail</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Layout>
    )
}

// export default ProjectGrid
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
            requestAdminMonthJob,
            requestGetCandidate

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectGrid);
