import React, { useState, useEffect } from "react";

import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Grid,
} from "@mui/material";

import api from "../../API/baseURL";
import * as url from "../../API/urls";

function NewUserForm({
  onNewUser,
  onEditUser,
  onAddApprentice,
  userInfo,
  fromBatchID,
}) {
  const [batchesData, setBatchesData] = useState([]);
  const [firstName, setFirstName] = useState(
    userInfo ? userInfo.firstName : ""
  );
  const [lastName, setLastName] = useState(userInfo ? userInfo.lastName : "");
  const [emailAddress, setEmailAddress] = useState(
    userInfo ? userInfo.emailAddress : ""
  );
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(userInfo ? userInfo.role : "APPRENTICE");
  const [batch, setBatch] = useState(fromBatchID ? { id: fromBatchID } : {});

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const emailAddressHandler = (event) => {
    setEmailAddress(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const roleHandler = (event) => {
    setRole(event.target.value);
  };

  const batchHandler = (event) => {
    setBatch(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const userObject = {
      firstName,
      lastName,
      emailAddress,
      password,
      role,
    };
    if (role === "APPRENTICE") {
      if (userInfo) {
        onEditUser(userObject, userInfo.id);
      } else {
        onAddApprentice(userObject, batch.id);
      }
    } else {
      if (userInfo) {
        onEditUser(userObject, userInfo.id);
      } else {
        onNewUser(userObject);
      }
    }
  };
  // GET BATCHES INFO
  const fetchBatchesData = async () => {
    try {
      const response = await api.get(url.GET_ALL_BATCHES);
      setBatchesData(response.data);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };
  useEffect(() => {
    fetchBatchesData();
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div>
        <TextField
          required
          id="firstName"
          label="First Name"
          defaultValue={firstName}
          onChange={firstNameHandler}
        />
        <TextField
          required
          multiline
          id="lastName"
          label="Last Name"
          defaultValue={lastName}
          onChange={lastNameHandler}
        />
        <TextField
          required
          multiline
          id="emailAddress"
          label="Email Address"
          defaultValue={emailAddress}
          onChange={emailAddressHandler}
        />
        {!userInfo && (
          <TextField
            required
            multiline
            id="password"
            label="Password"
            defaultValue={password}
            onChange={passwordHandler}
            helperText="Your password won't be stored"
          />
        )}
        <Grid container>
          {userInfo?.role !== "APPRENTICE" && (
            <>
              {!fromBatchID && (
                <>
                  {userInfo?.role !== "SUPER_ADMIN" && (
                    <Grid item xs={12} md={6}>
                      <InputLabel id="simple-select-label">Role</InputLabel>
                      <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={role}
                        label="Role"
                        onChange={roleHandler}
                      >
                        {!userInfo && (
                          <MenuItem value={"APPRENTICE"}>Apprentice</MenuItem>
                        )}
                        <MenuItem value={"STAKEHOLDER"}>Stakeholder</MenuItem>
                        <MenuItem value={"ADMIN"}>Admin</MenuItem>
                        <MenuItem value={"SUPER_ADMIN"}>Super Admin</MenuItem>
                      </Select>
                    </Grid>
                  )}

                  {role === "APPRENTICE" && (
                    <>
                      {batchesData.length === 0 ? (
                        <Box marginLeft={1} marginTop={1}>
                          <Alert severity="warning">
                            There aren't any active Batches, please create a new
                            one
                          </Alert>
                        </Box>
                      ) : (
                        <>
                          <Grid item xs={12} md={6}>
                            <InputLabel id="simple-select-label">
                              Batch
                            </InputLabel>
                            <Select
                              labelId="simple-select-label"
                              id="simple-select"
                              value={batch}
                              label="Batch"
                              onChange={batchHandler}
                            >
                              {batchesData.map((option) => (
                                <MenuItem value={option} key={option.id}>
                                  {option.batchName}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                          <Box marginLeft={1} marginTop={1}>
                            <Alert severity="warning">
                              Once you select a Batch the user can't be moved to
                              another Batch
                            </Alert>
                          </Box>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Grid>
        <Box marginTop={2} textAlign="center">
          <Button
            variant="contained"
            type="submit"
            disabled={
              userInfo
                ? false
                : (role === "APPRENTICE") & (Object.keys(batch).length === 0)
                ? true
                : false
            }
          >
            Submit
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default NewUserForm;
