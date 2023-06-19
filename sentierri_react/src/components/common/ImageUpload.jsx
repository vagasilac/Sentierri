import React, { useState } from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../features/fileUpload/fileUploadSlice';

export default function ImageUpload({ title }) {
  const dispatch = useDispatch();
  const { loading, fileUrl } = useSelector((state) => state.fileUpload);



  const handleUpload = async (event) => {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append('myFile', file);
    let myFile = formData.get('myFile');
    console.log('myFile name', myFile.name);
    dispatch(uploadFile(formData));    
  }

  return (
    <Paper 
      elevation={3}
      style={{ width: '100%', height: 'auto', padding: '2rem' }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {fileUrl ? (
        <img 
          src={fileUrl}
          style={{ width: '100%', height: 'auto' }}
          alt="uploaded image" 
        />
      ) : (
        <img 
          src="https://via.placeholder.com/100"
          style={{ width: '100%', height: 'auto', margin: 'auto' }}
          alt="placeholder image" 
        />
      )}
      <Button variant="contained" component="label" disabled={loading}
        style={{ marginTop: '1rem' }}
      >
        Upload Image
        <input type="file" hidden onChange={handleUpload} />
      </Button>
    </Paper>
  );
}
