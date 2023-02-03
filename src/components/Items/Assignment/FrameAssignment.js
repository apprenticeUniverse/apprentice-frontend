import React, { useEffect, useState } from "react";
import { useParams, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignmInfo } from "../../../store/actions";

import { Grid, makeStyles } from "@material-ui/core";
import {
  Button,
  Container,
  Divider,
  ListItemText,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import moment from "moment";

import FileUpload from "./FileUpload";
import api from "../../../API/baseURL";
import * as url from "../../../API/urls";
import DataTable from "../../DataTables/DataTable";
import FeedbackForm from "./FeedbackForm";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  title: {
    color: theme.palette.secondary.main,
  },
  submission: {
    color: theme.palette.secondary.main,
  },
  dates: {
    color: "#89899f",
    paddingRight: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.secondary.main,
    },
  },
  form: {
    marginTop: theme.spacing(1),
  },
}));

const FrameAssignment = () => {
  const paramsData = useParams();
  const { id } = paramsData;
  const assignmentInfo = useSelector((state) => state.assignmentInfo);
  const { role: userRole, id: userID } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const classes = useStyles();

  const date = (d) => {
    return moment(d).format("MMMM Do YYYY, h:mm:ss a");
  };

  const [openForm, setOpenForm] = useState(false);
  const [solution, setSolution] = useState({});
  const [uploadData, setUploadData] = useState({});

  const openSubmitForm = () => {
    setOpenForm((state) => !state);
  };
  const handleResponse = (response) => {
    setUploadData(response.data);
    setOpenForm(false);
  };

  const handleFeedback = (response) => {
    console("Feedback Given");
  };

  // Solutions columns
  const solutionColumns = [
    {
      field: "id",
      headerName: "Details",
      width: 200,
      renderCell: (params) => (
        <Box margin="auto" textAlign="center">
          <NavLink to={`/app/user/${params.row.apprenticeID}`}>
            <Button variant="contained">Apprentice</Button>
          </NavLink>
        </Box>
      ),
    },
    { field: "apprenticeName", headerName: "Apprentice Name", width: 150 },
    {
      field: "apprenticeReply",
      headerName: "Reply",
      width: 250,
      renderCell: (params) => (
        <Alert severity="info">{params.row.apprenticeReply}</Alert>
      ),
    },
    {
      field: "File",
      headerName: "File",
      width: 200,
      renderCell: (params) =>
        params.row.fileUrl ? (
          <Box margin="auto" textAlign="center">
            <a
              href={params.row.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="contained">Apprentice</Button>
            </a>
          </Box>
        ) : (
          <Box margin="auto" textAlign="center">
            No File submitted
          </Box>
        ),
    },
    {
      field: "Feedback",
      headerName: "Feedback",
      width: 250,
      renderCell: (params) =>
        !params.row.feedback ? (
          <Box margin="auto" textAlign="center">
            <FeedbackForm
              onAddedFeedback={postFeedback}
              buttonName={"Send feedback"}
              apprenticeID={params.row.apprenticeID}
            />
          </Box>
        ) : (
          <Alert severity="success">
            <Box margin="auto" textAlign="center">
              {params.row.feedback} <br />
              Score: {params.row.score}
            </Box>
          </Alert>
        ),
    },
  ];

  // GET
  const fetchAssigns = async () => {
    try {
      const response = await api.get(url.getAssignmentByID(id));
      dispatch(addAssignmInfo(response.data));
      if (userRole === "APPRENTICE") {
        setSolution(
          response.data.solutions.find((x) => x.apprenticeID === userID)
        );
      }
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

  const postFeedback = async (feedback, score, apprenticeID) => {
    // PUT feedback into solution
    const formData = new FormData();
    formData.append("feedback", feedback);
    formData.append("score", score);

    api
      .put(url.putFeedbackToSolution(id, apprenticeID), formData)
      .then((response) => {
        // getResponse(response)
        dispatch(
          addAssignmInfo({
            ...assignmentInfo,
            solutions: assignmentInfo.solutions.map((obj) =>
              obj.apprenticeID === response.data.apprenticeID
                ? response.data
                : obj
            ),
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchAssigns();
  }, [uploadData]);

  const getTypeAssign = (Obj) => {
    if (Obj.hasOwnProperty("weeklyAssignment")) {
      return "Weekly Assignment";
    } else if (Obj.hasOwnProperty("batch")) {
      return "Group Assignment";
    } else if (Obj.hasOwnProperty("individual")) {
      return "Individual Assignment";
    } else {
      return "";
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Assignment
      </Typography>
      <Divider />
      {Object.keys(assignmentInfo).length === 0 ? (
        "No information"
      ) : (
        <Grid container>
          <Grid container justifyContent="flex-start" alignItems="baseline">
            <Grid item xs={12} md={6}>
              <Box marginTop={2} textAlign="center">
                <Typography variant="h4">{assignmentInfo.title}</Typography>
                <Typography variant="h5">{assignmentInfo.topic}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box textAlign="center">
                <ListItemText
                  primary="Due Date:"
                  secondary={date(assignmentInfo.deadLine)}
                ></ListItemText>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box marginTop={3} textAlign="center">
              <ListItemText
                primary="Created Date: "
                secondary={date(assignmentInfo.createdDate)}
              ></ListItemText>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box marginTop={3} textAlign="center">
              <ListItemText
                primary="Type of Assignment:"
                secondary={getTypeAssign(assignmentInfo)}
              ></ListItemText>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box marginTop={3}>
              <Typography variant="h5">Instructions:</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="p">{assignmentInfo.instructions}</Typography>
          </Grid>

          {assignmentInfo.editedDate && (
            <Grid item xs={4}>
              <Box marginTop={3}>
                <ListItemText
                  primary="Edited Date:"
                  secondary={date(assignmentInfo.editedDate)}
                ></ListItemText>
              </Box>
            </Grid>
          )}

          {userRole === "APPRENTICE" && (
            <>
              {!solution ? (
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      margin="auto"
                      marginTop={3}
                      textAlign="center"
                      borderBottom="thin solid #ccc"
                      width={"60%"}
                    >
                      <Typography variant="h6" className={classes.submission}>
                        Submit solution
                      </Typography>
                    </Box>
                  </Grid>
                  <Divider></Divider>
                  <Grid item xs={12} md={12}>
                    <Box marginTop={1} textAlign="center">
                      <Button
                        color="primary"
                        variant="contained"
                        size="medium"
                        onClick={openSubmitForm}
                        disabled={openForm}
                        className={classes.button}
                      >
                        Submit Work
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Grid container>
                  <Grid item xs={12}>
                    <Box marginTop={3}>
                      {!solution.feedback ? (
                        <Alert severity="warning">
                          You already submitted your solution, please wait for
                          revision
                        </Alert>
                      ) : (
                        <Alert severity="success">
                          <Typography>
                            You have already received feedback:
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {solution.feedback}
                          </Typography>
                          <Typography>
                            Your score: {solution.score}/10
                          </Typography>
                          <Box marginTop={3} textAlign="right">
                            Reviewed: {date(solution.feedbackDate)}
                          </Box>
                        </Alert>
                      )}
                    </Box>
                  </Grid>
                  {Object.keys(solution).length != 0 && (
                    <Grid item xs={12}>
                      <Box marginTop={3}>
                        <Alert severity="info">
                          <Typography>Your reply:</Typography>
                          <Typography>{solution.apprenticeReply}</Typography>
                          {solution.fileUrl && (
                            <Link href={solution.fileUrl} variant="body2">
                              {" "}
                              Download your uploaded File.{" "}
                            </Link>
                          )}
                          <Box marginTop={3} textAlign="right">
                            Submitted: {date(solution.submitDate)}
                          </Box>
                        </Alert>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </>
          )}

          {userRole != "APPRENTICE" && (
            <Grid item xs={12}>
              {Object.keys(assignmentInfo.solutions).length !== 0 ? (
                <Box marginTop={2}>
                  <Typography variant="h4" className={classes.title}>
                    Solutions
                  </Typography>
                  <DataTable
                    tableData={assignmentInfo.solutions}
                    columns={solutionColumns}
                    customID={true}
                  ></DataTable>
                </Box>
              ) : (
                <Box marginTop={2}>
                  <Alert severity="info">There are no solutions yet.</Alert>
                </Box>
              )}
            </Grid>
          )}

          {openForm && (
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              className={classes.form}
            >
              <Grid item>
                <FileUpload
                  assignmentID={id}
                  getResponse={handleResponse}
                ></FileUpload>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default FrameAssignment;
