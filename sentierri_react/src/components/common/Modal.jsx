import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const Modal = ({ open, onClose, title, children, actions }) => {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;

// This Modal component takes in open, onClose, title, children, and actions props.
// The open prop determines whether the modal is open or not.
// The onClose prop is a function that’s called when the user closes the modal.
// The title prop sets the title of the modal.
// The children prop specifies the content to display in the modal.
// The actions prop is an array of objects representing the actions that can be performed in the modal.
// Each action object should have a label and an onClick property.