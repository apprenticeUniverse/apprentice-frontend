import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Container,
  Box,
} from "@mui/material";
import withStyles from "@material-ui/core/styles/withStyles";
import api from "../API/baseURL";
import * as url from "../API/urls";
import jwtDecode from "jwt-decode";
import { addTokenData, addUserID, addUserInfo } from "../store/actions";
import addUserId from "../store/reducers/userId";

const styles = (theme) => ({
  main: {
    width: "100%",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  container: {
    width: "50%",
  },
});
function Login(props) {
  const navigate = useNavigate();
  const { classes } = props;
  const dispatch = useDispatch();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const tokenData = useSelector((state) => state.tokenData);
  const userInfo = useSelector((state) => state.userData);
  const userId = useSelector((state) => state.userId);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (localStorage.getItem("SavedToken") === null) {
      api
        .post(url.LOGIN_AUTH, {
          emailAddress: emailAddress,
          password: password,
        })
        .then((response) => {
          let token = response.data.token;
          localStorage.setItem("SavedToken", token);
          const logginData = jwtDecode(token);
          dispatch(addTokenData(logginData));
          const currentRole = logginData.role[0].authority;

          if (currentRole === "APPRENTICE") {
            navigate("/app/dashboard/", { replace: true });
            navigate(0);
          } else if (currentRole === "STAKEHOLDER") {
            navigate("/app/stakeholder/dashboard/", { replace: true });
            navigate(0);
          } else if (currentRole === "ADMIN" || currentRole === "SUPER_ADMIN") {
            navigate("/app/admin/users", { replace: true });
            navigate(0);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <main className={classes.main}>
      <Container className={classes.container}>
        <Box width={"50%"} textAlign="center" margin={"auto"} marginTop={"25%"}>
          <Typography component="h1" variant="h5">
            Apprentice Universe
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={onSubmitHandler} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                onChange={(e) => setEmailAddress(e.target.value)}
                name="email"
                autoComplete="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Box>
      </Container>
    </main>
  );
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);
