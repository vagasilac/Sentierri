import React, { useState, useEffect } from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../features/fileUpload/fileUploadSlice';
import CircularProgress from '@mui/material/CircularProgress';

export default function ImageUpload({ fileUrlRead, title, uploaded }) {
  const dispatch = useDispatch();
  const { loading, fileUrl } = useSelector((state) => state.fileUpload);
  console.log('ImageUpload state.fileUpload', useSelector((state) => state.fileUpload));
  console.log('ImageUpload fileuploaded', uploaded);
  console.log('loading', loading);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    dispatch(uploadFile(file));
    event.target.value = null;

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
        fileUrlRead ? (
          <img
            src={fileUrlRead}
            style={{ width: '100%', height: 'auto' }}
            alt="uploaded image"
          />
        ) :
          loading ? (
            <CircularProgress />
          ) : (
            <img 
              src="https://via.placeholder.com/100"
              style={{ width: '100%', height: 'auto', margin: 'auto' }}
              alt="placeholder image" 
            />
          )
      )}
      <Button variant="contained" component="label" disabled={loading}
        style={{ marginTop: '1rem' }}
      >
        {uploaded ? 'Change Image' : 'Upload Image'}
        <input type="file" hidden onChange={handleUpload} />
      </Button>
    </Paper>
  );
}
