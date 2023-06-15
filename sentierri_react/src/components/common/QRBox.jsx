import React, { useState } from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import QRCode from 'qrcode.react';

export default function QRBox({ title, barcode }) {

  return (
    <Paper 
      elevation={3}
      style={{ width: '100%', height: 'auto', padding: '2rem' }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <QRCode value={barcode}
        style={{ width: '100%', height: 'auto', margin: 'auto' }}
      />
      <Button variant="contained" component="label"
        style={{ marginTop: '1rem' }}
      >
        Print QR Code
      </Button>
    </Paper>
  );
}
