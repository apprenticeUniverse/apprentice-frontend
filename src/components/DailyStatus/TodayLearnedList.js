import React, { useEffect, useState } from "react";

import { Pagination, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

import TodayLearnedItem from "./TodayLearnedItem";

const useStyles = makeStyles((theme) => ({
  feedTitle: {
    color: "purple",
  },
}));

const TodayLearnedList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [todayLearnedPerPage] = useState(3);

  const indexOfLastTodayLearned = currentPage * todayLearnedPerPage;
  const indexOfFirstTodayLearned =
    indexOfLastTodayLearned - todayLearnedPerPage;
  const currentTodayLearned = props.todayLearnedList.slice(
    indexOfFirstTodayLearned,
    indexOfLastTodayLearned
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
      <Typography variant="h5">Previous Today Learned</Typography>
      {props.todayLearnedList.length > 0 ? (
        currentTodayLearned.map((todayLearnedItem) => (
          <TodayLearnedItem
            key={todayLearnedItem.learnedDate}
            description={todayLearnedItem.description}
            learnedAt={todayLearnedItem.learnedDate}
          ></TodayLearnedItem>
        ))
      ) : (
        <Typography>No Previous Today Learned!</Typography>
      )}
      <Pagination
        count={Math.ceil(props.todayLearnedList.length / 5)}
        shape="rounded"
        onChange={handlePage}
      />
    </Paper>
  );
};

export default TodayLearnedList;
