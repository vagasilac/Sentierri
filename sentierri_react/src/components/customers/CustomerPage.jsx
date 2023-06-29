import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomers, updateCustomer } from '../../features/customers/customersSlice';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Tab, Tabs, Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, FormControlLabel, FormGroup, FormLabel, FormControl, FormHelperText } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { Breadcrumbs } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
}));
  

const CustomerPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const numId = Number(id);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const [formValues, setFormValues] = useState({
        name: '',
        abbreviation: '',
        email: '',
        telephone: '',
        street_address_1: '',
        street_address_2: '',
        city: '',
        zip: '',
        county: '',
        country: '',
        contact_person_firstname: '',
        contact_person_familyname: '',
        vat: '',
        reg_com: '',
        swift: '',
        iban: '',
        shops: [],
    });

    const categories = useSelector(state => state.categories.data);
    //   const customers = useSelector(state => state.customers.data);
    const customer = useSelector(state => state.customers.data.find(customer => customer.id === numId));

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchCategories());
            dispatch(fetchCustomers());
            dispatch(fetchAgentRelations());
        }
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (customer) {
            setFormValues(customer);
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCustomer(formValues));
        navigate('/customers');
    };

    const handleBack = () => {
        navigate('/customers');
    };

    return (
        <Container style={{ paddingBottom: '2rem', paddingTop: '3rem' }} >
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
                    <Button color="inherit" disabled>CRM</Button>
                    <Button color="inherit" onClick={handleBack}>Customers</Button>
                    <Button color="inherit" disabled>{formValues.name}</Button>
                </Breadcrumbs>
                <Button variant="contained" color="primary" onClick={handleBack}
                    style={{
                        marginBottom: '1rem',
                    }}
                    >
                    Back
                </Button>
            </Box>
            <Paper
                elevation={4}
                className={classes.paper}
                style={{ 
                    padding: '3rem',
                    marginVertical: '2rem',
                }}
            >
                <Box
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                    style={{
                        marginBottom: '2rem',
                    }}
                >
                    <Tabs value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"

                    onChange={handleTabChange}
                    >
                        <Tab label="Customer Details" />
                        <Tab label="Customer Purchase Orders" />
                        <Tab label="Customer Invoices" />
                        <Tab label="Quality Issues" />
                    </Tabs>
                </Box>
                {tabValue === 0 && (
                    <Box p={3}>
                        <Typography variant="h4">Customer Details</Typography>
                        {formValues && (
                        <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="Customer Name"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="Abbreviation"
                                    name="abbreviation"
                                    value={formValues.abbreviation}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="Telephone"
                                    name="telephone"
                                    value={formValues.telephone}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="Street Address 1"
                                    name="street_address_1"
                                    value={formValues.street_address_1}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    fullWidth
                                    label="Street Address 2"
                                    name="street_address_2"
                                    value={formValues.street_address_2}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={formValues.city}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="Zip"
                                    name="zip"
                                    value={formValues.zip}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="County"
                                    name="county"
                                    value={formValues.county}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    value={formValues.country}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    fullWidth
                                    label="VAT"
                                    name="vat"
                                    value={formValues.vat}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    fullWidth
                                    label="Reg Com"
                                    name="reg_com"
                                    value={formValues.reg_com}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    fullWidth
                                    label="Contact Person First Name"
                                    name="contact_person_firstname"
                                    value={formValues.contact_person_firstname}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    fullWidth
                                    label="Contact Person Family Name"
                                    name="contact_person_familyname"
                                    value={formValues.contact_person_familyname}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    fullWidth
                                    label="Lead Time"
                                    name="lead_time"
                                    value={formValues.lead_time}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    fullWidth
                                    label="Swift"
                                    name="swift"
                                    value={formValues.swift}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    fullWidth
                                    label="IBAN"
                                    name="iban"
                                    value={formValues.iban}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submitButton}
                                    >
                                        Update Customer
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        )}
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box p={3}>
                        <Typography variant="h4">Purchase Orders</Typography>
                    </Box>
                )}
                {tabValue === 2 && (
                    <Box p={3}>
                        <Typography variant="h4">Invoices</Typography>
                    </Box>
                )}
                {tabValue === 3 && (
                    <Box p={3}>
                        <Typography variant="h4">Quality Issues</Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default CustomerPage;

