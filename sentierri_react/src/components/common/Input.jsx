import React from 'react';
import { TextField } from '@material-ui/core';

const Input = ({ label, value, onChange, error, helperText }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default Input;

// This Input component takes in label, value, onChange, error, and helperText props.
// The label prop sets the label for the input.
// The value and onChange props control the value of the input and how it changes.
// The error prop determines whether the input is in an error state or not.
// The helperText prop sets the helper text displayed below the input, which can be used to display error messages.