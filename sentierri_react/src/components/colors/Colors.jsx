import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchColors } from '../../features/colors/colorsSlice';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StartIcon from '@mui/icons-material/Start';

const ColorsPage = () => {
  const colors = useSelector(state => {
    try {
      return state.colors.data.map(color => ({
        ...color,
      }));
    } catch (error) {
      console.error('Error transforming colors data:', error);
      return [];
    }
  });  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchColors());
    // dispatch(fetchColorCategories());
  }, [dispatch]);

  // columns for react-table
  const columns = [
    { accessor: 'name_en',
      Header: 'Name (EN)',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'name_ro',
      Header: 'Name (RO)',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'display_color_code',
      Header: 'Color Code',
      options: {
        filter: false,
        sort: false,
      }
    },
  ];

  return (
    <Box style={{width: '100%', marginTop: '3rem', marginLeft: '3rem'}}>
      <Box style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h4">Colors</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{marginRight: '10rem'}}
          onClick={() => navigate('/colors/new')}>Add New</Button>
      </Box>
      {colors.loading ? (
        <CircularProgress />
      ) : colors.length > 0 ? (
        <DataTable key={colors.length} columns={columns} data={colors} />
      ) : (
        <p>No colors found</p>
      )}
    </Box>
  );
};

export default ColorsPage;