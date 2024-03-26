import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { bindActionCreators } from "redux";
import {
  requestAdminMonthJob,
  requestAdminGetProfile,
  requestJobDetails,
  requestEmpGetCandidate,
  userLogout
} from "../Redux/actions";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

const drawerWidth = 240;

const Layout = ({ children, ...props }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const handleToggleClick = () => {
    setShowUserProfile(!showUserProfile);
  };

  const iconStyles = {
    display: "flex",
    cursor: "pointer",
    position: "absolute",
    left: "50px",
    border: "1px solid #ccc", // Add border style
    borderRadius: "15px", // Add border radius
    paddingLeft: "6px",
    paddingRight: "8px", // Add padding for better appearance
    alignItems: "center", // Align items vertically in the flex container
    color: "gray"
  };
  const iconStylesssss = {
    display: "flex",
    cursor: "pointer",
    position: "absolute",
    right: "50px",
    // border: "1px solid #ccc", // Add border style
    // borderRadius: "15px", // Add border radius
    // paddingLeft: "6px",
    // paddingRight: "8px", // Add padding for better appearance
    alignItems: "center", // Align items vertically in the flex container
    color: "gray"
  }
  const profileStyles = {
    display: showUserProfile ? "block" : "none",
    position: "absolute",
    // right: "10px", // Adjust the position as needed
    top: "40px", // Adjust the position as needed
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#F0F4F7",
    zIndex: 1,
    borderRadius: 8,
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    let loginData = props.candidate.loginData;
    // console.log(loginData);
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      } else {
        // console.log("hello");
        // navigate('/')
      }
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    // console.log(empLoginData);
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status === "success") {
        setUser(empLoginData.data.data);
      }
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let loginData = props.data.loginData;
    // console.log(loginData);
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        // if (
        //   loginData?.data?.data.role === "admin" ||
        //   loginData?.data?.data.role === "editor" ||
        //   loginData?.data?.data.role === "superadmin"
        // ) {
        setUser(loginData.data.data);
        // }
      }
    }
  }, [props.data.loginData]);

  useEffect(() => {
    if (props.candidate.loginData === undefined && props.employee.empLoginData === undefined && props.data.loginData === undefined) {
      navigate('/')
    }
  }, [])
  // console.log(user);
  // useEffect(() => {
  //   if (
  //     user.role === "admin" ||
  //     user.role === "editor" ||
  //     user.role === "superadmin"
  //   ) {
  //     props.requestAdminGetProfile({
  //       id: user.id,
  //     });
  //   } else if (user.role === "agent") {
  //     props.requestEmpGetCandidate({
  //       id: user.id,
  //     });
  //   } else {
  //     props.requestJobDetails({
  //       id: user.id,
  //     });
  //   }
  // }, [user]);

  useEffect(() => {
    if (
      user.role === "clerk"
    ) {
      props.requestJobDetails({
        id: user.id,
      });
    } else if (user.role === "agent") {
      props.requestEmpGetCandidate({
        id: user.id,
      });
    } else {
      props.requestAdminGetProfile({
        id: user.id,
      });
    }
  }, [user]);

  useEffect(() => {
    let getProfileData = props.data.getProfileData;
    if (getProfileData !== undefined) {
      if (getProfileData?.data?.status == "success") {
        // if (
        //   getProfileData?.data?.data.role === "admin" ||
        //   getProfileData?.data?.data.role === "editor" ||
        //   getProfileData?.data?.data.role === "superadmin"
        // ) {
        setProfile(getProfileData.data.data);
        // }
      }
    }
  }, [props.data.getProfileData]);

  useEffect(() => {
    let jobDetailsData = props.candidate.jobDetailsData;
    if (jobDetailsData !== undefined) {
      if (jobDetailsData?.data?.status == "success") {
        setProfile(jobDetailsData.data.data);
      }
    }
  }, [props.candidate.jobDetailsData]);

  useEffect(() => {
    let empGetCandidateData = props.employee.empGetCandidateData;
    if (empGetCandidateData !== undefined) {
      if (empGetCandidateData?.data?.status == "success") {
        setProfile(empGetCandidateData.data.data);
      }
    }
  }, [props.employee.empGetCandidateData]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#e6f3f8",
        }}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
          Wainganga College of Engineering & Management, Nagpur
          </Typography> */}

          <div style={iconStyles} onClick={handleToggleClick} className="feature-card">
            <AccountCircleIcon style={{ height: "40px", width: "40px" }} />
            <text>{profile?.name}<ArrowDropDownIcon /></text>
          </div>
          <div style={iconStylesssss} className="feature-card">
            <NotificationsActiveIcon style={{ height: "30px", width: "30px" }} />
          </div>
          {showUserProfile && (
            <div style={profileStyles}>
              {/* User information goes here */}
              <p style={{ color: "black" }}>Name: {profile.name}</p>
              <p style={{ color: "black" }}>Email: {profile.email}</p>
              {/* <p style={{ color: "black" }}>Role: {profile.role}</p> */}
              <Link as='a' className="btn py-2 btn-primary w-100 mt-3 rounded-pill" to="/logout" role="button">Logout</Link>

            </div>
          )}

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Sidebar
            handleDrawerToggle={handleDrawerToggle}
            style={{ backgroundColor: "#1890ff" }}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            backgroundColor: "#1890ff",
          }}
          open
        >
          <Sidebar handleDrawerToggle={() => { }} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

// export default Layout;
const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
    employee: state.employee,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { userLogout, requestAdminMonthJob, requestAdminGetProfile, requestJobDetails, requestEmpGetCandidate },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Layout);