import React, { useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import BlockerForm from "../components/Blockers/BlockerForm";

const Blockers = (props) => {
  const [blockerTitle, setBlockerTitle] = useState("");
  const [blockerDescription, setBlockerDescription] = useState("");
  const [blockerPriority, setBlockerPriority] = useState(1);
  const [showBlockerForm, setShowBlockerForm] = useState(true);

  const handleCheck = () => {
    setShowBlockerForm(!showBlockerForm);
  };

  const handleTitleChange = (event) => {
    setBlockerTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setBlockerDescription(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setBlockerPriority(event.target.value);
  };

  const handleBlockerSubmit = (event) => {
    event.preventDefault();

    const blockerObj = {
      title: blockerTitle,
      issue: blockerDescription,
      priority: blockerPriority,
    };

    if (showBlockerForm) {
      props.onBlockerSubmit(blockerObj);

      setBlockerTitle("");
      setBlockerDescription("");
    }
  };

  return (
    <>
      <form onSubmit={handleBlockerSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Any Blocker?</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              label="I don't have any blocker"
              control={<Checkbox checked={!showBlockerForm} />}
              onChange={handleCheck}
            />
          </Grid>
          {showBlockerForm && (
            <>
              <Grid item xs={12}>
                <TextField
                  required
                  id="blockerTitle"
                  label="Title"
                  value={blockerTitle}
                  fullWidth
                  autoComplete="cc-name"
                  variant="standard"
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  id="blockerDescription"
                  label="Description"
                  value={blockerDescription}
                  fullWidth
                  variant="standard"
                  onChange={handleDescriptionChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="simple-select">Priority</InputLabel>
                <Select
                  labelId="simple-select"
                  id="simple-select"
                  value={blockerPriority}
                  label="Priority"
                  onChange={handlePriorityChange}
                >
                  <MenuItem value={1}>Low</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>High</MenuItem>
                </Select>
              </Grid>
            </>
          )}
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

export default Blockers;
