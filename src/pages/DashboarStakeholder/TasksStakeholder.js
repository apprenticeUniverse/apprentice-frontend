import { makeStyles } from "@material-ui/core";
import { Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TabBar from "../../components/Dashboard/common/TabBar";
import ListContainer from "../../components/Stakeholder/common/ListContainer";
import * as url from "../../API/urls";
import api from "../../API/baseURL";

const useStyles = makeStyles((theme) => ({
  feedTitle: {
    color: theme.palette.secondary.main,
  },
}));

const TasksStakeholder = ({ userID }) => {
  const userInfo = useSelector((state) => state.userData);
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);

  // GET ASSIGNMENTS from ID APPRENTICE
  useEffect(() => {
    api.get(url.getTicketsByStakeholderID(userID)).then((response) => {
      setTickets(response.data);
    });
    // api.get(url.getTicketsPerUser(userID)).then((response) => {
    //   setTickets(response.data);
    // });
  }, []);

  const getListNoResolved = (item) => {
    return !item.resolved;
  };
  return (
    <Container>
      <Typography variant="h4" className={classes.feedTitle}>
        Tickets Workload
      </Typography>
      <Divider></Divider>
      <TabBar
        labelNameOne={"Pending"}
        labelNameTwo={"Completed"}
        contentOne={
          Object.keys(tickets).length !== 0 ? (
            Object.keys(
              tickets.filter((item) => {
                return !item.resolved;
              })
            ).length !== 0 ? (
              <ListContainer
                list={tickets.filter((item) => {
                  return !item.resolved;
                })}
                type={"tickets"}
              ></ListContainer>
            ) : (
              "There aren't any Pending Tickets!"
            )
          ) : (
            "There aren't any Tickets"
          )
        }
        contentTwo={
          Object.keys(tickets).length !== 0 ? (
            Object.keys(
              tickets.filter((item) => {
                return item.resolved;
              })
            ).length !== 0 ? (
              <ListContainer
                list={tickets.filter((item) => {
                  return item.resolved;
                })}
                type={"tickets"}
              ></ListContainer>
            ) : (
              "There aren't Pending Tickets"
            )
          ) : (
            "There aren't Tickets"
          )
        }
      ></TabBar>
    </Container>
  );
};

export default TasksStakeholder;
