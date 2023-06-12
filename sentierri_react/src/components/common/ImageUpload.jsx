import React from 'react';
import Button from '@mui/material/Button';

export default function ImageUpload() {
  const handleUpload = (event) => {
    const file = event.target.files[0];
    // handle the file here, e.g., send it to the server or read it in the client
  };

  return (
    // show uploaded image here
    <>
        <img src="" alt="uploaded image" />
        <Button variant="contained" component="label">
        Upload Image
        <input type="file" hidden onChange={handleUpload} />
        </Button>
    </>
  );
}
