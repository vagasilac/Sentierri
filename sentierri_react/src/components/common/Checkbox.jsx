import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={label}
    />
  );
};

export default Checkbox;

// This CheckboxComponent takes in label, checked, and onChange props.
// The label prop sets the label for the checkbox.
// The checked and onChange props control the checked state of the checkbox and how it changes.