import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Divider, Typography, Button, Box } from "@mui/material";
import { Grid, makeStyles, Container } from "@material-ui/core";

import api from "../../API/baseURL";
import * as url from "../../API/urls";
import NewEditAssignment from "../../components/AssignmentsFeed/NewEditAssignment";
import DataTable from "../../components/DataTables/DataTable";

const useStyles = makeStyles(() => ({}));

function AssignmentsFeed() {
  const classes = useStyles();
  const [assignmentsData, setAssignmentsData] = useState([]);

  // Table columns definition
  const columns = [
    {
      field: "id",
      headerName: "Details",
      width: 300,
      renderCell: (params) => (
        <>
          <Grid container>
            <Grid item xs={12} md={12} xl={6}>
              <Box marginTop={1} textAlign="center">
                <NavLink to={`/app/assignment/${params.value}`}>
                  <Button variant="contained">Details</Button>
                </NavLink>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} xl={6}>
              <Box marginTop={1} textAlign="center">
                <NewEditAssignment
                  onEditedAssignment={editAssignment}
                  buttonName="Edit Assignment"
                  assignmentInfo={assignmentsData.find(
                    (x) => x.id === params.value
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "topic", headerName: "Topic", width: 150 },
    {
      field: "Type",
      headerName: "Type",
      width: 150,
      valueGetter: (params) =>
        params.row.apprenticeID ? "Individual" : params.row.batchID && "Batch",
    },
    {
      field: "Weekly",
      headerName: "Weekly",
      width: 150,
      valueGetter: (params) => (params.row.weeklyAssignment ? "YES" : "NO"),
    },
  ];

  // GET ASSIGNMENTS
  const fetchAssignmentData = async () => {
    try {
      const response = await api.get(url.GET_ALL_USERS_ASSIGNMENTS);
      setAssignmentsData(response.data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    fetchAssignmentData();
  }, []);

  // POST ASSIGNMENTS

  const addAssignment = async (newAssignment, batchID) => {
    try {
      const response = await api.post(
        url.postWeeklyAssignmentByBatchID(batchID),
        newAssignment
      );
      setAssignmentsData(
        assignmentsData.concat({ ...response.data, batchID: "Batch" })
      );
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  // PUT ASSIGNMENTS

  const editAssignment = async (editedAssignment, assignmentID) => {
    try {
      const response = await api.put(
        url.putAssignmentByBatchID(assignmentID),
        editedAssignment
      );
      setAssignmentsData(
        assignmentsData.map((obj) =>
          obj.id === response.data.id
            ? { ...response.data, batchID: "Batch" }
            : obj
        )
      );
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  return (
    <Container className={classes.container}>
      <Box marginBottom={2} marginTop={2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" className={classes.feedTitle}>
              All assignments
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <NewEditAssignment
              onAddedAssignment={addAssignment}
              buttonName="New Weekly Assignment"
            />
          </Grid>
        </Grid>
      </Box>

      <Divider></Divider>
      <Box marginBottom={2} marginTop={2}>
        <Typography variant="p">
          In this page you will see all batch and individual assignments.
        </Typography>
      </Box>

      {assignmentsData.length === 0 ? (
        "No data available"
      ) : (
        <DataTable tableData={assignmentsData} columns={columns} />
      )}
    </Container>
  );
}

export default AssignmentsFeed;
