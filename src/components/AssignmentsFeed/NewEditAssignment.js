import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import NewAssignmentForm from "./NewAssignmentForm";

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

function NewEditApprentice({
  onAddedAssignment,
  onEditedAssignment,
  buttonName,
  assignmentInfo,
  fromBatchID,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newAssignmentHandler = (newAssignment, batchID) => {
    onAddedAssignment(newAssignment, batchID);
    setOpen(false);
  };

  const editAssignmentHandler = (editedAssignment, assignmentID) => {
    onEditedAssignment(editedAssignment, assignmentID);
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
          <NewAssignmentForm
            onNewAssignment={newAssignmentHandler}
            onEditAssignment={editAssignmentHandler}
            assignmentInfo={assignmentInfo}
            fromBatchID={fromBatchID}
          />
        </Box>
      </Modal>
    </>
  );
}

export default NewEditApprentice;
