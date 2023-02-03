import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import NewBatchForm from "./NewBatchForm";

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

function NewEditBatch({ onAddedBatch, onEditedBatch, buttonName, batchInfo }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newBatchHandler = (newbatch) => {
    onAddedBatch(newbatch);
    setOpen(false);
  };

  const editBatchHandler = (editedbatch, batchID) => {
    onEditedBatch(editedbatch, batchID);
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
          <NewBatchForm
            onNewBatch={newBatchHandler}
            onEditBatch={editBatchHandler}
            batchInfo={batchInfo}
          />
        </Box>
      </Modal>
    </>
  );
}

export default NewEditBatch;
