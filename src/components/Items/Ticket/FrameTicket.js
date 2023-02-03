import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  ListItemText,
  TextField,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import moment from "moment";

import api from "../../../API/baseURL";
import * as url from "../../../API/urls";
import { addTicketInfo } from "../../../store/actions";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  title: {
    color: theme.palette.secondary.main,
  },
  button: {
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.secondary.main,
    },
  },
  label: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const FrameTicket = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData);
  const paramsData = useParams();
  const { id } = paramsData;
  const ticketInfo = useSelector((state) => state.ticketInfo);
  const [enable, setEnable] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");

  const classes = useStyles();

  const date = (d) => {
    return moment(d).format("MMMM Do YYYY, h:mm:ss a");
  };
  const selectPriority = (priority) => {
    switch (priority) {
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "Hight";
      default:
        return;
    }
  };

  const handleChecked = () => {
    setOpenComment(!openComment);
    setEnable(false);
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

  const handleChange = () => {
    const formData = new FormData();
    formData.append("feedback", comment);
    // PUT feedback
    api
      .put(url.putTicketByID(id), formData)
      .then((response) => {
        //This closes the comment section
        setOpenComment(!openComment);
        const data = response.data;
        dispatch(
          addTicketInfo({
            ...ticketInfo,
            feedback: data.feedback,
            resolutionDate: data.resolutionDate,
            resolve: true,
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // GET
  const fetchTicket = async () => {
    try {
      const response = await api.get(url.getTicketByID(id));
      dispatch(addTicketInfo(response.data));
    } catch (e) {
      if (e.response) {
        console.log("Error :C");
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } else {
        console.log(`Error: ${e.message}`);
      }
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Ticket
      </Typography>
      <Divider></Divider>
      {Object.keys(ticketInfo).length === 0 ? (
        "No information"
      ) : (
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h3">Issue: {ticketInfo.title}</Typography>
          </Grid>

          <Grid item container xs={12} md={6} spacing={1}>
            <Grid item xs={6} md={3}>
              <ListItemText
                primary="Apprentice:"
                secondary={ticketInfo.apprenticeName}
              ></ListItemText>
            </Grid>
            <Grid item md={3}>
              <ListItemText
                primary="Batch Name:"
                secondary={ticketInfo.batchName}
              ></ListItemText>
              {}
            </Grid>
            <Grid item md={3}>
              <ListItemText
                primary="Created Date: "
                secondary={date(ticketInfo.createdDate)}
              ></ListItemText>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              width: "100%",
              marginTop: 3,
            }}
          >
            <Grid item xs={12} md={6}>
              <ListItemText primary="Priority:"></ListItemText>
              <Box width={"60%"} margin="auto">
                {ticketInfo.priority === 3 ? (
                  <Alert severity="error">
                    {selectPriority(ticketInfo.priority)}
                  </Alert>
                ) : ticketInfo.priority === 2 ? (
                  <Alert severity="warning">
                    {selectPriority(ticketInfo.priority)}
                  </Alert>
                ) : (
                  ticketInfo.priority === 1 && (
                    <Alert severity="info">
                      {selectPriority(ticketInfo.priority)}
                    </Alert>
                  )
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <ListItemText
                primary="Resolved:"
                secondary={!ticketInfo.resolved ? "Not yet" : "Yes"}
              ></ListItemText>
            </Grid>
            {ticketInfo.resolutionDate && (
              <Grid item xs={12} md={3}>
                <ListItemText
                  primary="Resolved:"
                  secondary={date(ticketInfo.resolutionDate)}
                ></ListItemText>
              </Grid>
            )}
          </Grid>
          <Grid container>
            <Box marginTop={3} width="100%">
              <Grid item xs={12}>
                <Typography variant="h5">Description:</Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Typography variant="p">{ticketInfo.issue}</Typography>
              </Grid>
              {ticketInfo.feedback && (
                <Box width="80%" margin="auto" marginTop={3}>
                  <Typography variant="p">Resolution:</Typography>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <Alert severity="success">{ticketInfo.feedback}</Alert>
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>

          {userInfo.role !== "APPRENTICE" && (
            <Box margin={"auto"} marginTop={3} width="100%">
              <Grid container>
                <Grid item xs={12}>
                  <FormControlLabel
                    disabled={ticketInfo.resolved}
                    control={
                      <Checkbox
                        defaultChecked={ticketInfo.resolved}
                        onChange={handleChecked}
                        color="secondary"
                      ></Checkbox>
                    }
                    label="Mark Resolved"
                  />
                </Grid>
                {openComment && (
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-textarea"
                        label="Ticket feedback"
                        placeholder="Comments"
                        multiline
                        rows={4}
                        autoFocus={true}
                        required={true}
                        onChange={(e) => handleComment(e)}
                        style={{
                          width: "60%",
                          margin: "auto",
                          display: "flex",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box marginTop={2} textAlign="center">
                        <Button
                          size="small"
                          color="secondary"
                          variant="contained"
                          disabled={!enable}
                          onClick={handleChange}
                        >
                          Upload
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default FrameTicket;
