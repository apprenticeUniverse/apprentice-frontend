import React, { useState } from "react";

import { Box, Button, Modal, Typography } from "@mui/material";
import StatusForm from "./StatusForm";

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

const NewStatus = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newStatusHandler = (newStatus) => {
    props.onAddedStatus(newStatus);
    console.log(newStatus);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Status</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Daily Status
          </Typography>
          <StatusForm onNewStatus={newStatusHandler} />
        </Box>
      </Modal>
    </div>
  );
};

export default NewStatus;
