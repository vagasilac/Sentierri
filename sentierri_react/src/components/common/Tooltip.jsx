import React, { useState } from 'react';
import { Tooltip } from '@material-ui/core';

function Tooltip() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Tooltip
      title="Additional Information"
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <div>Hover over me!</div>
    </Tooltip>
  );
}

export default Tooltip;

// Tooltip component from @material-ui/core.
// The Tooltip component displays additional information when the user hovers over the div element.
// The open, onOpen, and onClose props of the Tooltip component are used to control when the additional information is displayed.