import React, { useState } from "react";

import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const FaqForm = ({ onNewQuestion, onEditedQuestion, toEdit }) => {
  const [question, setQuestion] = useState(toEdit ? toEdit.question : "");
  const [answer, setAnswer] = useState(toEdit ? toEdit.answer : "");
  const [topic, setTopic] = useState(toEdit ? toEdit.topic : "LOGIN");

  const questionHandler = (event) => {
    setQuestion(event.target.value);
  };

  const answerHandler = (event) => {
    setAnswer(event.target.value);
  };

  const topicHandler = (event) => {
    setTopic(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const questionObject = {
      question: question,
      answer: answer,
      topic: topic,
    };
    if (toEdit) {
      onEditedQuestion(questionObject, toEdit.id);
    } else {
      onNewQuestion(questionObject);
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
          id="question"
          label="Question"
          defaultValue={question}
          onChange={questionHandler}
        />
        <TextField
          required
          multiline
          rows={4}
          id="answer"
          label="Answer"
          defaultValue={answer}
          onChange={answerHandler}
        />
        <Box textAlign="center">
          <InputLabel id="simple-select-label">Topic</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={topic}
            label="Topic"
            onChange={topicHandler}
          >
            <MenuItem value={"LOGIN"}>Login</MenuItem>
            <MenuItem value={"APPRENTICE"}>Apprentice</MenuItem>
            <MenuItem value={"ASSIGNMENTS"}>Assignments</MenuItem>
          </Select>
        </Box>
        <Box marginTop={2} textAlign="center">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default FaqForm;
