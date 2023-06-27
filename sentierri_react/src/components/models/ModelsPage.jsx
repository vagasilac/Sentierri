import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Button } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliers } from '../../features/suppliers/suppliersSlice';
import CircularProgress from '@mui/material/CircularProgress';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import StartIcon from '@mui/icons-material/Start';

const ModelsPage = () => {
  const models = useSelector(state => state.models.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  // columns for react-table
  const columns = [
    { accessor: 'name',
      Header: 'Name',
      options: {
        filter: true,
        sort: true,
      }},
    { Header: 'Actions',
          Cell: ({row}) => (
            <div>
              <Button 
                variant="contained"
                color="primary"
                onClick={() => navigate(`/models/${row.original.id}`)}>
                  <StartIcon />
              </Button>
            </div>
          )
      }
  ];

  return (
    <Container
        maxWidth="xl"
        style={{ paddingTop: '3rem', paddingBottom: '4rem', }}
      >
      <Box style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography
            variant="h4"
            style={{ marginBottom: '2rem' }}
          >Models</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{marginBottom: '2rem'}}
          onClick={() => navigate('/models/new')}>Add New</Button>
      </Box>
      {models.loading ? (
        <CircularProgress />
      ) : models.length > 0 ? (
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <DataTable key={models.length} columns={columns} data={models}
          />
      </div>
      ) : (
        <p>No models found</p>
      )}
    </Container>
  );
};

export default ModelsPage;
