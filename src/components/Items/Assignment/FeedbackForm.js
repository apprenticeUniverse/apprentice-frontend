import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function FeedbackForm({ onAddedFeedback, buttonName, apprenticeID }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState("");
  const [enable, setEnable] = useState(false);

  const handleScore = (e) => {
    setScore(e.target.value);
  };

  const handleComment = (e) => {
    let replay = e.target.value;
    if (replay.length) {
      setComment(replay);
      setEnable(true);
    } else {
      setEnable(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpload = (event) => {
    event.preventDefault();
    onAddedFeedback(comment, score, apprenticeID);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        {buttonName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {buttonName}
          </Typography>
          <form onSubmit={handleUpload}>
            <FormControl variant="standard">
              <Box marginTop={2}>
                <TextField
                  type="number"
                  name="score"
                  label="Score"
                  InputProps={{
                    inputProps: {
                      max: 10,
                      min: 0,
                    },
                  }}
                  value={score}
                  required={true}
                  onChange={handleScore}
                  fullWidth
                ></TextField>
              </Box>
              <Box marginTop={2}>
                <TextField
                  id="outlined-textarea"
                  label="Give Feedback Here"
                  placeholder="Comments"
                  multiline
                  rows={4}
                  autoFocus={true}
                  required={true}
                  onChange={(e) => handleComment(e)}
                  fullWidth
                />
              </Box>
              <br />
              <Button
                size="small"
                color="secondary"
                variant="contained"
                disabled={!enable}
                type="submit"
                sx={{ mt: 1, mr: 1 }}
              >
                Send
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default FeedbackForm;
