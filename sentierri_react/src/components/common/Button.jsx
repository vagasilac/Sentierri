import React from 'react';
import { Button as MuiButton } from '@material-ui/core';

const Button = ({ children, ...props }) => {
   return <MuiButton {...props}>{children}</MuiButton>;
};

export default Button;
