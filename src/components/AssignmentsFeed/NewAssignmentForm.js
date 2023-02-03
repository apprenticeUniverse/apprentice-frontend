import React, { useState, useEffect } from "react";

import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import api from "../../API/baseURL";
import * as url from "../../API/urls";

function NewAssignmentForm({
  onNewAssignment,
  onEditAssignment,
  assignmentInfo,
  fromBatchID,
}) {
  const [batchesData, setBatchesData] = useState([]);

  const [title, setTitle] = useState(
    assignmentInfo ? assignmentInfo.title : ""
  );
  const [deadLine, setDeadLine] = useState(
    assignmentInfo ? assignmentInfo.deadLine : ""
  );
  const [topic, setTopic] = useState(
    assignmentInfo ? assignmentInfo.topic : ""
  );
  const [instructions, setInstructions] = useState(
    assignmentInfo ? assignmentInfo.topic : ""
  );

  const [batch, setBatch] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const deadLineHandler = (newValue) => {
    setDeadLine(newValue);
  };

  const topicHandler = (event) => {
    setTopic(event.target.value);
  };

  const instructionsHandler = (event) => {
    setInstructions(event.target.value);
  };

  const batchHandler = (event) => {
    setBatch(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const assignmentObject = {
      title,
      deadLine,
      topic,
      instructions,
    };
    if (assignmentInfo) {
      onEditAssignment(assignmentObject, assignmentInfo.id);
    } else {
      if (fromBatchID) {
        onNewAssignment(assignmentObject, fromBatchID);
      } else {
        onNewAssignment(assignmentObject, batch.id);
      }
    }
  };

  // GET BATCHES INFO
  const fetchBatchesData = async () => {
    try {
      const response = await api.get(url.GET_ALL_BATCHES);
      setBatchesData(response.data);
      if (assignmentInfo) {
        setBatch(response.data.find((x) => x.id === assignmentInfo.id));
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };
  useEffect(() => {
    fetchBatchesData();
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
          id="title"
          label="Assignment Title"
          defaultValue={title}
          onChange={titleHandler}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            label="Dead Line"
            value={deadLine}
            onChange={deadLineHandler}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          required
          multiline
          id="topic"
          label="Topic"
          defaultValue={topic}
          onChange={topicHandler}
        />
        <TextField
          required
          multiline
          rows={4}
          id="instructions"
          label="Instructions"
          defaultValue={instructions}
          onChange={instructionsHandler}
        />

        {!assignmentInfo && (
          <>
            {!fromBatchID && (
              <>
                {batchesData ? (
                  <>
                    <InputLabel id="simple-select-label">Batch</InputLabel>
                    <Select
                      labelId="simple-select-label"
                      id="simple-select"
                      value={batch}
                      label="Batch"
                      onChange={batchHandler}
                      required
                    >
                      {batchesData.map((option) => (
                        <MenuItem value={option} key={option.id}>
                          {option.batchName}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  <Alert severity="warning">
                    There aren't any batches, please create one before creating
                    an assignment
                  </Alert>
                )}
              </>
            )}
          </>
        )}
        <Box marginTop={2} textAlign="center">
          <Button
            disabled={batchesData.length > 0 ? false : true}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default NewAssignmentForm;
