import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { Grid, makeStyles } from "@material-ui/core";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Task } from "@mui/icons-material";

import TabBar from "../../components/Dashboard/common/TabBar";
import ListContainer from "../../components/Stakeholder/common/ListContainer";
import NewEditIndividualAssignm from "../../components/Stakeholder/NewEditIndividualAssignm";
import DataTable from "../../components/DataTables/DataTable";
import * as url from "../../API/urls";
import api from "../../API/baseURL";

const useStyles = makeStyles((theme) => ({
  feedTitle: {
    color: theme.palette.secondary.main,
  },
  personAssignButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const AssignmentsStakeholder = () => {
  const classes = useStyles();
  const [assignms, setAssignms] = useState([]);
  const [openTable, setOpenTable] = useState(false);
  const assignments = useSelector((state) => state.stakeAssignmsData);

  const userId = useSelector((state) => state.userId);

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
                <NewEditIndividualAssignm
                  onEditedAssignment={editAssignment}
                  buttonName="Edit Assignment"
                  assignmentInfo={assignms.find((x) => x.id === params.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "Type",
      headerName: "Type",
      width: 250,
      renderCell: (params) =>
        params.row.apprenticeID ? (
          <Box margin="auto" textAlign="center">
            <NavLink to={`/app/user/${params.row.apprenticeID}`}>
              <Button variant="contained">Apprentice</Button>
            </NavLink>
          </Box>
        ) : (
          params.row.batchID && (
            <Box margin="auto" textAlign="center">
              <NavLink to={`/app/batch/${params.row.batchID}`}>
                <Button variant="contained">Batch</Button>
              </NavLink>
            </Box>
          )
        ),
    },
    {
      field: "Weekly",
      headerName: "Weekly",
      width: 150,
      valueGetter: (params) => (params.row.weeklyAssignment ? "YES" : "NO"),
    },
  ];

  // PUT ASSIGNMENTS

  const editAssignment = async (editedAssignment, assignmentID) => {
    try {
      const response = await api.put(
        url.putAssignmentByBatchID(assignmentID),
        editedAssignment
      );
      setAssignms(
        assignms.map((obj) =>
          obj.id === response.data.id
            ? { ...response.data, userID: "User" }
            : obj
        )
      );
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  // GET ASSIGNMENTS from ID APPRENTICE
  useEffect(() => {
    api.get(url.getAssignmentsByStakeholderID(userId)).then((response) => {
      setAssignms(response.data);
    });
  }, []);

  const filterToReview = (item) => {
    if (item.timesCompleted !== 0) {
      if (item.timesCompleted !== item.timesGivenFeedback) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const filterReviewed = (item) => {
    if (item.timesCompleted !== 0) {
      if (item.timesCompleted === item.timesGivenFeedback) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleTableView = () => {
    setOpenTable((open) => !open);
  };

  return (
    <Container>
      <Typography variant="h4" className={classes.feedTitle}>
        Assignments Workload
      </Typography>
      <Divider></Divider>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Box textAlign="center" marginTop={2}>
            <Button
              variant="contained"
              className={classes.personAssignButton}
              onClick={handleTableView}
            >
              <Task /> {openTable ? " Hide Table" : " View Assignments Table"}
            </Button>
          </Box>
        </Grid>
        {openTable ? (
          <Grid item xs={12} md={12}>
            {assignms.length === 0 ? (
              "No data available"
            ) : (
              <Box marginTop={2}>
                <DataTable tableData={assignms} columns={columns} />
              </Box>
            )}
          </Grid>
        ) : (
          <Grid item xs={12} md={12}>
            <TabBar
              labelNameOne={"To review"}
              labelNameTwo={"Reviewed"}
              contentOne={
                Object.keys(assignms).length !== 0 ? (
                  Object.keys(assignms.filter(filterToReview)).length !== 0 ? (
                    <ListContainer
                      list={assignms.filter(filterToReview)}
                      type={"assignments"}
                    ></ListContainer>
                  ) : (
                    "There isn't any Pending Assignment"
                  )
                ) : (
                  "There aren't assignments"
                )
              }
              contentTwo={
                Object.keys(assignms).length !== 0 ? (
                  Object.keys(assignms.filter(filterReviewed)).length !== 0 ? (
                    <ListContainer
                      list={assignms.filter(filterReviewed)}
                      type={"assignments"}
                    ></ListContainer>
                  ) : (
                    "There isn't any Reviwed Assignment"
                  )
                ) : (
                  "There aren't assignments"
                )
              }
            ></TabBar>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default AssignmentsStakeholder;
