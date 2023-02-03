import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, makeStyles } from "@material-ui/core";
import { Box, Grid, Alert } from "@mui/material";

import CommonButton from "../Dashboard/common/CommonButton";
import DataTable from "../DataTables/DataTable";

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

function ApprenticeAssignments({ handleTableView, open }) {
  // Table columns definition for assignments
  const classes = useStyles();
  const { assignments } = useSelector((state) => state.userData);

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
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) =>
        params.row.status === "Incomplete" ? (
          <Alert severity="error">Incomplete</Alert>
        ) : params.row.status === "RevisionInProgress" ? (
          <Alert severity="info">Revision in progress</Alert>
        ) : (
          <Alert severity="success">Completed</Alert>
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
      field: "Weekly",
      headerName: "Weekly",
      width: 150,
      valueGetter: (params) => (params.row.weeklyAssignment ? "YES" : "NO"),
    },
  ];

  return (
    <Box marginBottom={4}>
      <Grid container>
        <Grid item>
          <CommonButton
            sm={2}
            classes={classes.button}
            color="secondary"
            size="small"
            variant="contained"
            onclick={() => {
              handleTableView();
            }}
          >
            {open ? "Hide Table" : ""}{" "}
          </CommonButton>
        </Grid>
        <Grid item sm={12}>
          <DataTable tableData={assignments} columns={columns}></DataTable>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ApprenticeAssignments;
