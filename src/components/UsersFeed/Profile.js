import { Avatar, Box, Paper, Typography, Grid } from "@mui/material";

import React from "react";
import { useSelector } from "react-redux";
import NewUserPassword from "./NewPasswordForm";
import api from "../../API/baseURL";
import * as url from "../../API/urls";

const Profile = () => {
  const userInfo = useSelector((state) => state.userData);
  const getInitials = (object) => {
    let firstLetter = object.firstName.slice(0, 1);
    let secondLetter = object.lastName.slice(0, 1);

    return firstLetter + secondLetter;
  };
  // PUT NEW USER PASSWORD
  const newPasswordHandler = async (password) => {
    const formData = new FormData();
    formData.append("password", password);
    try {
      const response = await api.put(
        url.putUserPassword(userInfo.id),
        formData
      );
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        m: { xs: 2, md: 3 },
        p: { xs: 2, md: 3 },
        display: "flex",
        alignItems: "center",
      }}
    >
      {userInfo ? (
        <>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <Avatar sx={{ width: 56, height: 56 }}>
                {getInitials(userInfo)}
              </Avatar>
              <Box sx={{ marginLeft: 3 }}>
                <Typography variant="h6">
                  Welcome, {userInfo.firstName} {userInfo.lastName}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  {userInfo.emailAddress}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <Box marginLeft={"auto"}>
                <Typography fontSize={14} color="text.secondary">
                  Role:
                </Typography>
                <Typography fontSize={14}>{userInfo.role}</Typography>
                <Box marginTop={2}>
                  <NewUserPassword
                    onNewPassword={newPasswordHandler}
                    buttonName={"Change password"}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        "No Data"
      )}
    </Paper>
  );
};

export default Profile;
