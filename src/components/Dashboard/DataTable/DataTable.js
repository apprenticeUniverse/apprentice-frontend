import { makeStyles } from "@material-ui/core";
import { Container, Link, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(3),
    width: "90%",
  },
}));

const DataTable = ({ rows, columns, loading, sx }) => {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState(5);

  return (
    <DataGrid
      autoHeight
      sx={sx}
      loading={loading}
      rows={rows}
      columns={columns}
    ></DataGrid>
  );
};

export default DataTable;
