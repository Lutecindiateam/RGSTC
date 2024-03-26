import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./Homepage";
import UploadData from "./Partner/UploadProject/UploadProject";
import Sidebar from "./Partner/Sidebar";
import PartnerLogin from "./Partner/ApplicantLogin";
import PartnerSignUp from "./Partner/signup";
import PartnerForget from "./Partner/forget";
import ColumnSelectorGrid from "./Partner/Admin/adminaction";
import TableData from "./Partner/UploadProject/ProjectList";
import Adminaction from "./Partner/Admin/adminaction";
import PartnerAdminLogin from "./Partner/Admin/Login";
import DemoBar from "./Partner/calender";
import QuickLinks from "./Partner/quick";
import Page404 from "./Partner/404/404Page";
import Account from "./Partner/account";
import Setting from "./Partner/setting";
import Header from "./Partner/Header";
import Logout from "./Partner/Logout";
import Pie from "./Partner/pie";
import { DocumentUploader } from "./Partner/documentUpload";
import DocView from "./Partner/documentView";
import AgentSignin from "./Partner/AgentSignin";
import Rejections from "./Partner/Rejections";
import Successful from "./Partner/Successful";
import Amount from "./Partner/Amount"
import VerifyOtp from "./Partner/OtpRegister";
import Dashboard from "./Partner/dashboard"
import Bar from "./Partner/bar";
import ProjectGrid from "./Partner/ProjectGrid/ProjectGrid";
import ProjectDetails from "./Partner/ProjectDetails/ProjectDetails";
import ProjectList from "./Partner/ProjectList/ProjectList";
import Calendar from "./Partner/MyCalendar/Calendar";
import FileManager from "./Partner/FileManager/FileManager";
import Chat from "./Partner/Chat/Chat";
import SchemeFlow from "./Partner/SchemeFlow";
import CreateRole from "./Partner/HandleRole/handleRoles"
import InProgress from "./Partner/InProgress";
import ProjectReques from "./Partner/Admin/ProjectRequest";
import AddPermission from "./Partner/Permissions";
import Reset from "./Partner/HandleUsers/HandleUsers"
import PerProjectProposal from "./Partner/UploadProject/UploadPPProject";
import PreProposalList from "./Partner/UploadProject/PreProposalList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PartnerLogin />,
  },
  {
    path: "/main",
    element: <Sidebar />,
  },
  {
    path: "/upload",
    element: <UploadData />,
  },
  {
    path: "/partnerlogin",
    element: <PartnerLogin />,
  },
  {
    path: "/signup",
    element: <PartnerSignUp />,
  },
  {
    path: "/partnerforget",
    element: <PartnerForget />,
  },
  {
    path: "/adminaction",
    element: <ColumnSelectorGrid />,
  },
  {
    path: "/all-data",
    element: <TableData />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/partner/admin",
    element: <PartnerAdminLogin />,
  },
  {
    path: "/adminaction",
    element: <Adminaction />,
  },
  // {
  //   path: "/bar",
  //   element: <Bar />,
  // },
  {
    path: "/dashboard",
    element: <Dashboard />
    ,
  },
  {
    path: "/quick",
    element: <QuickLinks />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/header",
    element: <Header />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/document",
    element: <DocumentUploader />,
  },
  {
    path: "/doc/:course/:branch/:id",
    element: <DocView />,
  },
  {
    path: "/login",
    element: <AgentSignin />,
  },
  {
    path: "/rejection",
    element: <Rejections />,
  },
  {
    path: "/succadm",
    element: <Successful />,
  },
  {
    path: "/reset",
    element: <Reset />
  },
  {
    path: "/amount",
    element: <Amount />
  },

  {
    path: '/projects',
    element: <ProjectGrid />
  },
  {
    path: '/project-details',
    element: <ProjectDetails />
  },
  {
    path: '/project_list',
    element: <ProjectList />
  },
  {
    path: '/calendar',
    element: <Calendar />
  },
  {
    path: "/file",
    element: <FileManager />
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/flow",
    element: <SchemeFlow />
  },
  {
    path: "/role",
    element: <CreateRole />
  },
  {
    path: "/in-progress",
    element: <InProgress />
  },
  {
    path: "/project-request",
    element: <ProjectReques />
  },
  {
    path: "/permission",
    element: <AddPermission />
  },
  {
    path: "/preproposal",
    element: <PerProjectProposal />
  },
  {
    path: "/pre-display",
    element: <PreProposalList />
  }
  // {
  //   path: "/graph/:id",
  //   element: <
  // }
  // {
  //   path: "/otpregister",
  //   element: <VerifyOtp />
  // },


]);

export default router;
