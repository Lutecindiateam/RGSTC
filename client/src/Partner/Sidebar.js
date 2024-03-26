import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@material-ui/core";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import GroupsIcon from '@mui/icons-material/Groups';
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import PreviewIcon from "@mui/icons-material/Preview";
import GamesIcon from '@mui/icons-material/Games';
import { Typography } from "antd";
import "./sidebar.css";
import ob from "../image/Wainganga.jpg";
import { bindActionCreators } from "redux";
import { requestAddResume, requestApplyJob } from "../Redux/actions";
import { connect } from "react-redux";
import AlbumIcon from '@mui/icons-material/Album';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import ReportIcon from '@mui/icons-material/Report';
import Sidenav from "./Sidenav/Sidenav";

import {
  CheckOutlined,
  CodeSandboxOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  FlagOutlined,
  HomeOutlined,
  MinusSquareOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  BorderBottomOutlined,
  FolderAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WalletOutlined,
  CalendarOutlined,
  WechatOutlined,
  FilePdfOutlined,
  EditOutlined,
  AlignCenterOutlined,
  TagsOutlined,
  PlusOutlined,
  BorderlessTableOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";


const Sidebar = ({ handleDrawerToggle, ...props }) => {
  const [user, setUser] = useState({});

  const menu = [
    {
      label: (
        <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
          <ListItemText primary="Dashboard" style={{ color: "gray", textDecoration: "none" }} />
        </NavLink>
      ),
      key: "dashboard",
      icon: <HomeOutlined />,
    },

    {
      label: <ListItemText primary="Project Management" style={{ color: "gray" }} />,
      key: "project",
      icon: <CodeSandboxOutlined />,
      children: [
        user.role === "clerk" ? {
          label: (
            <NavLink to="/preproposal" style={{ textDecoration: "none" }}>
              <ListItemText primary="Pre-Proposal" style={{ color: "gray", textDecoration: "none" }} />
            </NavLink>
          ),
          key: "pre_praposal",
          icon: <PlusCircleOutlined />,
        } : null,
        user.role === "clerk" ?
          {
            label: (
              <NavLink to="/upload" style={{ textDecoration: "none" }}>
                <ListItemText primary="Detailed Proposal" style={{ color: "gray", textDecoration: "none" }} />
              </NavLink>
            ),
            key: "new_project",
            icon: <BorderlessTableOutlined />,
          } : null,
        {
          label: (
            <NavLink to="/all-data" style={{ textDecoration: "none" }}>
              <ListItemText primary="Project List" style={{ color: "gray", textDecoration: "none" }} />
            </NavLink>
          ),
          key: "project_list",
          icon: <UnorderedListOutlined />,
        },
        // {
        //   label: (
        //     <NavLink to="/projects" style={{ textDecoration: "none" }}>
        //       <ListItemText primary="Project Grid" style={{ color: "gray", textDecoration: "none" }} />
        //     </NavLink>
        //   ),
        //   key: "productSubcategory",
        //   icon: <BorderBottomOutlined />,
        // },
        user.role === "superadmin" ?
          {
            label: (
              <NavLink to="/project-request" style={{ textDecoration: "none" }}>
                <ListItemText primary="Project Request" style={{ color: "gray", textDecoration: "none" }} />
              </NavLink>
            ),
            key: "productSubcategory",
            icon: <FolderAddOutlined />,
          } : null,
      ],
    },
    user?.role && user?.permission?.includes("scheme management") ? (
      {
        label: (
          <NavLink to="/flow" style={{ textDecoration: "none" }}>
            <ListItemText primary="Scheme Management" style={{ color: "gray", textDecoration: "none" }} />
          </NavLink>
        ),
        key: "committee",
        icon: <EditOutlined />,
      }
    ) : null,
    user?.role && user?.permission?.includes("preproposal approval") ? (
      {
        label: (
          <NavLink to="/pre-display" style={{ textDecoration: "none" }}>
            <ListItemText primary="Pre-Proposal" style={{ color: "gray", textDecoration: "none" }} />
          </NavLink>
        ),
        key: "committee",
        icon: <AlignCenterOutlined />,
      }
    ) : null
    ,
    user.role === "superadmin" ?
      {
        label: <ListItemText primary="Admin Management" style={{ color: "gray" }} />,
        key: "user_mangement",
        icon: <ShoppingOutlined />,
        children: [
          {
            label: (
              <NavLink to="/reset" style={{ textDecoration: "none" }}>
                <ListItemText primary="Users" style={{ color: "gray", textDecoration: "none" }} />
              </NavLink>
            ),
            key: "appli_manage",
            icon: <UserOutlined />,
          },
          {
            label: (
              <NavLink to="/role" style={{ textDecoration: "none" }}>
                <ListItemText primary="Role" style={{ color: "gray", textDecoration: "none" }} />
              </NavLink>
            ),
            key: "committee",
            icon: <TagsOutlined />,
          },
          {
            label: (
              <NavLink to="/flow" style={{ textDecoration: "none" }}>
                <ListItemText primary="Scheme Management" style={{ color: "gray", textDecoration: "none" }} />
              </NavLink>
            ),
            key: "committee",
            icon: <EditOutlined />,
          },
          {
            label: (
              <NavLink to="/*" style={{ textDecoration: "none" }}>
                <ListItemText primary="Workflow Management" style={{ color: "gray", textDecoration: "none" }} />
              </NavLink>
            ),
            key: "committee",
            icon: <EditOutlined />,
          },
        ],
      } : null,
    // {
    //   label: <ListItemText primary="Status" style={{ color: "gray" }} />,
    //   key: "status",
    //   icon: <MinusSquareOutlined />,
    //   children: [
    //     {
    //       label: (
    //         <NavLink to='/in-progress' style={{ textDecoration: "none" }}>
    //           <ListItemText primary="In Progress" style={{ color: "gray", textDecoration: "none" }} />
    //         </NavLink>
    //       ),
    //       key: "inprogress",
    //       icon: <UserOutlined />,
    //     },
    //     {
    //       label: (
    //         <NavLink to='/succadm' style={{ textDecoration: "none" }}>
    //           <ListItemText primary="Accepted" style={{ color: "gray", textDecoration: "none" }} />
    //         </NavLink>
    //       ),
    //       key: "newSale",
    //       icon: <CheckOutlined />,
    //     },
    //     {
    //       label: (
    //         <NavLink to='/rejection' style={{ textDecoration: "none" }}>
    //           <ListItemText primary="Rejected" style={{ color: "gray", textDecoration: "none" }} />
    //         </NavLink>
    //       ),
    //       key: "rejection",
    //       icon: <CloseSquareOutlined />,
    //     },
    //   ],
    // },
    // user?.role === "superadmin" || user?.role && user?.permission?.filter((value) => value === "access calendar").length > 0 ? (
    {
      label: (
        <NavLink to='/*' style={{ textDecoration: "none" }}>
          <ListItemText primary="Fund Mangement" style={{ color: "gray", textDecoration: "none" }} />
        </NavLink>
      ),
      key: "fund",
      icon: <UnorderedListOutlined />,
    }
    // ) : null
    ,
    // user?.role === "superadmin" || user?.role && user?.permission?.filter((value) => value === "access calendar").length > 0 ? (
    {
      label: (
        <NavLink to='/*' style={{ textDecoration: "none" }}>
          <ListItemText primary="Report" style={{ color: "gray", textDecoration: "none" }} />
        </NavLink>
      ),
      key: "report",
      icon: <FileDoneOutlined />,
    }
    // ) : null
    ,

    // console.log(user?.role === "superadmin" || user?.role && user?.permission?.filter((value) => value === "access calendar")),
    user?.role === "superadmin" || user?.role === "clerk" || user?.role && user?.permission?.filter((value) => value === "access calendar").length > 0 ? (
      {
        label: (
          <NavLink to='/calendar' style={{ textDecoration: "none" }}>
            <ListItemText primary="My Calendar" style={{ color: "gray", textDecoration: "none" }} />
          </NavLink>
        ),
        key: "calendar",
        icon: <CalendarOutlined />,
      }
    ) : null
    ,
    user?.role === "superadmin" || user?.role === "clerk" || user?.role && user?.permission?.filter((value) => value === "access chat").length > 0 ? (
      {
        label: (
          <NavLink to='/chat' style={{ textDecoration: "none" }}>
            <ListItemText primary="Chat" style={{ color: "gray", textDecoration: "none" }} />
          </NavLink>
        ),
        key: "chat",
        icon: <WechatOutlined />,
      }
    ) : null
    ,
    user?.role === "superadmin" || user?.role === "clerk" || user?.role && user?.permission?.filter((value) => value === "access fileManager").length > 0 ? (

      {
        label: (
          <NavLink to='/file' style={{ textDecoration: "none" }}>
            <ListItemText primary="Document" style={{ color: "gray", textDecoration: "none" }} />
          </NavLink>
        ),
        key: "document",
        icon: <FilePdfOutlined />,
      }
    ) : null
    ,
    {
      label: (
        <NavLink to='/*' style={{ textDecoration: "none" }}>
          <ListItemText primary="Settings" style={{ color: "gray", textDecoration: "none" }} />
        </NavLink>
      ),
      key: "settings",
      icon: <SettingOutlined />,
      // children: [
      //   {
      //     label: (
      //       <NavLink to='/invoice-setting'>
      //         <span>Invoice Settings</span>
      //       </NavLink>
      //     ),
      //     key: "invoiceSetting",
      //     icon: <SettingOutlined />,
      //   },
      // ],
    },
  ];

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setUser(empLoginData.data.data);
      }
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      } else {
        // localStorage.setItem("link", "/addResumeForm");
        // navigate("/login");
      }
    } else {
      // localStorage.setItem("link", "/addResumeForm");
      // navigate("/login");
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        // Swal.fire("Good job!", "Login successfully.", "success");
        //  navigate("/upload");
      } else {
        // Swal.fire("Sorry!", loginData.data.error , "error");
        // seterrorpassword("Invalid Credentials");
        // setError(true);
      }
    }
  }, [props.data.loginData]);

  return (

    <div
      style={{
        backgroundColor: "#e6f3f8",
        height: "100vh",
        paddingTop: "20px",

      }}
    >
      <div
        className="style"
        style={{
          display: "flex",
          paddingLeft: "15px",
        }}
      >
        <img src={ob} alt="ob" style={{ height: "80%", width: "70px" }} />
        <strong
          style={{
            color: "gray",
            fontWeight: "bold",
            fontSize: "25px",
            paddingLeft: "10px",
            paddingTop: "10px",
          }}
        >
          R.G.S.T.C
          {/* W.B.I.C. */}
        </strong>
      </div>
      <Divider />
      <br />
      {/* <List>
          <ListItem key="dashboard" disablePadding>
            <ListItemButton to="/dashboard">
              <ListItemIcon>
                <HomeIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
          {user.role === "clerk" && (
            <ListItem key="upload" disablePadding>
              <ListItemButton to="/upload">
                <ListItemIcon>
                  <AddIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="New Project" style={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem key="allData" disablePadding>
            <ListItemButton to="/all-data">
              <ListItemIcon>
                <PeopleAltIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Project List" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="project" disablePadding>
            <ListItemButton to="/projects">
              <ListItemIcon>
                <AlbumIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Project Grid" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
          {user.role !== "agent" ? (
            <ListItem key="rejection" disablePadding>
              <ListItemButton to="/rejection">
                <ListItemIcon>
                  <PreviewIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Rejected" style={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          ) : null}

          {user.role !== "agent" ? (
            <ListItem key="successful" disablePadding>
              <ListItemButton to="/succadm">
                <ListItemIcon>
                  <OfflinePinIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Accepted" style={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          ) : null}

          {user.role === "superadmin" ? (
            <>
              <ListItem key="applicant_manage" disablePadding>
                <ListItemButton to="/*">
                  <ListItemIcon>
                    <AdminPanelSettingsIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Applicant Management" style={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
              <ListItem key="referee" disablePadding>
                <ListItemButton to="/*">
                  <ListItemIcon>
                    <RoomPreferencesIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Referee Mangement" style={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
              <ListItem key="report" disablePadding>
                <ListItemButton to="/*">
                  <ListItemIcon>
                    <ReportIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Report" style={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
              
            </>
          ) : null}
         
          {user.role === "reset" ? (


            <ListItem key="amount" disablePadding>
              <ListItemButton to="/amount">
                <ListItemIcon>
                  <GamesIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Amount" style={{ color: "white" }} />
              </ListItemButton>
            </ListItem>

          ) : null}
          <ListItem key="calendar" disablePadding>
            <ListItemButton to="/calendar">
              <ListItemIcon>
                <CalendarMonthIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="My Calendar" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          <ListItem key="chat" disablePadding>
            <ListItemButton to="/chat">
              <ListItemIcon>
                <MarkChatUnreadIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Chat" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="file" disablePadding>
            <ListItemButton to="/file">
              <ListItemIcon>
                <InsertDriveFileIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="File Manager" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>


        </List> */}
      {/* <Sidenav /> */}
      {/* <div> */}
      <Menu
        // theme='dark'
        mode='inline'
        items={menu}
        // className='sidenav-menu'
        // className={styles["sidenav-menu"]}
        // openKeys={[sideNavOpenKeys]}
        style={{ backgroundColor: "#e6f3f8", color: "gray" }}
      />
      {/* </div> */}
      <Divider />
    </div >


  );
};

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
};

// export default Sidebar;
const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
    employee: state.employee,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestAddResume, requestApplyJob }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
