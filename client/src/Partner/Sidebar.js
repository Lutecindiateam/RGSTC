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
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WalletOutlined,
  CalendarOutlined,
  WechatOutlined,
  FilePdfOutlined,
  EditOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
const Sidebar = ({ handleDrawerToggle, ...props }) => {
  const [user, setUser] = useState({});

  const menu = [
    {
      label: (
        <ListItemButton to="/dashboard" style={{ padding: 0 }}>
          <ListItemText primary="Dashboard" style={{ color: "white", textDecoration: "none" }} />
        </ListItemButton>
      ),
      key: "dashboard",
      icon: <HomeOutlined />,
    },

    {
      label: <ListItemText primary="Project Management" style={{ color: "white" }} />,
      key: "project",
      icon: <CodeSandboxOutlined />,
      children: [
        user.role === "clerk" ?
          {
            label: (
              <ListItemButton to="/upload">
                <ListItemText primary="New Project" style={{ color: "white", textDecoration: "none" }} />
              </ListItemButton>
            ),
            key: "new_project",
            icon: <UnorderedListOutlined />,
          } : null,
        {
          label: (
            <ListItemButton to="/all-data">
              <ListItemText primary="Project List" style={{ color: "white", textDecoration: "none" }} />
            </ListItemButton>
          ),
          key: "project_list",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <ListItemButton to="/projects">
              <ListItemText primary="Project Grid" style={{ color: "white", textDecoration: "none" }} />
            </ListItemButton>
          ),
          key: "productSubcategory",
          icon: <UnorderedListOutlined />,
        }
      ],
    },
    user.role === "superadmin" ?
      {
        label: <ListItemText primary="User Management" style={{ color: "white" }} />,
        key: "user_mangement",
        icon: <ShoppingOutlined />,
        children: [
          {
            label: (
              <ListItemButton to="/reset">
                <ListItemText primary="Users" style={{ color: "white", textDecoration: "none" }} />
              </ListItemButton>
            ),
            key: "appli_manage",
            icon: <UserOutlined />,
          },
          {
            label: (
              <ListItemButton to="/referee_manage">
                <ListItemText primary="Referee" style={{ color: "white", textDecoration: "none" }} />
              </ListItemButton>
            ),
            key: "referee",
            icon: <CheckOutlined />,
          },
          {
            label: (
              <ListItemButton to="/committee_manage">
                <ListItemText primary="Committee" style={{ color: "white", textDecoration: "none" }} />
              </ListItemButton>
            ),
            key: "committee",
            icon: <UnorderedListOutlined />,
          },
          {
            label: (
              <ListItemButton to="/flow">
                <ListItemText primary="Scheme Flow" style={{ color: "white", textDecoration: "none" }} />
              </ListItemButton>
            ),
            key: "committee",
            icon: <EditOutlined />,
          },
        ],
      } : null,
    {
      label: <ListItemText primary="Status" style={{ color: "white" }} />,
      key: "status",
      icon: <MinusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to='/inprogress'>
              <span>In Progress</span>
            </NavLink>
          ),
          key: "inprogress",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to='/succadm'>
              <span>Accepted</span>
            </NavLink>
          ),
          key: "newSale",
          icon: <CheckOutlined />,
        },
        {
          label: (
            <NavLink to='/rejection'>
              <span>Rejected</span>
            </NavLink>
          ),
          key: "rejection",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: <ListItemText primary="Accounts" style={{ color: "white" }} />,
      key: "accounts",
      icon: <WalletOutlined />,
      children: [
        {
          label: (
            <NavLink to='/account/'>
              <span>Account</span>
            </NavLink>
          ),
          key: "accountList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to='/transaction/create'>
              <span>New Transaction</span>
            </NavLink>
          ),
          key: "newTransaction",
          icon: <CheckOutlined />,
        },
        {
          label: (
            <NavLink to='/transaction/'>
              <span>Transaction List</span>
            </NavLink>
          ),
          key: "transactionList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: <ListItemText primary="Report" style={{ color: "white" }} />,
      key: "report",
      icon: <FlagOutlined />,
      children: [
        {
          label: (
            <NavLink to='/account/trial-balance'>
              <span>Trial Balance</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        {
          label: (
            <NavLink to='/account/balance-sheet'>
              <span>Balance Sheet</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        {
          label: (
            <NavLink to='/account/income'>
              <span>Income Statement</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },

    {
      label: (
        <ListItemButton to="/calendar" style={{ padding: 0 }}>
          <ListItemText primary="My Calendar" style={{ color: "white", textDecoration: "none" }} />
        </ListItemButton>
      ),
      key: "calendar",
      icon: <CalendarOutlined />,
    },
    {
      label: (
        <ListItemButton to="/chat" style={{ padding: 0 }}>
          <ListItemText primary="Chat" style={{ color: "white", textDecoration: "none" }} />
        </ListItemButton>
      ),
      key: "chat",
      icon: <WechatOutlined />,
    },
    {
      label: (
        <ListItemButton to="/file" style={{ padding: 0 }}>
          <ListItemText primary="File Manager" style={{ color: "white", textDecoration: "none" }} />
        </ListItemButton>
      ),
      key: "dashboard",
      icon: <FilePdfOutlined />,
    },
    {
      label: <ListItemText primary="Setting" style={{ color: "white" }} />,
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to='/invoice-setting'>
              <span>Invoice Settings</span>
            </NavLink>
          ),
          key: "invoiceSetting",
          icon: <SettingOutlined />,
        },
      ],
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
        backgroundColor: "#2c3e50",
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
            color: "gold",
            fontWeight: "bold",
            fontSize: "25px",
            paddingLeft: "10px",
            paddingTop: "10px",
          }}
        >
          R.G.S.T.C
          {/* W.B.I.C. */}
        </strong>
        {/* <strong style={{ color: "gold", fontWeight: "bold", fontSize: "20px" }}>
          Wain
        </strong> */}
        {/* &nbsp;
        <img src={ob} alt="ob" style={{ height: "90%", width: "70px" }} />
        &nbsp; */}
        {/* <strong style={{ color: "gold	", fontWeight: "bold", fontSize: "20px" }}>
          Ganga
        </strong> */}
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
        style={{ backgroundColor: "#2c3e50", color: "white" }}
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
