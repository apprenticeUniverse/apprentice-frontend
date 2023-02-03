import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { Divider, Typography, Button, Box } from "@mui/material";
import { Grid, makeStyles, Container } from "@material-ui/core";

import DataTable from "../../components/DataTables/DataTable";

const useStyles = makeStyles((theme) => ({
  feedTitle: {
    color: theme.palette.secondary.main,
  },
}));

function BatchesStakeholder() {
  const classes = useStyles();
  const { ownedBatches: batchesData } = useSelector((state) => state.userData);

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
                <NavLink to={`/app/batch/${params.value}`}>
                  <Button variant="contained">Details</Button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    },
    { field: "batchName", headerName: "Batch Name", width: 150 },
    { field: "ownerName", headerName: "Owner Name", width: 250 },
    { field: "description", headerName: "Batch Description", width: 250 },
  ];

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.feedTitle}>
        Apprentice Batches
      </Typography>
      <Divider></Divider>

      <Box marginBottom={2} marginTop={2}>
        <Typography variant="p">You are owner of these batches.</Typography>
      </Box>

      {batchesData.length === 0 ? (
        "No data available"
      ) : (
        <DataTable tableData={batchesData} columns={columns} />
      )}
    </Container>
  );
}

export default BatchesStakeholder;
