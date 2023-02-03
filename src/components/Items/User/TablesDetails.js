import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Grid, Button, Box, makeStyles } from "@material-ui/core";
import moment from "moment";

import api from "../../../API/baseURL";
import * as url from "../../../API/urls";
import DataTable from "../../DataTables/DataTable";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
}));

function TablesDetails({ tabIndex, userID }) {
  const [data, setData] = useState([]);
  const classes = useStyles();

  const formatDate = (date) => moment(date).format("MMMM Do YYYY, h:mm:ss a");

  // Daily Status Table columns definition
  const dailyColumns = [
    {
      field: "createdDate",
      headerName: "Created",
      width: 250,
      valueGetter: (params) => formatDate(params.row.createdDate),
    },
    { field: "beenDoing", headerName: "Been Doing", width: 250 },
    { field: "willDo", headerName: "Will Do", width: 250 },
  ];

  // TIL Table columns definition
  const learnedColumns = [
    {
      field: "learnedDate",
      headerName: "Created",
      width: 250,
      valueGetter: (params) => formatDate(params.row.learnedDate),
    },
    { field: "description", headerName: "Description", width: 250 },
  ];

  // Tickets Table columns definition
  const ticketColumns = [
    {
      field: "id",
      headerName: "Details",
      width: 300,
      renderCell: (params) => (
        <>
          <Grid container justify="center">
            <Grid item xs={12} md={12} xl={6}>
              <Box marginTop={1} textAlign="center">
                <NavLink to={`/app/ticket/${params.value}`}>
                  <Button variant="contained">Ticket Details</Button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    },
    {
      field: "createdDate",
      headerName: "Created",
      width: 250,
      valueGetter: (params) => formatDate(params.row.createdDate),
    },
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "resolved",
      headerName: "Status",
      width: 150,
      valueGetter: (params) =>
        params.row.resolved === true ? "Resolved" : "Pending",
    },
  ];

  // GET DATA
  const fetchData = async (index, userID) => {
    try {
      let response;
      if (index === 0) {
        response = await api.get(url.getPostUserDailies(userID));
      } else if (index === 1) {
        response = await api.get(url.getPostUserLearned(userID));
      } else if (index === 2) {
        response = await api.get(url.getPostUserTickets(userID));
      }
      setData(response.data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    fetchData(tabIndex, userID);
  }, []);

  console.log();
  return (
    <>
      {!data ? (
        "No data"
      ) : tabIndex === 0 ? (
        <DataTable tableData={data} columns={dailyColumns} customID={true} />
      ) : tabIndex === 1 ? (
        <DataTable tableData={data} columns={learnedColumns} customID={true} />
      ) : (
        tabIndex === 2 && <DataTable tableData={data} columns={ticketColumns} />
      )}
    </>
  );
}

export default TablesDetails;
