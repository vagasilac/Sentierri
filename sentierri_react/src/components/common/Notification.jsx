import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

const Notification = ({ open, onClose, message, type }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

// This Notification component takes in open, onClose, message, and type props.
// The open prop determines whether the notification is visible or not.
// The onClose prop is a function that’s called when the user closes the notification.
// The message prop specifies the message to display in the notification.
// The type prop specifies the style of the notification (e.g., 'success', 'warning', 'error').