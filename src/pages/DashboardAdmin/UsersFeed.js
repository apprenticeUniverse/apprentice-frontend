import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Divider, Typography, Button, Box } from "@mui/material";
import { Grid, makeStyles, Container } from "@material-ui/core";

import api from "../../API/baseURL";
import * as url from "../../API/urls";
import NewEditUser from "../../components/UsersFeed/NewEditUser";
import DataTable from "../../components/DataTables/DataTable";

const useStyles = makeStyles(() => ({}));

function UsersFeed() {
  const classes = useStyles();
  const [usersData, setUsersData] = useState([]);

  // Table columns definition
  const columns = [
    {
      field: "id",
      headerName: "Details",
      width: 300,
      renderCell: (params) => (
        <>
          <Grid container>
            <Grid item xs={12} md={12} xl={6}>
              <Box marginTop={1} textAlign="center">
                <NavLink to={`/app/user/${params.value}`}>
                  <Button variant="contained">Details</Button>
                </NavLink>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} xl={6}>
              <Box marginTop={1} textAlign="center">
                <NewEditUser
                  onEditedUser={editUser}
                  buttonName="Edit User"
                  userInfo={usersData.find((x) => x.id === params.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      ),
    },
    { field: "firstName", headerName: "Name", width: 150 },
    { field: "lastName", headerName: "LastName", width: 150 },
    { field: "emailAddress", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
  ];

  // GET USERS
  const fetchUserData = async () => {
    try {
      const response = await api.get(url.GET_ALL_USERS);
      setUsersData(response.data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // POST USER

  const addUser = async (newUser) => {
    try {
      const response = await api.post(url.POST_NEW_USER, newUser);
      setUsersData(usersData.concat(response.data));
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  // POST USER APPRENTICE
  const addApprentice = async (newUser, batchID) => {
    try {
      const response = await api.post(
        url.postNewUserAndAddToBatch(batchID),
        newUser
      );
      setUsersData(usersData.concat(response.data));
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  // PUT USER

  const editUser = async (editedUser, userID) => {
    try {
      const response = await api.put(url.putUser(userID), editedUser);
      setUsersData(
        usersData.map((obj) =>
          obj.id === response.data.id ? response.data : obj
        )
      );
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };
  return (
    <Container className={classes.container}>
      <Box marginBottom={2} marginTop={2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" className={classes.feedTitle}>
              Users in database
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <NewEditUser
              onAddedUser={addUser}
              onAddedApprentice={addApprentice}
              buttonName="New User"
            />
          </Grid>
        </Grid>
      </Box>

      <Divider></Divider>
      <Box marginBottom={2} marginTop={2}>
        <Typography variant="p">
          In this page all users currently in the database are presented.
        </Typography>
      </Box>

      {usersData.length === 0 ? (
        "No data available"
      ) : (
        <DataTable tableData={usersData} columns={columns} />
      )}
    </Container>
  );
}

export default UsersFeed;
