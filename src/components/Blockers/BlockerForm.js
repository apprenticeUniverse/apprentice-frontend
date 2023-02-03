import React from "react";

import { Grid, TextField } from "@mui/material";

const BlockerForm = () => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          required
          id="blockerTitle"
          label="Title"
          fullWidth
          autoComplete="cc-name"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="blockerDescription"
          label="Description"
          fullWidth
          autoComplete="cc-number"
          variant="standard"
        />
      </Grid>
    </>
  );
};

export default BlockerForm;
