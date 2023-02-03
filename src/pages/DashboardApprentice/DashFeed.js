import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Container, makeStyles } from "@material-ui/core";
import { Box, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";

import Rightbar from "../../components/Dashboard/Rightbar";
import DataTable from "../../components/DataTables/DataTable";
import Profile from "../../components/UsersFeed/Profile";
import RecentActivity from "../../components/UsersFeed/RecentActivity";
import ApprenticeAssignments from "../../components/UsersFeed/ApprenticeAssignments";
import api from "../../API/baseURL";
import * as url from "../../API/urls";

const useStyles = makeStyles((theme) => ({
  feedTitle: {
    color: theme.palette.secondary.main,
  },
  feedsubTitle: {
    fontSize: "1.3rem",
    marginBottom: "0",
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
  button: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.secondary.main,
    },
  },
  rightbar: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

// Table columns definition for tickets
const columnsTickets = [
  {
    field: "id",
    headerName: "Details",
    width: 200,
    renderCell: (params) => (
      <>
        <Grid container>
          <Grid item xs={12} md={12} xl={6}>
            <Box marginTop={1} textAlign="center">
              <NavLink to={`/app/ticket/${params.value}`}>
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
    field: "createdDate",
    headerName: "Created Date",
    width: 200,
    renderCell: (params) =>
      moment(params.value).format("MMMM Do YYYY, h:mm:ss a"),
  },
  {
    field: "resolved",
    headerName: "Resolved",
    width: 100,
    valueGetter: (params) => (params.row.resolved ? "Yes" : "No"),
  },
];

function DashFeed() {
  const [openTable, setOpenTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [assignms, setAssignms] = useState([]);
  const [tickets, setTickets] = useState([]);

  const {
    assignments: userAssignments,
    id: userID,
    firstName: userFirstName,
  } = useSelector((state) => state.userData);

  const classes = useStyles();

  useEffect(() => {
    api.get(url.getTicketsPerUser(userID)).then((response) => {
      setTickets(response.data);
    });
    setAssignms(userAssignments);
  }, [userAssignments]);

  const handleTableView = () => {
    setOpenTable((state) => !state);
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.feedTitle}>
        Dashboard
      </Typography>
      <Divider />
      <Profile></Profile>

      {/* TABLE OPEN/ CLOSE*/}
      {openTable ? (
        <ApprenticeAssignments
          handleTableView={handleTableView}
          open={openTable}
        />
      ) : (
        <Grid container>
          <Grid item sm={1} md={6} className={classes.rightbar}>
            <Rightbar
              list={assignms.filter((a) => a.status === "Incomplete")}
              barName={"Upcoming Assignments"}
              showMore={handleTableView}
            ></Rightbar>
          </Grid>
          <Grid item sm={12} md={6}>
            <RecentActivity
              assignms={assignms}
              tickets={tickets}
              showMore={handleTableView}
              isOpen={() => setOpen(!open)}
            ></RecentActivity>
          </Grid>

          {/**Tickets Table */}
          <Box marginTop={3} marginBottom={3}>
            <Typography variant="h5" className={classes.feedTitle}>
              {userFirstName}'s Tickets
            </Typography>
          </Box>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              {tickets.length !== 0 ? (
                <>
                  <DataTable
                    tableData={tickets}
                    columns={columnsTickets}
                  ></DataTable>
                </>
              ) : (
                "There aren't Tickets"
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default DashFeed;
