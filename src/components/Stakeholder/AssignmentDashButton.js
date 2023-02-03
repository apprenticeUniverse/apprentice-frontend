import React from "react";
import { NavLink } from "react-router-dom";

import { Typography } from "@material-ui/core";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Grid,
  Box,
} from "@mui/material";
import { PlaylistAddCheckCircleSharp } from "@mui/icons-material";
import moment from "moment";

const AssignmentDashButton = ({ assignment }) => {
  const getTypeAssign = (Obj) => {
    if (Obj.hasOwnProperty("weeklyAssignment")) {
      return " Type: Weekly Assignment";
    } else if (Obj.hasOwnProperty("apprenticeID")) {
      return "Type: Individual Assignment";
    } else if (Obj.hasOwnProperty("batchID")) {
      return "Type: Group Assignment";
    } else {
      return "";
    }
  };

  return (
    <NavLink to={`/app/assignment/${assignment.id}`}>
      <ListItemButton>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} sx={{ width: "100%" }}>
            <Grid container>
              <Grid item xs={3} md={3}>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ color: "#ff564d", backgroundColor: "#f8f8f8" }}
                    >
                      {<PlaylistAddCheckCircleSharp />}
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
              </Grid>
              <Grid item xs={9} md={9}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Typography align="center"> {assignment.topic}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={9}>
                <ListItemText
                  sx={{
                    borderRight: "solid thin #ccc",
                    marginRight: "1%",
                    paddingRight: "1%",
                  }}
                  primary={assignment.title}
                  secondary={`Due Date: ${moment(assignment.deadLine).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}`}
                ></ListItemText>
                <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                  {getTypeAssign(assignment)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Submissions part */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center">
              Submissions
            </Typography>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent="space-around"
              width="40%"
              margin="auto"
            >
              <Typography variant="h4">{assignment.timesCompleted}</Typography>
              <Typography variant="h2">/</Typography>
              <Typography variant="h4">{assignment.totalUsers}</Typography>
            </Box>
          </Grid>
        </Grid>
      </ListItemButton>
    </NavLink>
  );
};

export default AssignmentDashButton;
