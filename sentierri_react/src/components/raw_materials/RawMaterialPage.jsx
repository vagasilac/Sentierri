import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid, TextField, Button, Switch } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRawMaterialById, updateRawMaterial } from '../../features/rawMaterials/rawMaterialsSlice';
import { fetchSuppliers } from '../../features/suppliers/suppliersSlice';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { Tabs, Tab } from '@material-ui/core';
import { ModelTable } from './ModelTable';
import { StockTable } from './StockTable';
import { TransactionsTable } from './TransactionsTable';
import CategorySelector from '../common/CategorySelector';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const RawMaterialPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const numId = Number(id);
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const [formValues, setFormValues] = useState({
        name: '',
        material_id: '',
        material_group: '',
        material_category: '',
        material_subcategory: '',
        material_type: '',
        color: '',
        supplier_color: '',
        size: '',
        roll_width: '',
        unit_of_measure: '',
        main_supplier: '',
        lead_time: '',
        price_per_unit: '',
        active: true,
    });

    useEffect(() => {
        dispatch(fetchRawMaterialById(numId));
        dispatch(fetchSuppliers());
        dispatch(fetchCategories());
    }, [dispatch, numId]);


    const rawMaterial = useSelector(state => {
        console.log('Inside useSelector')
        console.log(state)
        console.log(state.rawMaterials)
        console.log(state.rawMaterials.currentRawMaterial)
        return state.rawMaterials.currentRawMaterial
    });
    const suppliers = useSelector(state => state.suppliers.suppliers);
    const categories = useSelector(state => state.categories.categories);


    useEffect(() => {
        setFormValues(rawMaterial);
    }
    , [rawMaterial]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSwitchChange = (e) => {
        const { name, checked } = e.target;
        setFormValues({...formValues, [name]: checked});
    }

    const handleSupplierChange = (e, value) => {
        setFormValues({...formValues, main_supplier: value});
    }

    const handleCategoryChange = (e, value) => {
        setFormValues({...formValues, material_category: value});
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(updateRawMaterial(formValues));
    }

    return (
        <>
            <Container className={classes.root}>
                <Paper className={classes.paper}>
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
                            <Tab label="Raw Material Details" />
                            <Tab label="Models" />
                            <Tab label="Stock" />
                            <Tab label="Transactions" />
                        </Tabs>
                    </Box>
                {tabValue === 0 && (
                    <Box p={3}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Raw Material Details
                        </Typography>
                        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="material_id"
                                        name="material_id"
                                        label="Material ID"
                                        value={formValues.material_id}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="material_group"
                                        name="material_group"
                                        label="Material Group"
                                        value={formValues.material_group}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CategorySelector
                                        categories={categories}
                                        handleCategoryChange={handleCategoryChange}
                                        material_category={formValues.material_category}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="material_subcategory"
                                        name="material_subcategory"
                                        label="Material Subcategory"
                                        value={formValues.material_subcategory}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="material_type"
                                        name="material_type"
                                        label="Material Type"
                                        value={formValues.material_type}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="color"
                                        name="color"
                                        label="Color"
                                        value={formValues.color}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="supplier_color"
                                        name="supplier_color"
                                        label="Supplier Color"
                                        value={formValues.supplier_color}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="size"
                                        name="size"
                                        label="Size"
                                        value={formValues.size}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="roll_width"
                                        name="roll_width"
                                        label="Roll Width"
                                        value={formValues.roll_width}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* Select Unit of Measure */}
                                    <TextField
                                        id="unit_of_measure"
                                        name="unit_of_measure"
                                        label="Unit of Measure"
                                        value={formValues.unit_of_measure}
                                        onChange={handleInputChange}
                                    />                                   
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SupplierSelector
                                        suppliers={suppliers}
                                        handleSupplierChange={handleSupplierChange}
                                        main_supplier={formValues.main_supplier}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="lead_time"
                                        name="lead_time"
                                        label="Lead Time"
                                        value={formValues.lead_time}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="price_per_unit"
                                        name="price_per_unit"
                                        label="Price per unit"
                                        value={formValues.price_per_unit}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Grid>
                        </form>
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box p={3}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Models
                        </Typography>
                        <ModelTable />
                    </Box>
                )}
                {tabValue === 2 && (
                    <Box p={3}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Stock
                        </Typography>
                        <StockTable />
                    </Box>
                )}
                {tabValue === 3 && (
                    <Box p={3}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Transactions
                        </Typography>
                        <TransactionsTable />
                    </Box>
                )}
                </Paper>
            </Container>
        </>
    )
}

export default RawMaterialPage;





