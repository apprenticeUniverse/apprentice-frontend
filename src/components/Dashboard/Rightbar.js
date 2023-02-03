import { Container, makeStyles } from "@material-ui/core";
import { PlaylistAddCheckCircleSharp } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CommonButton from "./common/CommonButton";
import moment from "moment";

import ItemListButton from "./common/ItemListButton";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "sticky",
    top: 0,
  },
  rightbarTitle: {
    color: theme.palette.secondary.main,
  },
}));

function Rightbar({ list, showMore, barName }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
    showMore(!open);
  };

  useEffect(() => {}, [list]);

  return (
    <Container className={classes.container}>
      {list ? (
        <>
          {" "}
          <Box display="flex" justifyContent="space-between" marginBottom={3}>
            <Typography variant="h5" className={classes.rightbarTitle}>
              {barName}
            </Typography>
            <CommonButton
              color="primary"
              size="small"
              variant={"contained"}
              onclick={handleClick}
            >
              Show All
            </CommonButton>
          </Box>
          <Divider></Divider>
          <List className={classes.list}>
            {list.length !== 0 ? (
              list
                .slice(0, 4)
                .map((a) => (
                  <ItemListButton
                    key={a.id}
                    id={a.id}
                    avatarColor={"white"}
                    avatarBgroundColor={"#4d9dff"}
                    icon={<PlaylistAddCheckCircleSharp />}
                    topicName={a.topic}
                    dateName={"Deadline:"}
                    titleName={a.title}
                    date={moment(a.deadLine).format("MMMM Do YYYY, h:mm:ss a")}
                  ></ItemListButton>
                ))
            ) : (
              <ListItem>
                <ListItemText primary="There aren't Assignments"></ListItemText>
              </ListItem>
            )}
          </List>
          <Divider></Divider>
        </>
      ) : (
        "There isn't any Data"
      )}
    </Container>
  );
}

export default Rightbar;
