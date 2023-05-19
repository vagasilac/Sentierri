import React from 'react';
import { TextField } from '@material-ui/core';

const TextArea = ({ label, value, onChange, error, helperText }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      multiline
    />
  );
};

export default TextArea;

// This TextArea component takes in the same props as the Input component
// (label, value, onChange, error, and helperText) and works in a similar way.
// The only difference is that it has the multiline prop set to true, which makes it a multi-line text input.