import React, { useState } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { useNavigate, Outlet } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(8.5),
    paddingLeft: "0",
    paddingRight: "0",
    backgroundColor: "rgba(0, 0, 0, 0.87)",
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  },
  toggleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    boxSizing: "content-box",
    width: "100%",
  },
  button: {
    boxSizing: "content-box",
    width: "100%",
  },

  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    color: "white",
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "1em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "3em",
    },
  },
  text: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Leftbar = ({ buttonContent }) => {
  const navigate = useNavigate();

  const [view, setView] = useState("Dashboard");

  const classes = useStyles();

  const handleChange = (even, nextView) => {
    if (nextView != null) setView(nextView);

    /*if next view is iqual event, don't change*/
  };

  return (
    <Container className={classes.container}>
      <ToggleButtonGroup
        className={classes.toggleContainer}
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
      >
        {buttonContent.map((b) => (
          <ToggleButton
            key={b.id}
            value={b.value}
            className={classes.button}
            onClick={() => navigate(b.route)}
          >
            <div className={classes.buttonContainer}>
              {b.icon}
              <Typography className={classes.text}> {b.label}</Typography>
            </div>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Outlet></Outlet>
    </Container>
  );
};

export default Leftbar;
