import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Tab, Tabs, Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, FormControlLabel, FormGroup, FormLabel, FormControl, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliers, updateSupplier } from '../../features/suppliers/suppliersSlice';
import { addAgentRelation, fetchAgentRelations, removeAgentRelation } from '../../features/agentRelations/agentRelationsSlice';
import { Autocomplete, Switch } from '@mui/material';
import CategorySelector from '../common/CategorySelector';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { SPO } from './SPO';
import { SInvoices_dummy } from './SInvoices_dummy';
import { QualityIssues_dummy } from './QualityIssues_dummy';
import { fetchSupplierCategories, addSupplierCategory, removeSupplierCategory } from '../../features/supplierCategories/supplierCategoriesSlice';

// TODOs:

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
}));

const SupplierPage = () => {
    
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const numId = Number(id);
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
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
        associateAgents: [],
    });
    const categories = useSelector(state => state.categories.data);
    const suppliers = useSelector(state => state.suppliers.data);
    const supplier = useSelector(state => state.suppliers.data.find(supplier => supplier.id === numId));
    const supplierCategories = useSelector(state => state.supplierCategories.data);
    console.log('supplierCategories', supplierCategories);
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);
    const agentRelations = useSelector(state => state.agentRelations.data);   
    console.log('agentRelations in SupplierPage', agentRelations);
    const [associateSuppliers, setAssociateSuppliers] = useState([]);
    const [associateAgents, setAssociateAgents] = useState([]);
    console.log('associateSuppliers in SupplierPage', associateSuppliers);
    const filteredSuppliers = suppliers.filter(supplier => {
        if (supplier.isAgent) {
          return false;
        }
        return !agentRelations.some(relation => {
          return relation.agentId === supplier.id || relation.supplierId === supplier.id;
        });
    });
    const filteredAgents = suppliers.filter(supplier => {
        return supplier.isAgent;
      });
 
    
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchCategories());
            dispatch(fetchSuppliers());
            dispatch(fetchAgentRelations());}
            dispatch(fetchSupplierCategories());
            fetchData();
    }, [dispatch]);

    useEffect(() => {
        console.log('useEffect associateSuppliers called');
        if (agentRelations.length > 0 && suppliers.length > 0) {
            setAssociateSuppliers(
                agentRelations
                    .filter(agentRelation => agentRelation.agentId === numId)
                    .map(agentRelation => suppliers.find(supplier => supplier.id === agentRelation.supplierId))
            );
            setAssociateAgents(
                agentRelations
                    .filter(agentRelation => agentRelation.supplierId === numId)
                    .map(agentRelation => suppliers.find(supplier => supplier.id === agentRelation.agentId))
            );
        }
    }, [agentRelations, suppliers, numId]);

    useEffect(() => {
        if (supplier && supplier.categories) {
            setFormValues(supplier);
            setSelectedCategoryId(supplier.categories.map(category => category.id));
            
        }
    }, [supplier]);

    useEffect(() => {
        setFormValues((prev) => ({ ...prev, associateSuppliers: associateSuppliers }));
    }, [associateSuppliers]);

    useEffect(() => {
        setFormValues((prev) => ({ ...prev, associateAgents: associateAgents }));
      }, [associateAgents]);      

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

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setOpenSnackbar(false);
      }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSupplier(formValues));
        // Fetch existing SupplierCategory relations for the current supplier
        const existingSupplierCategoryRelations = supplierCategories.filter(
            (relation) => relation.supplierId === numId
        );
        console.log('existingSupplierCategoryRelations', existingSupplierCategoryRelations);
        
        // Determine new SupplierCategory relations
        const newSupplierCategoryRelations = selectedCategoryId;
        console.log('newSupplierCategoryRelations', newSupplierCategoryRelations);
        
        // Add new SupplierCategory relations
        for (let newSupplierCategoryRelation of newSupplierCategoryRelations) {
            if (
            !existingSupplierCategoryRelations.some(
                (relation) => relation.categoryId === newSupplierCategoryRelation
            )
            ) {
                console.log('newSupplierCategoryRelation', newSupplierCategoryRelation);
                console.log('numId', numId);
            dispatch(addSupplierCategory(numId, newSupplierCategoryRelation));
            }
        }
        
        // Remove old SupplierCategory relations
        for (let existingSupplierCategoryRelation of existingSupplierCategoryRelations) {
            if (!newSupplierCategoryRelations.includes(existingSupplierCategoryRelation.categoryId)) {
                dispatch(removeSupplierCategory(existingSupplierCategoryRelation.supplierId, existingSupplierCategoryRelation.categoryId));
            }
        }
         
        dispatch(removeAgentRelation(agentRelationsId));

        // Fetch existing agent relations for the current supplier
        const existingAgentRelations = agentRelations.filter(
            (relation) => relation.agentId === numId || relation.supplierId === numId
        );
        
        // Determine new agent relations
        const newAgentRelations = [
            ...formValues.associateSuppliers.map((supplier) => supplier.id),
            ...formValues.associateAgents.map((agent) => agent.id),
        ];
        
        // Add new agent relations
        for (let newAgentRelation of newAgentRelations) {
            if (
            !existingAgentRelations.some(
                (relation) =>
                relation.agentId === newAgentRelation || relation.supplierId === newAgentRelation
            )
            ) {
            if (formValues.isAgent) {
                dispatch(addAgentRelation(numId, newAgentRelation));
            } else {
                dispatch(addAgentRelation(newAgentRelation, numId));
            }
            }
        }
        
        // Remove old agent relations
        for (let existingAgentRelation of existingAgentRelations) {
            if (
            !newAgentRelations.includes(existingAgentRelation.agentId) &&
            !newAgentRelations.includes(existingAgentRelation.supplierId)
            ) {
            dispatch(removeAgentRelation(existingAgentRelation.id));
            }
        }
    }

    const handleBack = () => {
        navigate('/suppliers');
    };

    // get index of agentRelations array item where agentId === numId
    const agentRelationsId = agentRelations.findIndex(agentRelation => agentRelation.agentId === numId);
        console.log('agentRelationsId', agentRelationsId);

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
                    <Tabs value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"

                    onChange={handleTabChange}
                    >
                        <Tab label="Supplier Details" />
                        <Tab label="Supplier Purchase Orders" />
                        <Tab label="Supplier Invoices" />
                        <Tab label="Quality Issues" />
                    </Tabs>
                </Box>
                {tabValue === 0 && (
                    <Box p={3}>
                        <Typography variant="h4">Supplier Details</Typography>
                        {formValues && (
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item sm={12} md={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="Supplier Name"
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
                                    <Typography variant="h6">Is Agent?</Typography>
                                    <Switch
                                    checked={formValues.isAgent}
                                    onChange={handleChange}
                                    name="isAgent"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    {formValues.isAgent && (
                                        <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={filteredSuppliers}
                                        getOptionLabel={(option) => option.name}
                                        getOptionSelected={(option, value) =>
                                            option.id === value.id
                                        }
                                        value={associateSuppliers}
                                        onChange={(e, value) => {
                                            setFormValues((prev) => ({
                                            ...prev,
                                            associateSuppliers: value,
                                            }));
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Associate Suppliers"
                                            placeholder="Associate Suppliers"
                                            />
                                        )}
                                        />
                                    )}
                                    {!formValues.isAgent && (
                                        <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={filteredAgents}
                                        getOptionLabel={(option) => option.name}
                                        getOptionSelected={(option, value) =>
                                            option.id === value.id
                                        }
                                        value={associateAgents}
                                        onChange={(e, value) => {
                                            setFormValues((prev) => ({
                                            ...prev,
                                            associateAgents: value,
                                            }));
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Associate Agents"
                                            placeholder="Associate Agents"
                                            />
                                        )}
                                        />
                                    )}
                                </Grid>
                                <Grid item sm={12} md={6} > 
                                    <CategorySelector
                                        categories={categories}
                                        selectedCategories={selectedCategoryId}
                                        setSelectedCategories={setSelectedCategoryId}
                                        />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submitButton}
                                    >
                                        Update Supplier
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        )}
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box p={3}>
                        <SPO />
                    </Box>
                )}
                {tabValue === 2 && (
                    <Box p={3}>
                        <SInvoices_dummy />    
                    </Box>
                )}
                {tabValue === 3 && (
                    <Box p={3}>
                        <QualityIssues_dummy />
                    </Box>
                )}
            </Paper>
        </Container>
    );
};
  
export default SupplierPage;