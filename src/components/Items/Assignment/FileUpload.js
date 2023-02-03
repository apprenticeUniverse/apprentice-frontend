import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Button, makeStyles } from "@material-ui/core";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import api from "../../../API/baseURL";
import * as url from "../../../API/urls";

const useStyles = makeStyles((theme) => ({
  container: {
    borderStyle: "dotted",
    borderColor: "#b4bbc4",
  },
  fileInput: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    paddingRight: theme.spacing(1),
  },
}));

const FileUpload = ({ assignmentID, getResponse }) => {
  const [file, setFile] = useState({});
  const [comment, setComment] = useState("");
  const { id: userID } = useSelector((state) => state.userData);
  const [enable, setEnable] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleComment = (e) => {
    let comment = e.target.value;
    if (comment.length) {
      setComment(comment);
      setEnable(true);
    } else {
      setEnable(false);
    }
  };

  const handleFile = (e) => {
    let file = e.target.files[0];
    setFile(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("apprenticeReply", comment);
    // POST
    api
      .post(url.postSolutionToAssignment(assignmentID, userID), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        getResponse(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.container}>
        <FormControlLabel
          label="Upload a file?"
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
        {checked && (
          <>
            <Box marginBottom={2}>
              <Alert severity="info">
                Uploading a file is optional, it must be .docx and less than
                5MB.
              </Alert>
            </Box>
            <Box className={classes.fileInput}>
              <label className={classes.label}>Select file</label>
              <input type="file" name="file" onChange={(e) => handleFile(e)} />
            </Box>
          </>
        )}
        <Box marginBottom={2} marginTop={2}>
          <TextField
            id="outlined-textarea"
            label="Solution / Reply"
            placeholder="Enter your solution please"
            multiline
            rows={4}
            autoFocus={true}
            required={true}
            onChange={(e) => handleComment(e)}
            fullWidth
          />
        </Box>
        <Box marginBottom={2} textAlign="center">
          <Button
            size="small"
            color="secondary"
            variant="contained"
            disabled={!enable && file.length != 0}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Box>
        <Box marginBottom={2} display="block">
          <Alert severity="warning">
            Once you submit your solution it can't be changed, be careful.
          </Alert>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
