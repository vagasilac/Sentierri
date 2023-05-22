import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliers } from '../../features/suppliers/suppliersSlice';
import CircularProgress from '@mui/material/CircularProgress';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import StartIcon from '@mui/icons-material/Start';


// TODOs: 
// 1. Sort by isAgent doesn't work
// 2. Add grouping by category

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
      sticky: 'left',
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
    Header: () => (
      <Box>
        <Typography variant="body1"
          style={{fontWeight: 'bold'}}>Contact</Typography>
        <Typography variant="body1"
          style={{fontWeight: 'bold'}}>name 1</Typography>
      </Box>
    ),
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'contact_person_familyname',
    Header: () => (
      <Box>
        <Typography variant="body1"
          style={{fontWeight: 'bold'}}>Contact</Typography>
        <Typography variant="body1"
          style={{fontWeight: 'bold'}}>name 2</Typography>
      </Box>
    ),
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
    Header: () => (
      <Box>
        <Typography variant="body1"
          style={{fontWeight: 'bold'}}>Lead</Typography>
        <Typography variant="body1"
          style={{fontWeight: 'bold'}}>Time</Typography>
      </Box>
    ),
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
    <Box style={{width: '88%', marginTop: '20px', boxSizing: 'border-box'}}>
      <Box style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h4">Suppliers</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{marginRight: '10rem'}}
          onClick={() => navigate('/suppliers/new')}>Add New</Button>
      </Box>
      {suppliers.loading ? (
        <CircularProgress />
      ) : suppliers.length > 0 ? (
        <div style={{ overflowX: 'auto', width: '100%', position: 'relative', maxWidth: '100%' }}>
          <DataTable key={suppliers.length} columns={columns} data={suppliers} />
        </div>
      ) : (
        <p>No suppliers found</p>
      )}
    </Box>
  );
};

export default SuppliersPage;