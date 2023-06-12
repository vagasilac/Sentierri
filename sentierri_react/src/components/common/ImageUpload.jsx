import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useUploadFileMutation } from '../../features/apiSlice';

export default function ImageUpload() {
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));

    try {
      await uploadFile(file).unwrap();
      // handle success here, e.g., show a success message
      alert('File uploaded successfully');

    } catch (error) {
      // handle error here, e.g., show an error message
        alert('Error uploading the file');
    }
  };

  return (
    <>
      {selectedFile && <img src={selectedFile} alt="uploaded image" />}
      <Button variant="contained" component="label" disabled={isLoading}>
        Upload Image
        <input type="file" hidden onChange={handleUpload} />
      </Button>
    </>
  );
}
