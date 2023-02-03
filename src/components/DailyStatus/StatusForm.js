import React, { useState } from "react";

import { Box, TextField } from "@mui/material";

const StatusForm = (props) => {
  const [beenDoing, setBeenDoing] = useState("");
  const [willDo, setWillDo] = useState("");

  const handleBeenDoing = (event) => {
    setBeenDoing(event.target.value);
  };

  const handleWillDo = (event) => {
    setWillDo(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newStatus = {
      beenDoing: beenDoing,
      willDo: willDo,
    };

    console.log(newStatus);
    props.onNewStatus(newStatus);
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div>
        <TextField
          required
          multiline
          rows={4}
          id="been-doing"
          label="Been Doing"
          defaultValue={beenDoing}
          onChange={handleBeenDoing}
        />
        <TextField
          required
          multiline
          rows={4}
          id="will-do"
          label="Will Do"
          defaultValue={willDo}
          onChange={handleWillDo}
        />
        <input type="submit" />
      </div>
    </Box>
  );
};

export default StatusForm;
