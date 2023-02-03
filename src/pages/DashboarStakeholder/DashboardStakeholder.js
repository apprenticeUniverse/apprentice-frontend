import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStakeAssignmsInfo } from "../../store/actions";

import { Container, Divider, Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";

import * as url from "../../API/urls";
import api from "../../API/baseURL";

import ListContainer from "../../components/Stakeholder/common/ListContainer";
import StatusTickets from "../../components/Stakeholder/StatusTickets";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(3),
  },
  feedTitle: {
    color: theme.palette.secondary.main,
  },
  subtitle: {
    color: theme.palette.secondary.main,
  },
  assignmentSubtitle: {
    color: theme.palette.secondary.main,
    backgroundColor: "#d8d6db",
  },
}));

const DashboardStakeholder = ({ userID }) => {
  const assignments = useSelector((state) => state.stakeAssignmsData);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [tickets, setTickets] = useState([]);

  // GET ASSIGNMENTS from ID APPRENTICE
  useEffect(() => {
    api.get(url.getTicketsByStakeholderID(userID)).then((response) => {
      setTickets(response.data);
    });
    api.get(url.getAssignmentsByStakeholderID(userID)).then((response) => {
      dispatch(addStakeAssignmsInfo(response.data));
    });
  }, []);

  return (
    <Container className={classes.container}>
      <Box marginBottom={2}>
        <Typography variant="h4" className={classes.feedTitle}>
          Dashboard
        </Typography>
      </Box>
      <Divider></Divider>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <StatusTickets tickets={tickets}></StatusTickets>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#44197E",
              color: "white",
            }}
            className={classes.assignmentSubtitle}
          >
            Assignments Per Batch
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{}}>
          {assignments ? (
            <ListContainer
              type={"dashboard"}
              list={assignments.filter((item) => {
                return !item.hasOwnProperty("weeklyAssignment");
              })}
            ></ListContainer>
          ) : (
            "There isn't Data"
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#44197E",
              color: "white",
            }}
            className={classes.assignmentSubtitle}
          >
            Weekly Assignments
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {assignments ? (
            <ListContainer
              type={"dashboard"}
              list={assignments.filter((item) => {
                return item.hasOwnProperty("weeklyAssignment");
              })}
            ></ListContainer>
          ) : (
            "There isn't Data"
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardStakeholder;
