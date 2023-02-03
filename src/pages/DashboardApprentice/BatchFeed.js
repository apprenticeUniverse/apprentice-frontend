import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBatchInfo } from "../../store/actions";
import { NavLink } from "react-router-dom";

import { Container, makeStyles } from "@material-ui/core";
import { Box, Button, Divider, Grid, Typography, Alert } from "@mui/material";

import api from "../../API/baseURL";
import * as url from "../../API/urls";

import Rightbar from "../../components/Dashboard/Rightbar";
import DataTable from "../../components/DataTables/DataTable";
import CommonButton from "../../components/Dashboard/common/CommonButton";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  feedTitle: {
    color: theme.palette.secondary.main,
  },
  table: {
    color: "green",
  },
  button: {
    marginLeft: 20,
  },
}));

// Table columns Batch Assignments

const columns = [
  {
    field: "id",
    headerName: "Details",
    width: 200,
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

// Table columns Users
const columnsUsers = [
  {
    field: "Users",
    headerName: "Enrolled Users",
    width: 150,
    renderCell: (params) => (
      <div>{`${params.row.firstName} ${params.row.lastName}`}</div>
    ),
  },
  { field: "emailAddress", headerName: "Email", width: 250 },
];

function BatchFeed() {
  const {
    userBatch: { id: batchID },
  } = useSelector((state) => state.userData);
  const userBatch = useSelector((state) => state.batchData);
  const dispatch = useDispatch();

  const [openTable, setOpenTable] = useState(false);

  const handleTableView = () => {
    setOpenTable((open) => !open);
  };

  useEffect(() => {
    api
      .get(url.getBatchByID(batchID))
      .then((response) => {
        dispatch(addBatchInfo(response.data));
      })
      .catch((e) => {
        console.log("Error");
        console.log(e);
      });
  }, []);

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.feedTitle}>
        Batch: {userBatch ? userBatch.batchName : "Loading name"}
      </Typography>
      <Divider></Divider>

      <Grid container sx={{ marginTop: 2 }} spacing={2}>
        <Grid item xs={12} md={6}>
          <Alert severity="success">
            <Typography variant="h6">
              {userBatch.ownerName
                ? "Stakeholder: " + userBatch.ownerName
                : "Loading ownerName"}
            </Typography>
          </Alert>
        </Grid>
        <Grid item xs={12} md={6}>
          <Alert severity="info">
            <Typography variant="p">
              {userBatch.description
                ? userBatch.description
                : "Loading description"}
            </Typography>
          </Alert>
        </Grid>

        {openTable ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" marginTop={2}>
                  <Typography variant="h6" className={classes.feedTitle}>
                    Assignments in Batch
                  </Typography>
                  <CommonButton
                    sm={2}
                    classes={classes.button}
                    color="secondary"
                    size="small"
                    variant={"contained"}
                    onclick={handleTableView}
                  >
                    {openTable ? "Hide Table" : ""}{" "}
                  </CommonButton>
                </Box>
              </Grid>
              {userBatch ? (
                //Table Batch Assignments
                <Grid item sm={12}>
                  <DataTable
                    tableData={userBatch.assignments}
                    columns={columns}
                  ></DataTable>
                </Grid>
              ) : (
                "There isn't Data "
              )}
            </Grid>
          </>
        ) : (
          <>
            {userBatch ? (
              //Table users in batch
              <Grid item xs={12} md={6}>
                <DataTable
                  tableData={userBatch.apprentices}
                  columns={columnsUsers}
                />
              </Grid>
            ) : (
              "No data available"
            )}

            {userBatch ? (
              <Grid item xs={12} md={6}>
                <Rightbar
                  list={userBatch.assignments}
                  barName={"Upcoming Team Assignments"}
                  showMore={handleTableView}
                ></Rightbar>
              </Grid>
            ) : (
              "Loading Batch' Assignments"
            )}
          </>
        )}
      </Grid>
    </Container>
  );
}

export default BatchFeed;
