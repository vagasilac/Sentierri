import React, { useState, useEffect } from 'react';
import { Typography, Breadcrumbs,Box, Paper, Container, Button } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import StartIcon from '@mui/icons-material/Start';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import NewCategory from './NewCategory';

const Categories = () => {
  const categories = useSelector(state => {
    try {
      return state.categories.data.map(category => ({
        id: category.id,
        name: category.name,
        abbreviation: category.abbreviation,
      }));
    } catch (error) {
      console.error('Error transforming suppliers data:', error);
      return [];
    }
  });  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
    // dispatch(fetchSupplierCategories());
  }, [dispatch]);

  // columns for react-table
  const columns = [
    { accessor: 'name',
      Header: 'Category Name',
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
    { Header: 'Actions',
      Cell: ({row}) => (
        <div>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => navigate(`/settings/categories/${row.original.id}`)}>
              <StartIcon />
            </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => console.log(`Delete ${row.original.supplier_id}`)}>Delete</Button> */}
        </div>
      )
  }
  ];

  const handleNewCategory = () => {
    dispatch(fetchCategories());
  };

  return (
    <Container
        maxWidth="lg"
        style={{ paddingTop: '3rem', paddingBottom: '4rem' }}
      >
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
          <Button color="inherit" disabled>Settings</Button>
          <Button color="inherit" disabled>Categories</Button>
        </Breadcrumbs>
        <Typography
            variant="h4"
            style={{ marginBottom: '2rem' }}
          >Categories</Typography>
        <Box style={{ flexGrow: 1, display:'flex' }} >
          <Paper
            elevation={3}
            style={{ width: '100%' }}

          >
            {categories.loading ? (
              <CircularProgress />
            ) : categories.length > 0 ? (
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <DataTable key={categories.length} columns={columns} data={categories}
                />
            </div>
            ) : (
              <p>No categories found</p>
            )}
          </Paper >
          <NewCategory onNewCategory={handleNewCategory} />
      </Box>
    </Container>
  );
};

export default Categories;