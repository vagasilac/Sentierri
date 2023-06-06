import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUMs } from '../../features/UM/UMSlice';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StartIcon from '@mui/icons-material/Start';
import EditIcon from '@mui/icons-material/Edit';

const UMsPage = () => {
  const UMs = useSelector(state => {
    try {
      console.log('state.UMs.data: ', state.UMs.data);
      return state.UMs.data.map(UM => ({
        ...UM,
      }));
    } catch (error) {
      console.error('Error transforming UMs data:', error);
      return [];
    }
  });  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUMs());
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
    { accessor: 'abbreviation',
      Header: 'Abbreviation',
      options: {
        filter: true,
        sort: true,
      }},
      {
        accessor: 'actions',
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
    <Container >
      <Box style={{width: '100%', marginTop: '3rem', marginLeft: '3rem'}}>
        <Box style={{display: 'flex', justifyContent: 'space-between', marginBottom: '3rem'}}>
          <Typography variant="h4">UMs</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('new/')}>Add New</Button>
        </Box>
        {UMs.loading ? (
          <CircularProgress />
        ) : UMs.length > 0 ? (
          <DataTable key={UMs.length} columns={columns} data={UMs} />
        ) : (
          <p>No UMs found</p>
        )}
      </Box>
    </Container>
  );
}

export default UMsPage;