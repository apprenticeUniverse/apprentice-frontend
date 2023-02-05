import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NewUserPassword({ onNewPassword, buttonName }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onNewUserPassword = (event) => {
    event.preventDefault();
    onNewPassword(password);
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
          <Box component="form" onSubmit={onNewUserPassword} width="100%">
            <FormControl variant="standard">
              <Box marginTop={2}>
                <TextField
                  name="password"
                  label="Password"
                  placeholder="Type new password"
                  value={password}
                  required={true}
                  onChange={handlePassword}
                  fullWidth
                ></TextField>
              </Box>
              <br />
              <Button
                size="small"
                color="secondary"
                variant="contained"
                disabled={password == 6}
                type="submit"
                sx={{ mt: 1, mr: 1 }}
              >
                Send
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default NewUserPassword;
