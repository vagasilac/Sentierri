import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Typography, TextField, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShops, updateShop } from '../../features/shops/shopsSlice';
import { fetchCustomers } from '../../features/customers/customersSlice';

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
}));

const Shop = () => {
    const { id } = useParams();
    const numId = Number(id);
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        name: '',
        parentCustomerId: '',
        telephone: '',
        street_address_1: '',
        street_address_2: '',
        city: '',
        zip: '',
        county: '',
        country: '',
    });

    // get customers from redux store
    const customers = useSelector(state => state.customers.data);
    console.log('customers: ', customers);
    const shops = useSelector(state => state.shops.data);
    const shop = useSelector(state => state.shops.data.find(shop => shop.id === numId));
    console.log('shop: ', shop);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchShops());
            dispatch(fetchCustomers());
        }
            fetchData();
    }, [dispatch]);
    

    useEffect(() => {
        if (shop) {
            setFormValues(shop);
        }
    }, [shop]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateShop(formValues));
    }

    const handleBack = () => {
        navigate('/shops');
    };

    return (
        <Container
            style={{
                paddingBottom: '2rem',
            }}
        >
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
                <Box
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                    style={{
                        marginBottom: '2rem',
                    }}
                >
                    <Typography variant="h4">Shop Details</Typography>
                    {formValues && (
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item sm={12} md={6}>
                                <TextField
                                required
                                fullWidth
                                label="Shop Name"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <TextField
                                required
                                fullWidth
                                label="Customer"
                                name="customer"
                                value={customers.find(customer => customer.id === formValues.parentCustomerId)?.name || ''}
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submitButton}
                                >
                                    Update Shop
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};
  
export default Shop;
