import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import NewUserForm from "./NewUserForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NewEditUser({
  onAddedUser,
  onAddedApprentice,
  onEditedUser,
  buttonName,
  userInfo,
  fromBatchID,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newUserHandler = (newUser, batchID) => {
    onAddedUser(newUser, batchID);
    setOpen(false);
  };

  const newApprenticeHandler = (newApprentice, batchID) => {
    onAddedApprentice(newApprentice, batchID);
    setOpen(false);
  };

  const editUserHandler = (editedUser, userID) => {
    onEditedUser(editedUser, userID);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        {buttonName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {buttonName}
          </Typography>
          <NewUserForm
            onNewUser={newUserHandler}
            onAddApprentice={newApprenticeHandler}
            onEditUser={editUserHandler}
            userInfo={userInfo}
            fromBatchID={fromBatchID}
          />
        </Box>
      </Modal>
    </>
  );
}

export default NewEditUser;
