import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

import {
  Divider,
  Typography,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { Grid, makeStyles, Container } from "@material-ui/core";
import moment from "moment";

import api from "../../../API/baseURL";
import * as url from "../../../API/urls";
import DataTable from "../../DataTables/DataTable";
import MoreUserDetails from "./MoreUserDetails";
import NewEditIndividualAssignm from "../../Stakeholder/NewEditIndividualAssignm";
import NewUserPassword from "../../UsersFeed/NewPasswordForm";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
}));

function FrameUser() {
  const classes = useStyles();
  const paramsData = useParams();
  const { id: userID } = paramsData;
  const [userData, setUserData] = useState({});

  // Assignments Table columns definition
  const assignmentColumns = [
    {
      field: "id",
      headerName: "Details",
      width: 200,
      renderCell: (params) => (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={12} xl={6}>
              <Box marginTop={1} textAlign="center">
                <NavLink to={`/app/assignment/${params.value}`}>
                  <Button variant="contained">Details</Button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    },
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => (
        <Box textAlign="center" margin="auto">
          {params.row.status === "Incomplete" ? (
            <Alert severity="error">Incomplete</Alert>
          ) : params.row.status === "RevisionInProgress" ? (
            <Alert severity="info">Revision in progress</Alert>
          ) : (
            <Alert severity="success">Completed</Alert>
          )}
        </Box>
      ),
    },
    {
      field: "Type",
      headerName: "Type",
      width: 150,
      valueGetter: (params) =>
        params.row.apprenticeID ? "Individual" : params.row.batchID && "Batch",
    },
    {
      field: "deadLine",
      headerName: "Dead Line",
      width: 250,
      valueGetter: (params) =>
        moment(params.row.deadLine).format("MMMM Do YYYY, h:mm:ss a"),
    },
  ];

  // Batches (if user is stakeholder) Table columns definition
  const batchesColumns = [
    {
      field: "id",
      headerName: "Details",
      width: 300,
      renderCell: (params) => (
        <>
          <Grid container>
            <Grid item xs={12} md={12} xl={6}>
              <Box marginTop={1} textAlign="center">
                <NavLink to={`/app/batch/${params.value}`}>
                  <Button variant="contained">Batch details</Button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    },
    { field: "batchName", headerName: "Batch Name", width: 150 },
    { field: "ownerName", headerName: "Owner Name", width: 250 },
  ];

  // GET USER INFO
  const fetchUserData = async () => {
    try {
      const response = await api.get(url.getUserByID(userID));
      setUserData(response.data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  // PUT NEW USER PASSWORD
  const newPasswordHandler = async (password) => {
    const formData = new FormData();
    formData.append("password", password);
    try {
      const response = await api.put(url.putUserPassword(userID), formData);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  // POST INDIVIDUAL ASSIGNMENT
  const addAssignment = async (newAssignment, apprenticeID) => {
    try {
      const response = await api.post(
        url.postIndividualAssignmentByApprenticeID(apprenticeID),
        newAssignment
      );
      setUserData({
        ...userData,
        assignments: userData?.assignments?.concat({
          id: response.data.id,
          title: response.data.title,
          status: "Incomplete",
          deadLine: response.data.deadLine,
          apprenticeID: userID,
        }),
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container className={classes.container}>
      <Box marginBottom={2} marginTop={2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" className={classes.feedTitle}>
              {userData.firstName
                ? `${userData.firstName} ${userData.lastName}`
                : "Loading username..."}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <NewUserPassword
              buttonName={"Change password"}
              onNewPassword={newPasswordHandler}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider></Divider>

      <Grid container>
        <Grid item xs={12} md={6}>
          <Box margin={2}>
            <Alert icon={<Email fontSize="inherit" />} severity="info">
              <Typography variant="p">
                {userData.emailAddress
                  ? userData.emailAddress
                  : "Loading email..."}
              </Typography>
            </Alert>
          </Box>
        </Grid>

        {userData.userBatch && (
          <Grid item xs={12} md={6}>
            <Box margin={2}>
              <Card variant="outlined">
                <CardContent>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Enrolled in Batch:
                  </Typography>
                  <Typography variant="body2">
                    {userData.userBatch.batchName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <NavLink to={`/app/batch/${userData.userBatch.id}`}>
                    <Button variant="outlined" size="small">
                      Batch Details
                    </Button>
                  </NavLink>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        )}
      </Grid>

      {userData.ownedBatches && (
        <>
          <Divider></Divider>
          <Box marginTop={2} marginBottom={2}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" className={classes.feedTitle}>
                  Batches Owned
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {userData.ownedBatches.length <= 0 ? (
            "No batches owned"
          ) : (
            <>
              <Box marginTop={2} marginBottom={2}>
                <DataTable
                  tableData={userData.ownedBatches}
                  columns={batchesColumns}
                />
              </Box>
            </>
          )}
        </>
      )}

      {userData.role === "APPRENTICE" && (
        <>
          <Divider></Divider>
          <Box marginTop={2} marginBottom={2}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" className={classes.feedTitle}>
                  User Assignments
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box marginTop={2}>
                <NewEditIndividualAssignm
                  onAddedAssignment={addAssignment}
                  buttonName="Create Individual Assignment"
                  userID={userID}
                />
              </Box>
            </Grid>
          </Box>
          <Box marginTop={2} marginBottom={2}>
            <DataTable
              tableData={userData.assignments}
              columns={assignmentColumns}
            />
          </Box>
        </>
      )}
      {userData.role === "APPRENTICE" && (
        <>
          <Divider></Divider>
          <Box marginTop={2} marginBottom={2}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" className={classes.feedTitle}>
                  More details
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <MoreUserDetails userID={userID} />
        </>
      )}
    </Container>
  );
}

export default FrameUser;
