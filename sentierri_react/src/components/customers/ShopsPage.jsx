import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Container, Breadcrumbs } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShops } from '../../features/shops/shopsSlice';
import { fetchCustomers } from '../../features/customers/customersSlice';
import CircularProgress from '@mui/material/CircularProgress';
import StartIcon from '@mui/icons-material/Start';

let customerNameMap = {};

const ShopsPage = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchShops());
        dispatch(fetchCustomers());
    }, [dispatch]);
    

    const shops = useSelector(state => {
        try {
            console.log('state.shops.data:', state.shops.data);
            return state.shops.data.map(shop => ({
                ...shop,
                parentCustomerId: customerNameMap[shop.parentCustomerId] || 'N/A',
            }));
        } catch (error) {
            console.error('Error transforming shops data:', error);
            return [];
        }
    });

    const customers = useSelector(state => {
        try {
            console.log('state.customers.data:', state.customers.data);
            return state.customers.data.map(customer => ({
                ...customer,
            }));
        } catch (error) {
            console.error('Error transforming customers data:', error);
            return [];
        }
    });

    useEffect(() => {
        customers.forEach(customer => {
        customerNameMap[customer.id] = customer.name;
        });
    }, [customers]);

    console.log('customers:', customers);

    const navigate = useNavigate();

    const columns = [
        {
            accessor: 'name',
            Header: 'Name',
            options: {
                filter: true,
                sort: true,
        }},
        {
            accessor: 'parentCustomerId',
            Header: 'Parent Customer',
            options: {
                filter: true,
                sort: true,
        }},
        {
            accessor: 'telephone',
            Header: 'Telephone',
            options: {
                filter: true,
                sort: true,
        }},
        {
            accessor: 'street_address_1',
            Header: 'Street Address 1',
            options: {
                filter: true,
                sort: true,
        }},
        {
            accessor: 'street_address_2',
            Header: 'Street Address 2',
            options: {
                filter: true,
                sort: true,
        }},
        {
            accessor: 'city',
            Header: 'City',
            options: {
                filter: true,
                sort: true,
        }},
        {
            accessor: 'zip',
            Header: 'Zip',
            options: {
                filter: true,
                sort: true,
        }},
        {
            accessor: 'county',
            Header: 'County',
            options: {
                filter: true,
                sort: true,
        }},
        {
            accessor: 'country',
            Header: 'Country',
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
              onClick={() => navigate(`/shops/${row.original.id}`)}>
                <StartIcon />
              </Button>
          </div>
        )
    }
    ];

    return (
        <Container
            maxWidth="xl"
            style={{ paddingTop: '3rem', paddingBottom: '4rem', marginLeft: '3rem', overflowX: 'auto' }}
            >
            <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem', marginLeft: '3rem' }}>
                <Button color="inherit" disabled>CRM</Button>
                <Button color="inherit" disabled>Shops</Button>
            </Breadcrumbs>
            <Box style={{ marginLeft: '3rem', }}>
                <Box style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem'}}>
                    <Typography variant="h4" component="div">
                        Shops
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/shops/new`)}
                    >
                        Add Shop
                    </Button>
                </Box>
                {/* if shops is not empty */}
                {shops.length > 0 ? (    
                    <DataTable
                        columns={columns}
                        data={shops}
                    />
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default ShopsPage;
