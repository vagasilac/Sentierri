import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({options, label, isRow}) {
    console.log('options', options);
    console.log('label', label);

    return (
        <Autocomplete
            disablePortal
            // if isRow is true, then it should be multiple
            { ...isRow ? multiple : null }
            id="combo-box"
            options={options}
            renderInput={(params) =>
                <TextField {...params} label={label} variant="standard"
            />}
        />
    );
}