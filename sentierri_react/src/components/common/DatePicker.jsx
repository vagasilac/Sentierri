import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DatePicker = ({ label, value, onChange }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="MM/dd/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;

// This DatePicker component takes in label, value, and onChange props.
// The label prop sets the label for the date picker.
// The value and onChange props control the selected date of the date picker and how it changes.