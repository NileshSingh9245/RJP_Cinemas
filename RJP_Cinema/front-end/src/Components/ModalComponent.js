import React, { useContext } from "react";
import BsContext from "../Context/BsContext";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// Modal which takes two props (heading and message), this is called using function showMsg of context.
function Modal(props) {
  const context = useContext(BsContext);
  const { errorPopup, errorMessage, setErrorPopup, setErrorMessage } = context;

  //setting errorPopup to false and errorMessage to "" on close modal
  const handleClosePopup = () => {
    setErrorMessage("");
    setErrorPopup(false);
  };

  return (
    <Dialog open={errorPopup} onClose={handleClosePopup}>
      <DialogTitle>Message</DialogTitle>
      <DialogContent>
        <Typography>{errorMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosePopup} variant="contained" color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;