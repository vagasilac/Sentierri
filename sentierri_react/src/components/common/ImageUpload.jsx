import React, { useState } from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { useUploadFileMutation } from '../../features/apiSlice';

export default function ImageUpload({ title }) {
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));

    let formData = new FormData();
    formData.append('file', file);

    try {
      await uploadFile(formData).unwrap();
      alert('File uploaded successfully');
    } catch (error) {
      alert('Error uploading the file');
    }
  };

  return (
    <Paper 
      elevation={3}
      style={{ width: '100%', height: 'auto', padding: '2rem' }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {selectedFile ? (
        <img 
          src={selectedFile} 
          style={{ width: '100%', height: 'auto' }}
          alt="uploaded image" 
        />
      ) : (
        <img 
          src="https://via.placeholder.com/100"
          style={{ width: '100%', height: 'auto' }}
          alt="placeholder image" 
        />
      )}
      <Button variant="contained" component="label" disabled={isLoading}
        style={{ marginTop: '1rem' }}
      >
        Upload Image
        <input type="file" hidden onChange={handleUpload} />
      </Button>
    </Paper>
  );
}
