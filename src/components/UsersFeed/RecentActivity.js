import React, { useState } from "react";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
  LocalActivity,
  PlaylistAddCheckCircleSharp,
  PublishedWithChanges,
  Task,
} from "@mui/icons-material";
import {
  Collapse,
  Divider,
  ListItemButton,
  Typography,
  Box,
} from "@mui/material";
import moment from "moment";

import ItemListButton from "../Dashboard/common/ItemListButton";
import TicketListItem from "../Dashboard/common/TicketListItem";

const useStyles = makeStyles((theme) => ({
  feedsubTitle: {
    fontSize: "1.3rem",
    marginBottom: "0",
    color: theme.palette.secondary.main,
  },
  drop: {
    width: "100%",
    fontSize: "2rem",
    color: theme.palette.secondary.main,
  },
  iconDrop: {
    color: theme.palette.secondary.main,
    backgroundColor: "white",
    borderRadius: theme.spacing(2),
    fontSize: "2rem",
  },
  rightbarTitle: {
    color: theme.palette.secondary.main,
  },
}));

const RecentActivity = ({ assignms, tickets }) => {
  const [openDrop1, setOpenDrop1] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [openDrop3, setOpenDrop3] = useState(false);

  const classes = useStyles();
  return (
    <>
      <Box marginBottom={3}>
        <Typography variant="h5" className={classes.rightbarTitle}>
          Recent Activity
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItemButton
          onClick={() => setOpenDrop1(!openDrop1)}
          className={classes.drop}
        >
          <ListItemIcon>
            <PublishedWithChanges className={classes.iconDrop} />
          </ListItemIcon>
          <ListItemText primary="Reviewed"></ListItemText>
          {openDrop1 ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </ListItemButton>
        <Collapse in={openDrop1} timeout="auto" unmountOnExit>
          {assignms.filter((a) => a.status === "Completed").length !== 0 ? (
            assignms
              .filter((a) => a.status === "Completed")
              .slice(0, 3)
              .map((a) => (
                <ItemListButton
                  key={a.id}
                  id={a.id}
                  avatarColor={"white"}
                  avatarBgroundColor={"green"}
                  icon={<PlaylistAddCheckCircleSharp />}
                  topicName={a.topic}
                  titleName={a.title}
                  dateName={"Deadline:"}
                  date={moment(a.deadLine).format("MMMM Do YYYY, h:mm:ss a")}
                ></ItemListButton>
              ))
          ) : (
            <ListItem>
              <ListItemText primary="There aren't Revisions"></ListItemText>
            </ListItem>
          )}
        </Collapse>
        <ListItemButton
          onClick={() => setOpenDrop2(!openDrop2)}
          className={classes.drop}
        >
          <ListItemIcon>
            <Task className={classes.iconDrop} />
          </ListItemIcon>
          <ListItemText primary="To review"></ListItemText>
          {openDrop2 ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </ListItemButton>
        <Collapse in={openDrop2} timeout="auto" unmountOnExit>
          {assignms.filter((a) => a.status === "RevisionInProgress").length !==
          0 ? (
            assignms
              .filter((a) => a.status === "RevisionInProgress")
              .slice(0, 3)
              .map((a) => (
                <ItemListButton
                  key={a.id}
                  id={a.id}
                  avatarColor={"white"}
                  avatarBgroundColor={"#fcef56"}
                  icon={<PlaylistAddCheckCircleSharp />}
                  topicName={a.topic}
                  titleName={a.title}
                  dateName={"Deadline:"}
                  date={moment(a.deadLine).format("MMMM Do YYYY, h:mm:ss a")}
                ></ItemListButton>
              ))
          ) : (
            <ListItem>
              <ListItemText primary="There aren't Revisions"></ListItemText>
            </ListItem>
          )}
        </Collapse>

        <ListItemButton
          onClick={() => setOpenDrop3(!openDrop3)}
          className={classes.drop}
        >
          <ListItemIcon>
            <LocalActivity className={classes.iconDrop} />
          </ListItemIcon>
          <ListItemText primary="Last Tickets Opened"></ListItemText>

          {openDrop3 ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </ListItemButton>
        <Collapse in={openDrop3} timeout="auto" unmountOnExit>
          {Object.keys(tickets).length !== 0 ? (
            tickets
              .slice(0, 3)
              .map((t) => (
                <TicketListItem
                  key={t.id}
                  id={t.id}
                  avatarColor={"white"}
                  avatarBgroundColor={t.resolved ? "green" : "red"}
                  icon={<LocalActivity />}
                  userName={t.apprenticeName}
                  dateName={"Created Date:"}
                  issueName={t.title}
                  date={t.createdDate}
                ></TicketListItem>
              ))
          ) : (
            <ListItem>
              <ListItemText primary="There aren't Tickets"></ListItemText>
            </ListItem>
          )}
        </Collapse>
      </List>
    </>
  );
};

export default RecentActivity;
