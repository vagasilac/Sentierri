import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { useNavigate } from 'react-router-dom';


export default function BasicSpeedDial({actions}) {
  console.log('actions: ', actions);
  const navigate = useNavigate();
  return (
    // <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial"
        style={{
          sticky: 'bottom',
          position: 'fixed',
          right: '20px',
          bottom: '20px',
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => navigate(action.link)}
          />
        ))}
      </SpeedDial>
    // </Box>
  );
}