import React, { useState, useEffect } from 'react';
import { Typography, Container, Breadcrumbs, Box, Button } from '@material-ui/core';
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
      console.log('state.colors.data: ', state.colors.data);
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
        Header: 'Sample',
        options: {
          filter: false,
          sort: false,
        },
        Cell: ({ value, row }) => {
          const colorStyle = row.original.gradient ? 
            {
              background: `linear-gradient(180deg, ${row.original.display_color_code} 0%, #000000 100%)`
            } : 
            {
              backgroundColor: value
            };
      
          return (
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div style={{
                ...colorStyle,
                width: '5rem',
                height: '5rem',
                borderRadius: '50%',
                boxShadow: 'inset rgba(0, 0, 0, 0.2) -2px 1px 3px 1px, inset rgba(255, 255, 255, 0.5) 2px 1px 3px 1px',
              }} />
            </div>
          );
        },
      },      
      {accessor: 'actions',
        Header: '',
      Cell: ({row}) => (
        <div 
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
    <Container
        maxWidth="lg"
        style={{ paddingTop: '3rem', paddingBottom: '4rem' }}
      >
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
        <Button color="inherit" disabled>Settings</Button>
        <Button color="inherit" disabled>Colors</Button>
      </Breadcrumbs>
      <Box style={{display: 'flex', justifyContent: 'space-between', marginBottom: '3rem'}}>
        <Typography variant="h4">Colors</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('new/')}>Add New</Button>
      </Box>
      {colors.loading ? (
        <CircularProgress />
      ) : colors.length > 0 ? (
        <DataTable key={colors.length} columns={columns} data={colors} />
      ) : (
        <p>No colors found</p>
      )}
    </Container>
  );
};

export default ColorsPage;