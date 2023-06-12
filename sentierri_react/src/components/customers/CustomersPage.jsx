import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, Breadcrumbs } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from '../../features/customers/customersSlice';
import CircularProgress from '@mui/material/CircularProgress';
import AddBoxIcon from '@mui/icons-material/AddBox';

const CustomersPage = () => {
  const customers = useSelector(state => {
    try {
        return state.customers.data.map(customer => ({
            ...customer,
            shops: customer.shops ? customer.shops.map(shop => shop.name).join(', ') : ''
          }));          
    } catch (error) {
      console.error('Error transforming customers data:', error);
      return [];
    }
  });  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCustomers());
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
    { accessor: 'email',
      Header: 'Email',
      options: {
        filter: true,
        sort: true,
      }},
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
    { accessor: 'swift',
      Header: 'Swift',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'iban',
      Header: 'IBAN',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'shops',
        Header: 'Shops',
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
            onClick={() => navigate(`/customers/${row.original.id}`)}
          >
            View
          </Button>
        </div>
      ),
      options: {
        filter: false,
        sort: false,
      }},
  ];

  return (

    <Container
          maxWidth="xl"
          style={{ paddingTop: '3rem', paddingBottom: '4rem', marginLeft: '3rem', overflowX: 'auto' }}
        >
          <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
            <Button color="inherit" disabled>CRM</Button>
            <Button color="inherit" disabled>Customers</Button>
          </Breadcrumbs>
          <Box>
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography
                variant="h4"
                style={{ marginBottom: '2rem' }}
              >
                Customers</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{marginBottom: '2rem'}}
                  onClick={() => navigate('/customers/new')}>Add New</Button>
            </Box>
            {customers.length > 0 ? (
              <DataTable
                data={customers}
                columns={columns}
                options={{
                  filter: true,
                  sort: true,
                  search: true,
                  print: true,
                  download: true,
                  rowHover: true,
                  responsive: true,
                  selectableRows: false,
                  pagination: true,
                  paginationServer: false,
                  menu: true,
                  theadColor: 'blue',
                  theadFontColor: 'white',
                  tbodyFontColor: 'gray',
                  tbodyColor: 'white',
                  rightBorder: false,
                  leftBorder: false,
                }}
              />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Container>
  );
};

export default CustomersPage;
