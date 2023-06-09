import React, { useState, useEffect } from 'react';
import { Paper, Button, Box, Typography, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, clearFileUrl } from '../../features/fileUpload/fileUploadSlice';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteMaterialLabelUrl } from '../../features/rawMaterials/rawMaterialsSlice';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// TODO:
// - preview image instead of actual image
// - only upload image when parent component is submitted

export default function ImageUpload({ fileUrlRead, title, uploaded, onImageDelete }) {
  const dispatch = useDispatch();
  const { loading, fileUrl } = useSelector((state) => state.fileUpload);
  console.log('ImageUpload state.fileUpload', useSelector((state) => state.fileUpload));
  console.log('ImageUpload fileuploaded', uploaded);
  console.log('loading', loading);
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    dispatch(uploadFile(file));
    if (!loading) {
      dispatch(clearFileUrl());
    }
  };

  const handleImageDelete = () => {
    setOpen(false);
    try
    {
      onImageDelete();
      fileUrlRead = null;
    }
    catch (err)
    {
      console.log('ImageUpload handleImageDelete error', err);
    }
  };

  return (
    <>
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
                <div 
                  style={{ display: 'flex', justifyContent: 'center', width: 'auto' }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <img 
                  src="https://placehold.co/200x200?text=Upload+image"
                  style={{ width: '100%', height: 'auto', margin: 'auto' }}
                  alt="placeholder image" 
                />
              )
          )}
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" component="label" disabled={loading}
            style={{ marginTop: '1rem' }}
          >
            {uploaded ?
              <ChangeCircleIcon /> :
              <DownloadForOfflineIcon style={{ transform: 'rotate(180deg)' }} />}
            <input type="file" hidden onChange={handleUpload} />
          </Button>
          <Button variant="contained" component="label" disabled={loading}
            style={{ marginTop: '1rem' }}
            onClick={handleClickOpen}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Image"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleImageDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
    </Dialog>
    </>
  );
}