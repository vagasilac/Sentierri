import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Button } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliers } from '../../features/suppliers/suppliersSlice';
import CircularProgress from '@mui/material/CircularProgress';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import StartIcon from '@mui/icons-material/Start';


// TODOs: 
// 1. Sort by isAgent doesn't work
// 2. Overflowing table
// 3. Add grouping by category

const SuppliersPage = () => {
  const suppliers = useSelector(state => {
    try {
      return state.suppliers.data.map(supplier => ({
        ...supplier,
        categories: supplier.categories.map(category => category.name).join(', ')
      }));
    } catch (error) {
      console.error('Error transforming suppliers data:', error);
      return [];
    }
  });  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSuppliers());
    // dispatch(fetchSupplierCategories());
  }, [dispatch]);

  // columns for react-table
  const columns = [
    { accessor: 'name',
      Header: 'Name',
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
    { accessor: 'isAgent',
      Header: 'Agent?',
      Cell: ({value}) => value ? 'Yes' : 'No',
      options: {
        filter: true,
        sort: true,
      }
    },
    { accessor: 'associatedEntity',
      Header: 'Associated Entity',
      Cell: ({ value }) => Array.isArray(value) ? value.join(', ') : value || 'None',
      options: {
        filter: true,
        sort: true,
      }
    },
    { accessor: 'telephone',
      Header: 'Telephone',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'street_address_1',
      Header: 'Address',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'city',
      Header: 'City',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'zip',
      Header: 'Zip',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'county',
      Header: 'County',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'country',
      Header: 'Country',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'vat',
      Header: 'VAT',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'reg_com',
      Header: 'Nr Reg Com',
      options: {
        filter: true,
        sort: true,
      }},
      { accessor: 'contact_person_firstname',
      Header: 'Contact name 1',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'contact_person_familyname',
      Header: 'Contact name 2',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'email',
      Header: 'Email',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'lead_time',
      Header: 'Lead time (days)',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'categories',
        Header: 'Categories',
        options: {
          filter: true,
          sort: true,
          canGroupBy: false,
        }},
    { Header: 'Actions',
      Cell: ({row}) => (
        <div>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => navigate(`/suppliers/${row.original.id}`)}>
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

  return (
    <Container
        maxWidth="xl"
        style={{ paddingTop: '3rem', paddingBottom: '4rem', overflowX: 'hidden' }}
      >
      <Box style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography
            variant="h4"
            style={{ marginBottom: '2rem' }}
          >Suppliers</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{marginBottom: '2rem'}}
          onClick={() => navigate('/suppliers/new')}>Add New</Button>
      </Box>
      {suppliers.loading ? (
        <CircularProgress />
      ) : suppliers.length > 0 ? (
      <div style={{ overflowX: 'auto' }}>
        <DataTable key={suppliers.length} columns={columns} data={suppliers}
          />
      </div>
      ) : (
        <p>No suppliers found</p>
      )}
    </Container>
  );
};

export default SuppliersPage;