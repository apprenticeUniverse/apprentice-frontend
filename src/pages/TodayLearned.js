import React, { useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const TodayLearned = (props) => {
  const [todayLearned, setTodayLearned] = useState("");

  const handleTodayLearnedChange = (event) => {
    setTodayLearned(event.target.value);
  };

  const handleTodayLearnedSubmit = (event) => {
    event.preventDefault();

    const todayLearnedObj = {
      description: todayLearned,
    };

    props.onTodayLearnedSubmit(todayLearnedObj);
  };

  return (
    <>
      <form onSubmit={handleTodayLearnedSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Today I've learned...</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="learnedToday"
              label="Today I've learned"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              onChange={handleTodayLearnedChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default TodayLearned;
