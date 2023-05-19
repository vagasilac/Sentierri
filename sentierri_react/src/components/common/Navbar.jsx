import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

function Navbar({ brand, actions }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {brand}
        </Typography>
        {actions.map(action => (
          <Button key={action.label} color="inherit">
            {action.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

// This code creates a Navbar component that displays a horizontal navigation menu with branding
// and user actions using AppBar, Toolbar, Typography, and Button components from @material-ui/core.
// The brand prop is used to specify the branding text.
// The actions prop is used to specify the user actions.
// Each action should have a label property.