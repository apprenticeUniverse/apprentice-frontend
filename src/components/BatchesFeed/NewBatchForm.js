import React, { useState, useEffect } from "react";

import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import api from "../../API/baseURL";
import * as url from "../../API/urls";

function NewApprenticeForm({ onNewBatch, onEditBatch, batchInfo }) {
  const [stakeHoldersData, setStakeHoldersData] = useState([]);
  const [batchName, setBatchName] = useState(
    batchInfo ? batchInfo.batchName : ""
  );
  const [description, setDescription] = useState(
    batchInfo ? batchInfo.description : ""
  );
  const [stakeHolder, setStakeHolder] = useState({});
  const [active, setActive] = useState(batchInfo ? batchInfo.active : true);

  const batchNameHandler = (event) => {
    setBatchName(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const stakeHolderHandler = (event) => {
    setStakeHolder(event.target.value);
  };

  const activeHandler = (event) => {
    setActive(event.target.checked);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const batchObject = {
      batchName,
      description,
      ownerID: stakeHolder.id,
      active,
    };
    var formData = new FormData();

    Object.keys(batchObject).forEach((key) =>
      formData.append(key, batchObject[key])
    );

    if (batchInfo) {
      onEditBatch(formData, batchInfo.id);
    } else {
      onNewBatch(formData);
    }
  };

  // GET STAKEHOLDERS INFO
  const fetchStakeHoldersData = async () => {
    try {
      const response = await api.get(url.GET_ALL_STAKEHOLDERS);
      setStakeHoldersData(response.data);
      if (batchInfo) {
        setStakeHolder(response.data.find((x) => x.id === batchInfo.ownerID));
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };
  useEffect(() => {
    fetchStakeHoldersData();
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div>
        <TextField
          required
          id="batchName"
          label="Batch Name"
          defaultValue={batchName}
          onChange={batchNameHandler}
        />
        <TextField
          required
          multiline
          rows={4}
          id="description"
          label="Description"
          defaultValue={description}
          onChange={descriptionHandler}
        />
        {stakeHoldersData.length ? (
          <Box marginLeft={1}>
            <InputLabel id="simple-select-label">Batch Owner</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={stakeHolder}
              label="Stakeholder"
              onChange={stakeHolderHandler}
            >
              {stakeHoldersData.map((option) => (
                <MenuItem value={option} key={option.id}>
                  {option.firstName + " " + option.lastName}
                </MenuItem>
              ))}
            </Select>
            {batchInfo && (
              <Box marginLeft={1} display="inline-block">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={active}
                      onChange={activeHandler}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Active"
                />
              </Box>
            )}
          </Box>
        ) : (
          <Alert severity="warning">
            There aren't any stakeholders, please create one before creating a
            batch
          </Alert>
        )}
        {batchInfo && (
          <Box marginLeft={1} marginTop={1}>
            <Alert severity="warning">
              Unchecking "Active" will archive the batch
            </Alert>
          </Box>
        )}
        <Box marginTop={2} textAlign="center">
          <Button
            variant="contained"
            type="submit"
            disabled={stakeHoldersData.length > 0 ? false : true}
          >
            Submit
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default NewApprenticeForm;
