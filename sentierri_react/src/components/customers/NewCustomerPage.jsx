import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, Checkbox, Paper, FormGroup, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchCustomers } from '../../features/customers/customersSlice';
import { addCustomer } from '../../features/customers/customersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));

const NewCustomerPage = () => {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [submissionSuccessful, setSubmissionSuccessful] = useState(false);
    const [customerId, setCustomerId] = useState(undefined);    
    const classes = useStyles();
    const dispatch = useDispatch();

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
    });

    const customers = useSelector(state => state.customers?.data);
    const [oldCustomerLength, setOldCustomerLength] = useState(customers.length);

    useEffect(() => {
        if (customers.length > oldCustomerLength) {
            setSubmissionSuccessful(true);
            setOpenSnackbar(true);
        }
        setOldCustomerLength(customers.length);
    }, [customers.length, oldCustomerLength]);

    useEffect(() => {
        if (customers.length > 0) {
            const maxId = Math.max(...customers.map(customer => customer.id));
            console.log('maxId', maxId);
            setCustomerId(maxId + 1);
            console.log('customerId', customerId);
        } else {
            setCustomerId(undefined);
        }
    }, [customers]);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };      

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleBack = () => {
        navigate('/customers', { replace: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addCustomer(formValues));
    };

    return (
        <Container component="main">
            <Button variant="contained" color="primary" onClick={handleBack}
                style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
                >
                Back
            </Button>
            <Paper
                elevation={4}
                className={classes.paper}
                style={{ 
                    padding: '3rem',
                    marginVertical: '2rem',
                }}
            >
                <Typography component="h1" variant="h4">
                    Add New Customer
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                required
                                fullWidth
                                id="abbreviation"
                                label="Abbreviation"
                                name="abbreviation"
                                autoComplete="abbreviation"
                                value={formValues.abbreviation}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                required
                                fullWidth
                                id="telephone"
                                label="Telephone"
                                name="telephone"
                                autoComplete="telephone"
                                value={formValues.telephone}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="street_address_1"
                                label="Street Address 1"
                                name="street_address_1"
                                autoComplete="street-address-1"
                                value={formValues.street_address_1}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="street_address_2"
                                label="Street Address 2"
                                name="street_address_2"
                                autoComplete="street-address-2"
                                value={formValues.street_address_2}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="city"
                                value={formValues.city}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="zip"
                                label="Zip"
                                name="zip"
                                autoComplete="zip"
                                value={formValues.zip}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="county"
                                label="County"
                                name="county"
                                autoComplete="county"
                                value={formValues.county}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="country"
                                label="Country"
                                name="country"
                                autoComplete="country"
                                value={formValues.country}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="contact_person_firstname"
                                label="Contact Person Firstname"
                                name="contact_person_firstname"
                                autoComplete="contact-person-firstname"
                                value={formValues.contact_person_firstname}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="contact_person_familyname"
                                label="Contact Person Familyname"
                                name="contact_person_familyname"
                                autoComplete="contact-person-familyname"
                                value={formValues.contact_person_familyname}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="vat"
                                label="VAT"
                                name="vat"
                                autoComplete="vat"
                                value={formValues.vat}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="reg_com"
                                label="Reg Com"
                                name="reg_com"
                                autoComplete="reg_com"
                                value={formValues.reg_com}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="swift"
                                label="SWIFT"
                                name="swift"
                                autoComplete="swift"
                                value={formValues.swift}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                                fullWidth
                                id="iban"
                                label="IBAN"
                                name="iban"
                                autoComplete="iban"
                                value={formValues.iban}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={6} >
                            <Typography component="h2" variant="h6">
                                Shop(s)
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} md={6} > 
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                        >
                            Add Customer
                        </Button>
                    </Grid>
                </form>
            </Paper>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                {submissionSuccessful ? 
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Customer successfully added!
                    </Alert> :
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        Error adding customer!
                    </Alert>
                }
            </Snackbar>
        </Container>
    );
};

export default NewCustomerPage;