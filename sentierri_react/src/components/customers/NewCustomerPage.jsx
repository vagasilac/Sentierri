import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, Paper } from '@material-ui/core';
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
    const classes = useStyles();
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        name: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addCustomer(formValues));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} className={classes.form}>
                <Typography component="h1" variant="h5">
                    Add New Customer
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="street_address_1"
                                label="Street Address 1"
                                name="street_address_1"
                                autoComplete="street_address_1"
                                value={formValues.street_address_1}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="street_address_2"
                                label="Street Address 2"
                                name="street_address_2"
                                autoComplete="street_address_2"
                                value={formValues.street_address_2}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="city"
                                value={formValues.city}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="zip"
                                label="ZIP"
                                name="zip"
                                autoComplete="zip"
                                value={formValues.zip}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="county"
                                label="County"
                                name="county"
                                autoComplete="county"
                                value={formValues.county}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="country"
                                label="Country"
                                name="country"
                                autoComplete="country"
                                value={formValues.country}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="contact_person_firstname"
                                label="Contact Person Firstname"
                                name="contact_person_firstname"
                                autoComplete="contact_person_firstname"
                                value={formValues.contact_person_firstname}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="contact_person_familyname"
                                label="Contact Person Familyname"
                                name="contact_person_familyname"
                                autoComplete="contact_person_familyname"
                                value={formValues.contact_person_familyname}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                            >
                                Add Customer
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    {submissionSuccessful ? (
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Customer has been successfully added!
                    </Alert>
                    ) : (
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        An error occurred when adding the customer.
                    </Alert>
                    )}
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default NewCustomerPage;
