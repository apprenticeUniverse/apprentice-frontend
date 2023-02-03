import { Grid } from "@material-ui/core";
import Leftbar from "../../components/Dashboard/Leftbar";

import BatchFeed from "./BatchFeed";
import { leftbarItemsApprentice } from "../../components/Dashboard/consts/LeftbarItemsApprentice";
import { Route, Routes } from "react-router-dom";
import PageContainer from "../../components/Dashboard/common/PageContainer";
import Faq from "../Faq";
import NotFound from "../notFound";
import DashFeed from "./DashFeed";
import FrameAssignment from "../../components/Items/Assignment/FrameAssignment";

import FrameTicket from "../../components/Items/Ticket/FrameTicket";
import Status from "../Status";
import { useSelector } from "react-redux";
import ApprenticeProfile from "./ApprenticeProfile";

function DashboardApprentice() {
  const userInfo = useSelector((state) => state.userData);
  const userID = useSelector((state) => state.userId);
  return (
    <div>
      <Grid container>
        <Grid item sm={2} xs={2}>
          {/* SideBar in Dashboard: dynamic buttons. Set the list for Role */}
          <Leftbar buttonContent={leftbarItemsApprentice}></Leftbar>
        </Grid>
        <Grid item sm={10} xs={10}>
          <p>Content </p>
          <Routes>
            {/* Dashboard Page for Role*/}
            <Route
              path="/app/dashboard"
              element={
                <PageContainer>
                  <DashFeed userID={userID} userInfo={userInfo} />
                </PageContainer>
              }
            />
            {/*  Page for Role*/}
            <Route
              path="/app/batches"
              element={
                <PageContainer>
                  <BatchFeed
                    userBatchesData={userInfo.batches}
                    userID={userID}
                  />
                </PageContainer>
              }
            />
            {/* Page for Role*/}
            <Route
              path="/app/dailyStatus"
              element={
                <PageContainer>
                  <Status />
                </PageContainer>
              }
            />
            <Route
              path="/app/ticket/:id"
              element={<FrameTicket></FrameTicket>}
            />
            <Route
              path="/app/assignment/:id"
              element={<FrameAssignment></FrameAssignment>}
            />
            {/* Faq Page for all Roles*/}
            <Route
              path="/app/faq"
              element={
                <PageContainer>
                  <Faq />
                </PageContainer>
              }
            />
            <Route path="/app/profile" element={<ApprenticeProfile />} />
            {/* Not Found for all Role*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardApprentice;
