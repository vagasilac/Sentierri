import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchColors } from '../../features/colors/colorsSlice';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StartIcon from '@mui/icons-material/Start';
import EditIcon from '@mui/icons-material/Edit';

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
      {
        accessor: 'display_color_code',
        Header: 'Color Code',
        options: {
          filter: false,
          sort: false,
        },
        Cell: ({ value }) => (
          <div style={{ backgroundColor: value,
            width: '100px',
            height: '100px',
            borderRadius: '25%',
           }} />
        ),
      },
      {accessor: 'actions',
        Header: '',
      Cell: ({row}) => (
        <div>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => navigate(`${row.original.id}`)}>
              <EditIcon />
          </Button>
        </div>
      )},
  ];

  return (
    <Container >
      <Box style={{width: '100%', marginTop: '3rem', marginLeft: '3rem'}}>
        <Box style={{display: 'flex', justifyContent: 'space-between', marginBottom: '3rem'}}>
          <Typography variant="h4">Colors</Typography>
          <Button
            variant="contained"
            color="primary"
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
    </Container>
  );
};

export default ColorsPage;