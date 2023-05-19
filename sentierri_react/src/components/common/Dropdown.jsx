import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const Dropdown = ({ label, value, onChange, options }) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;

// This Dropdown component takes in label, value, onChange, and options props.
// The label prop sets the label for the dropdown.
// The value and onChange props control the selected value of the dropdown and how it changes.
// The options prop is an array of objects representing the options in the dropdown.
// Each option object should have a value and a label property.