import { Grid, makeStyles } from "@material-ui/core";
import Leftbar from "../../components/Dashboard/Leftbar";
import { Route, Routes } from "react-router-dom";
import PageContainer from "../../components/Dashboard/common/PageContainer";
import Faq from "../Faq";
import NotFound from "../notFound";
import api from "../../API/baseURL";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FrameAssignment from "../../components/Items/Assignment/FrameAssignment";
import FrameTicket from "../../components/Items/Ticket/FrameTicket";
import { leftbarItemsStakeholder } from "../../components/Dashboard/consts/LeftbarItemsStakeholder";
import DashboardStakeholder from "./DashboardStakeholder";
import AssignmentsStakeholder from "./AssignmentsStakeholder";
import TasksStakeholder from "./TasksStakeholder";
import BatchesStakeholder from "./BatchesStakeholder";
import FrameBatch from "../../components/Items/Batch/FrameBatch";
import FrameUser from "../../components/Items/User/FrameUser";

const useStyles = makeStyles((theme) => ({
  rightbar: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function Stakeholder() {
  const userInfo = useSelector((state) => state.userData);
  const userID = useSelector((state) => state.userId);

  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item sm={2} xs={2}>
          {/* SideBar in Dashboard: dynamic buttons. Set the list for Role */}
          <Leftbar buttonContent={leftbarItemsStakeholder}></Leftbar>
        </Grid>
        <Grid item sm={10} xs={10}>
          <p>Content </p>
          <Routes>
            <Route
              path="/app/stakeholder"
              element={<FrameTicket></FrameTicket>}
            />
            {/* Dashboard Page for Role*/}
            <Route
              path="app/stakeholder/dashboard"
              element={
                <PageContainer>
                  <DashboardStakeholder userID={userID}></DashboardStakeholder>
                </PageContainer>
              }
            />
            {/*  Page for Role*/}
            <Route
              path="app/stakeholder/assignments"
              element={
                <PageContainer>
                  <AssignmentsStakeholder
                    userID={userID}
                  ></AssignmentsStakeholder>
                </PageContainer>
              }
            />
            {/* Page for Role*/}
            <Route
              path="app/stakeholder/tasks"
              element={
                <PageContainer>
                  <TasksStakeholder userID={userID}></TasksStakeholder>
                </PageContainer>
              }
            />
            <Route
              path="app/stakeholder/batches"
              element={
                <PageContainer>
                  <BatchesStakeholder />
                </PageContainer>
              }
            />
            {/* Frames Pages*/}
            <Route path="/app/batch/:id" element={<FrameBatch />} />
            <Route path="/app/assignment/:id" element={<FrameAssignment />} />
            <Route path="/app/ticket/:id" element={<FrameTicket />} />
            <Route path="/app/user/:id" element={<FrameUser />} />
            {/* Faq Page for all Roles*/}
            <Route
              path="app/faq"
              element={
                <PageContainer>
                  <Faq />
                </PageContainer>
              }
            />
            {/* Not Found for all Role*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stakeholder;
