import React, { useEffect, useState } from "react";

import { Pagination, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

import StatusItem from "./StatusItem";

const useStyles = makeStyles((theme) => ({
  feedTitle: {
    color: "purple",
  },
}));

const DailyStatusList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusesPerPage] = useState(3);

  const indexOfLastStatus = currentPage * statusesPerPage;
  const indexOfFirstPost = indexOfLastStatus - statusesPerPage;
  const currentStatuses = props.statusList.slice(
    indexOfFirstPost,
    indexOfLastStatus
  );

  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  const classes = useStyles();

  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <Typography variant="h5">Previous Statuses</Typography>
      {props.statusList.length > 0 ? (
        currentStatuses.map((statusItem) => (
          <StatusItem
            key={statusItem.createdDate}
            willDo={statusItem.willDo}
            beenDoing={statusItem.beenDoing}
            createdAt={statusItem.createdDate}
          ></StatusItem>
        ))
      ) : (
        <Typography>No Previous Statuses!</Typography>
      )}
      <Pagination
        count={Math.ceil(props.statusList.length / 5)}
        shape="rounded"
        onChange={handlePage}
      />
    </Paper>
  );
};

export default DailyStatusList;
