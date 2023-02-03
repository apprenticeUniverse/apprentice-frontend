import React, { useState, useEffect } from "react";

import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import api from "../../API/baseURL";
import * as url from "../../API/urls";

function NewIndiAssignmForm({
  onNewAssignment,
  onEditAssignment,
  assignmentInfo,
  fromUserID,
  userID,
}) {
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

  const [user, setUser] = useState("");

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
      if (fromUserID) {
        onNewAssignment(assignmentObject, fromUserID);
      } else {
        onNewAssignment(assignmentObject, userID);
      }
    }
  };

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
        <Box marginTop={2} textAlign="center">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default NewIndiAssignmForm;
