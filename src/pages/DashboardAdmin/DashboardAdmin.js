import { Route, Routes } from "react-router-dom";

import { Grid } from "@material-ui/core";
import { leftbarItemsAdmin } from "../../components/Dashboard/consts/LeftbatItemsAdmin";

import PageContainer from "../../components/Dashboard/common/PageContainer";
import Faq from "../Faq";
import NotFound from "../notFound";
import UsersFeed from "./UsersFeed";
import BatchesFeed from "./BatchesFeed";
import AssignmentsFeed from "./AssignmentsFeed";
import FrameBatch from "../../components/Items/Batch/FrameBatch";
import FrameAssignment from "../../components/Items/Assignment/FrameAssignment";
import Leftbar from "../../components/Dashboard/Leftbar";
import FrameUser from "../../components/Items/User/FrameUser";
import FrameTicket from "../../components/Items/Ticket/FrameTicket";

function DashboardAdmin() {
  return (
    <div>
      <Grid container>
        <Grid item sm={2} xs={2}>
          {/* SideBar in Dashboard: dynamic buttons. Set the list for Role */}
          <Leftbar buttonContent={leftbarItemsAdmin}></Leftbar>
        </Grid>
        <Grid item sm={10} xs={10}>
          <p>Content </p>
          <Routes>
            {/* Page for Role*/}
            <Route
              path="app/admin/users"
              element={
                <PageContainer>
                  <UsersFeed />
                </PageContainer>
              }
            />
            {/*  Page for Role*/}
            <Route
              path="app/admin/batches"
              element={
                <PageContainer>
                  <BatchesFeed />
                </PageContainer>
              }
            />
            {/* Page for Role*/}
            <Route
              path="app/admin/assignments"
              element={
                <PageContainer>
                  <AssignmentsFeed />
                </PageContainer>
              }
            />

            {/* Faq Page for all Roles*/}
            <Route path="app/faq" element={<PageContainer><Faq></Faq></PageContainer>} />

            {/* Details pages for all Admin*/}
            <Route path="/app/assignment/:id" element={<FrameAssignment />} />
            <Route path="/app/batch/:id" element={<FrameBatch />} />
            <Route path="/app/ticket/:id" element={<FrameTicket />} />
            <Route path="/app/user/:id" element={<FrameUser />} />

            {/* Not Found for all Role*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardAdmin;
