import React, { useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const DailyStatus = (props) => {
  const [beenDoing, setBeenDoing] = useState("");
  const [willDo, setWillDo] = useState("");

  const handleBeenDoingChange = (event) => {
    setBeenDoing(event.target.value);
  };

  const handleWillDoChange = (event) => {
    setWillDo(event.target.value);
  };

  const handleDailyStatusSubmit = (event) => {
    event.preventDefault();

    const DailyStatusObj = {
      beenDoing: beenDoing,
      willDo: willDo,
    };

    props.onDailyStatusSubmit(DailyStatusObj);
  };

  return (
    <>
      <form onSubmit={handleDailyStatusSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">I've been doing...</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              id="beenDoing"
              label="I've been doing"
              fullWidth
              variant="standard"
              onChange={handleBeenDoingChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Today I'll do...</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              id="willDo"
              label="Today I'll do"
              fullWidth
              variant="standard"
              onChange={handleWillDoChange}
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

export default DailyStatus;
