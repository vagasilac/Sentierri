import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchSuppliers } from '../../features/suppliers/suppliersSlice';
import { addSupplier } from '../../features/suppliers/suppliersSlice';
import { addSupplierCategory } from '../../features/supplierCategories/supplierCategoriesSlice';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { addAgentRelation, fetchAgentRelations } from '../../features/agentRelations/agentRelationsSlice';
import CategorySelector from '../common/CategorySelector';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { Autocomplete } from '@mui/material';

// TODO:


const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
  }));



const NewSupplierPage = () => {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [submissionSuccessful, setSubmissionSuccessful] = useState(false);    
    const classes = useStyles();
    const [associateAgents, setAssociateAgents] = useState([]);
    const [formValues, setFormValues] = useState({
        name: '',
        abbreviation: '',
        telephone: '',
        email: '',
        street_address_1: '',
        street_address_2: '',
        city: '',
        zip: '',
        county: '',
        country: '',
        vat: '',
        reg_com: '',
        contact_person_firstname: '',
        contact_person_familyname: '',
        material_category: '',
        lead_time: '',
        isAgent: false,
        associateSuppliers: [],
    });

    const categories = useSelector(state => state.categories.data);
    const suppliers = useSelector(state => state.suppliers.data);
    console.log('useSelector(suppliers)', suppliers);
    const agentRelations = useSelector(state => state.agentRelations.data);
    console.log('useSelector agentRelations', agentRelations);
    const filteredSuppliers = suppliers.filter(supplier => {
        if (supplier.isAgent) {
          return false;
        }
        return !agentRelations.some(relation => {
          return relation.agentId === supplier.id || relation.supplierId === supplier.id;
        });
    });

    const [supplierId, setSupplierId] = useState('');
    console.log('suppliers', suppliers, 'supplierId', supplierId);
    const [oldSupplierLength, setOldSupplierLength] = useState(suppliers.length);
    const dispatch = useDispatch();

    useEffect(() => {
        if (suppliers.length > oldSupplierLength) {
        setSubmissionSuccessful(true);
        setOpenSnackbar(true);
        }
        setOldSupplierLength(suppliers.length);
    }, [suppliers.length, oldSupplierLength]);

    useEffect(() => {
        if (suppliers.length > 0) {
            const maxId = Math.max(...suppliers.map(supplier => supplier.id));
            console.log('maxId', maxId);
            setSupplierId(maxId + 1);
            console.log('supplierId', supplierId);
        } else {
            setSupplierId(undefined);
        }
    }, [suppliers]);
    
  
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchSuppliers());
        dispatch(fetchAgentRelations());
    }, [dispatch]);

    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    
    // VALIDATION
    // Check if supplier exists by name
    const supplierExists = (name) => {
        return suppliers.some(supplier => supplier.name.toLowerCase() === name.toLowerCase());
    };
    // Check if supplier exists by abbreviation
    const supplierExistsAbbreviation = (abbreviation) => {
        return suppliers.some(supplier => supplier.abbreviation.toLowerCase() === abbreviation.toLowerCase());
    };
    // check if value is integer
    const isInteger = (value) => {
        return /^\d+$/.test(value);
    };
    const [error, setError] = useState({});

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setOpenSnackbar(false);
      };      

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    
        let errors = { ...error }; // clone the existing errors
    
        if (name === "name") {
            errors.name = supplierExists(value) ? "Supplier with this name already exists" : "";
        }
    
        if (name === "abbreviation") {
            errors.abbreviation = supplierExistsAbbreviation(value) ? "Supplier with this abbreviation already exists" : "";
        }
    
        if(name === "lead_time") {
            errors.lead_time = !isInteger(value) ? "Lead time must be an integer" : "";
        }
    
        setError(errors);
    };
    
    const handleBack = () => {
        navigate('/suppliers');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addSupplier(formValues));
        if (selectedCategoryId.length > 0) {
            selectedCategoryId.forEach(categoryId => {
                console.log('supplierId', supplierId, 'categoryId', categoryId);
                dispatch(addSupplierCategory(supplierId, categoryId));
            });
        }

        if (formValues.isAgent) {
            formValues.associateSuppliers.forEach((supplier) => {
              if (supplier) {
                console.log('adding agentRelation agent Id', supplierId, 'associate id', supplier.id);
                dispatch(addAgentRelation(supplierId, supplier.id));
              }
            });
          } else {
            associateAgents.forEach((agent) => {
              if (agent) {
                console.log('adding agentRelation agent Id', agent.id, 'associate id', supplierId);
                dispatch(addAgentRelation(agent.id, supplierId));
              }
            });
          }

        setSelectedCategoryId('');
        setFormValues({
            name: '',
            abbreviation: '',
            telephone: '',
            email: '',
            street_address_1: '',
            street_address_2: '',
            city: '',
            zip: '',
            county: '',
            country: '',
            vat: '',
            reg_com: '',
            contact_person_firstname: '',
            contact_person_familyname: '',
            lead_time: '',
            swift: '',
            iban: '',
            isAgent: false,
            associateSuppliers: [],
        });
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
                {Object.values(error).map((err, index) => err && <Alert key={index} severity="error">{err}</Alert>)}
                <Typography variant="h4">Add New Supplier</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Supplier Name"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Abbreviation"
                            name="abbreviation"
                            value={formValues.abbreviation}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Telephone"
                            name="telephone"
                            value={formValues.telephone}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Street Address 1"
                            name="street_address_1"
                            value={formValues.street_address_1}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Street Address 2"
                            name="street_address_2"
                            value={formValues.street_address_2}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="City"
                            name="city"
                            value={formValues.city}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Zip"
                            name="zip"
                            value={formValues.zip}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="County"
                            name="county"
                            value={formValues.county}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Country"
                            name="country"
                            value={formValues.country}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="VAT"
                            name="vat"
                            value={formValues.vat}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Reg Com"
                            name="reg_com"
                            value={formValues.reg_com}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Contact Person Firstname"
                            name="contact_person_firstname"
                            value={formValues.contact_person_firstname}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Contact Person Familyname"
                            name="contact_person_familyname"
                            value={formValues.contact_person_familyname}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Lead Time"
                            name="lead_time"
                            value={formValues.lead_time}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="Swift"
                            name="swift"
                            value={formValues.swift}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <TextField
                            required
                            fullWidth
                            label="IBAN"
                            name="iban"
                            value={formValues.iban}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <CategorySelector
                                categories={categories}
                                selectedCategories={selectedCategoryId}
                                setSelectedCategories={setSelectedCategoryId}
                                />
                        </Grid>
                        <Grid item sm={12} md={6} > 
                            <Typography>Is Agent</Typography>
                        <Switch
                                checked={formValues.isAgent}
                                onChange={(e) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    isAgent: e.target.checked,
                                }))
                                }
                                >
                            </Switch>
                        </Grid>
                        <Grid item sm={12} md={6} > 
                        {!formValues.isAgent && (
                            <Autocomplete
                                multiple
                                id="associate-agents"
                                options={filteredSuppliers}
                                getOptionLabel={(option) => option.name}
                                value={associateAgents}
                                onChange={(event, newValue) => {
                                setAssociateAgents(newValue);
                                }}
                                renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Associate Agents" />
                                )}
                            />
                        )}
                        {formValues.isAgent && (
                            <Autocomplete
                                multiple
                                id="associate-suppliers"
                                options={filteredSuppliers}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(e, value) => {
                                    setFormValues((prev) => ({
                                    ...prev,
                                    associateSuppliers: value,
                                    }));
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    label="Associate Suppliers"
                                    placeholder="Associate Suppliers"
                                    />
                                )}
                            />
                            )}
                        </Grid>                   
                        <Grid item sm={12} md={6} > 
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={Object.values(error).some(err => err)} // disable if there's any error
                        >
                            Add Supplier
                        </Button>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    {submissionSuccessful ? (
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Supplier has been successfully added!
                    </Alert>
                    ) : (
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        An error occurred when adding the supplier.
                    </Alert>
                    )}
                </Snackbar>
            </Paper>
        </Container>
    );
};
  
export default NewSupplierPage;