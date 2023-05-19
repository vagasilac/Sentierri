import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const Radio = ({ label, value, onChange, options }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup value={value} onChange={onChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Radio;

// This RadioComponent takes in label, value, onChange, and options props.
// The label prop sets the label for the radio group.
// The value and onChange props control the selected value of the radio group and how it changes.
// The options prop is an array of objects representing the options in the radio group.
// Each option object should have a value and a label property.