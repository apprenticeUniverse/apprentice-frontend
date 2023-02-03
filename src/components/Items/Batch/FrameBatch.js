import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { Divider, Typography, Button, Box, Alert } from "@mui/material";
import { Grid, makeStyles, Container } from "@material-ui/core";
import moment from "moment";

import api from "../../../API/baseURL";
import * as url from "../../../API/urls";
import NewEditAssignment from "../../AssignmentsFeed/NewEditAssignment";
import NewEditUser from "../../UsersFeed/NewEditUser";
import DataTable from "../../DataTables/DataTable";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
}));

function FrameBatch() {
  const classes = useStyles();
  const paramsData = useParams();
  const { id: batchID } = paramsData;
  const [batchData, setBatchData] = useState({});
  const { role: userRole } = useSelector((state) => state.userData);

  // Table columns definition
  const assignmentColumns = [
    {
      field: "id",
      headerName: "Details",
      width: 200,
      renderCell: (params) => (
        <>
          <Grid container>
            <Grid item xs={12} md={12} xl={12}>
              <Box marginTop={1} textAlign="center">
                <NavLink to={`/app/assignment/${params.value}`}>
                  <Button
                    style={{
                      backgroundColor: "#4d9dff",
                    }}
                    variant="contained"
                  >
                    Details
                  </Button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "topic", headerName: "Topic", width: 250 },
    {
      field: "deadLine",
      headerName: "Dead Line",
      width: 250,
      valueGetter: (params) =>
        moment(params.row.deadLine).format("MMMM Do YYYY, h:mm:ss a"),
    },
  ];

  const apprenticeColumns = [
    {
      field: "id",
      headerName: "Details",
      width: 200,
      renderCell: (params) => (
        <>
          <Grid container>
            <Grid item xs={12} md={12} xl={12}>
              <Box marginTop={1} textAlign="center">
                <NavLink to={`/app/user/${params.value}`}>
                  <Button
                    style={{
                      backgroundColor: "#4d9dff",
                    }}
                    variant="contained"
                  >
                    Details
                  </Button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    },
    {
      field: "Name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => (
        <div>{`${params.row.firstName} ${params.row.lastName}`}</div>
      ),
    },
    { field: "emailAddress", headerName: "Email", width: 250 },
  ];

  // GET BATCH INFO
  const fetchBatchData = async () => {
    try {
      const response = await api.get(url.getBatchByID(batchID));
      setBatchData(response.data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    fetchBatchData();
  }, []);

  // POST ASSIGNMENT
  const addAssignment = async (newAssignment, batchID) => {
    try {
      const response = await api.post(
        url.postAssignmentToBatch(batchID),
        newAssignment
      );
      setBatchData({
        ...batchData,
        assignments: batchData.assignments.concat(response.data),
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  // POST USER APPRENTICE
  const addApprentice = async (newUser, batchID) => {
    try {
      const response = await api.post(
        url.postNewUserAndAddToBatch(batchID),
        newUser
      );
      setBatchData({
        ...batchData,
        apprentices: batchData.apprentices.concat(response.data),
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  return (
    <Container className={classes.container}>
      <Box marginBottom={2} marginTop={2}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.feedTitle}>
              Batch {batchData.batchName ? batchData.batchName : "Batch Name"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider></Divider>

      <Grid container>
        <Grid item xs={12} md={6}>
          <Box margin={2}>
            <Alert severity="success">
              <Typography variant="h5">
                Stakeholder:{" "}
                {batchData.ownerName ? batchData.ownerName : "Owner Details"}
              </Typography>
            </Alert>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box margin={2}>
            <Alert severity="info">
              <Typography variant="p">
                {batchData.description
                  ? batchData.description
                  : "Batch Details"}
              </Typography>
            </Alert>
          </Box>
        </Grid>
      </Grid>
      <Divider></Divider>
      <Box marginTop={2} marginBottom={2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" className={classes.feedTitle}>
              Assignments
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <NewEditAssignment
              onAddedAssignment={addAssignment}
              buttonName="New Assignment"
              fromBatchID={batchData.id}
            />
          </Grid>
        </Grid>
      </Box>
      {batchData.assignments && (
        <Box marginTop={2} marginBottom={2}>
          <DataTable
            tableData={batchData.assignments}
            columns={assignmentColumns}
          />
        </Box>
      )}
      <Divider></Divider>
      <Box marginTop={2} marginBottom={2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" className={classes.feedTitle}>
              Apprentices in Batch
            </Typography>
          </Grid>
          {(userRole === "ADMIN" || userRole === "SUPER_ADMIN") && (
            <Grid item xs={12} md={6}>
              <NewEditUser
                onAddedApprentice={addApprentice}
                fromBatchID={batchData.id}
                buttonName={"Create new apprentice"}
              />
            </Grid>
          )}
        </Grid>
      </Box>
      {batchData.apprentices && (
        <DataTable
          tableData={batchData.apprentices}
          columns={apprenticeColumns}
        />
      )}
    </Container>
  );
}

export default FrameBatch;
