import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    const customers = useSelector(state => state.customers?.data);
    console.log('customers: ', customers);
    const [customerId, setCustomerId] = useState('');
    const [oldCustomerLength, setOldCustomerLength] = useState(customers.length);
    const dispatch = useDispatch();

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
            setCustomerId(maxId + 1);
        } else {
            setCustomerId(undefined);
        }
    }, [customers]);

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addCustomer(formValues));
            navigate('/customers');
        } catch (err) {
            console.error('Failed to add customer: ', err);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Typography component="h1" variant="h5">
                    Add New Customer
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                value={formValues.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phone"
                                label="Phone"
                                id="phone"
                                value={formValues.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="address"
                                label="Address"
                                id="address"
                                value={formValues.address}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                    >
                        Add Customer
                    </Button>
                </form>
            </Paper>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                {submissionSuccessful ? 
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        Customer added successfully!
                    </Alert> 
                    : 
                    <Alert onClose={handleCloseSnackbar} severity="error">
                        Error adding customer!
                    </Alert>
                }
            </Snackbar>
        </Container>
    );
};

export default NewCustomerPage;
