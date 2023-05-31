import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Collapse, Button, Switch, Paper, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchCustomers } from '../../features/customers/customersSlice';
import { addCustomer } from '../../features/customers/customersSlice';
import { addShop } from '../../features/shops/shopsSlice';
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
    const [sameAddress, setSameAddress] = useState(true);
    const [showShopFields, setShowShopFields] = useState(false);
    const [addedShops, setAddedShops] = useState({});

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

    const [shopValues, setShopValues] = useState({
        name: '',
        telephone: '',
        street_address_1: '',
        street_address_2: '',
        city: '',
        zip: '',
        county: '',
        country: '',
    });

    const handleSameAddressChange = (event) => {
        setSameAddress(event.target.checked);
        setShowShopFields(!event.target.checked);
        if (event.target.checked) {
          setShopValues(prevValues => ({
            ...prevValues,
            name: formValues.name,
            telephone: formValues.telephone,
            street_address_1: formValues.street_address_1,
            street_address_2: formValues.street_address_2,
            city: formValues.city,
            zip: formValues.zip,
            county: formValues.county,
            country: formValues.country,
          }));
        }
      };

    const handleShopChange = (event) => {
        setShopValues({
            ...shopValues,
            [event.target.name]: event.target.value,
        });
    };

    const addShop = () => {
        setFormValues(prevValues => ({
          ...prevValues,
          shops: [...prevValues.shops, shopValues],
        }));
        setAddedShops(prevShops => [...prevShops, shopValues]);
        setShopValues({
          name: '',
          telephone: '',
          street_address_1: '',
          street_address_2: '',
          city: '',
          zip: '',
          county: '',
          country: '',
        });
      };    

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
        for (const shop of addedShops) {
            dispatch(addShop({
              ...shop,
              parentCustomerId: customerId,
            }));
          }
        setFormValues(initialFormValues);
        setAddedShops([]);
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
                    <Grid container spacing={3} style={{ marginBottom: '2rem',}}>
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
                    <Typography component="h2" variant="h6">
                        Shops
                        {/* list all name property values of all added shop object items */}
                        {addedShops.map((shop, index) => ( <div key={index}> <Typography component="h3" variant="h6">{shop.name}</Typography></div>))}
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Shop input fields... */}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={sameAddress}
                                    onChange={handleSameAddressChange}
                                    name="sameAddress"
                                    color="primary"
                                />
                            }
                            label="Shop address is the same as customer address"
                        />
                        <Collapse in={showShopFields}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="shopName"
                                    label="Shop Name"
                                    name="name"
                                    value={shopValues.name}
                                    onChange={handleShopChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="shopTelephone"
                                    label="Shop Telephone"
                                    name="telephone"
                                    value={shopValues.telephone}
                                    onChange={handleShopChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="shopStreetAddress1"
                                    label="Shop Street Address 1"
                                    name="street_address_1"
                                    value={shopValues.street_address_1}
                                    onChange={handleShopChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="shopStreetAddress2"
                                    label="Shop Street Address 2"
                                    name="street_address_2"
                                    value={shopValues.street_address_2}
                                    onChange={handleShopChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="shopCity"
                                    label="Shop City"
                                    name="city"
                                    value={shopValues.city}
                                    onChange={handleShopChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="shopZip"
                                    label="Shop Zip"
                                    name="zip"
                                    value={shopValues.zip}
                                    onChange={handleShopChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="shopCounty"
                                    label="Shop County"
                                    name="county"
                                    value={shopValues.county}
                                    onChange={handleShopChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="shopCountry"
                                    label="Shop Country"
                                    name="country"
                                    value={shopValues.country}
                                    onChange={handleShopChange}
                                />
                            </Grid>
                        </Collapse>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={addShop}
                            >
                                Add Shop
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitButton}
            >
                Add Customer
            </Button>
        </Container>
    );
};

export default NewCustomerPage;