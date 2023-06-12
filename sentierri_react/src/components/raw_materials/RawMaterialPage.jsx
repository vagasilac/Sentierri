import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Breadcrumbs, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { fetchSubCategories } from '../../features/subCategories/subCategoriesSlice';
import { fetchColors } from '../../features/colors/colorsSlice';
import { fetchSuppliers } from '../../features/suppliers/suppliersSlice';
import { fetchRawMaterials, addRawMaterial } from '../../features/rawMaterials/rawMaterialsSlice';
import { addSupplierMaterial, fetchSupplierMaterialsByMaterialId } from '../../features/supplierMaterials/supplierMaterialsSlice';
import { fetchUMs } from '../../features/UM/UMSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Style } from '@material-ui/icons';

// TODO: validation (duplicate material_id, name, etc., required fields, etc., numeric fields, etc.)

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
}));
  
const RawMaterialPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();
    const numId = Number(id);
    const rawMaterials = useSelector((state) => state.rawMaterials.data);
    const rawMaterial = useSelector(state => state.rawMaterials.data.find(rawMaterial => rawMaterial.id === numId));
    const colors = useSelector((state) => state.colors.data);
    const UMs = useSelector((state) => state.UM.data);
    const categories = useSelector((state) => state.categories.data);
    const subCategories = useSelector((state) => state.subCategories.data);
    const suppliers = useSelector((state) => state.suppliers.data);
    // const suppliersOfMaterial = useSelector((state) => state.supplierMaterials.data.filter(supplierMaterial => supplierMaterial.material_id === numId));
    const supplierMaterials = useSelector((state) => state.supplierMaterials.byMaterialId && state.supplierMaterials.byMaterialId[numId] ? state.supplierMaterials.byMaterialId[numId] : []);
    console.log('supplierMaterials', supplierMaterials);

    const [formValues, setFormValues] = useState({
        material_id: '',
        name: '',
        material_group: '',
        material_type: '',
        material_category: '',
        material_subcategory: '',
        color: '',
        supplier_color: '',
        size: '',
        roll_width: null,
        unit_of_measure: '',
        price_per_unit: '',
        lead_time: '',
        main_supplier: '',
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);

    useEffect(() => {
        dispatch(fetchRawMaterials());
        dispatch(fetchColors());
        dispatch(fetchUMs());
        dispatch(fetchCategories());
        dispatch(fetchSubCategories());
        dispatch(fetchSuppliers());
        dispatch(fetchSupplierMaterialsByMaterialId(numId));
        console.log('Colors fetched - useEffect materials', colors);
    }, [dispatch]);

    useEffect(() => {
        const filteredSubCategories = subCategories.filter(
                (subCategory) => subCategory.parentCategoryId === selectedCategoryId
            );
            setFilteredSubCategories(filteredSubCategories);
            if (selectedCategoryId) {
            fetchSubCategories();
            };
    }, [selectedCategoryId]);

    useEffect(() => {
        rawMaterial &&         
            setFormValues(rawMaterial);
    }, [rawMaterial]);

    useEffect(() => {
        if (selectedSuppliers.length > 0) {
            selectedSuppliers.forEach(supplier => {
                console.log({ supplierId: supplier.id, materialId: currentId })});
        }
    }, [selectedSuppliers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        // set selectedCategory to the id value of the selected category
        if (name === 'material_category') {
            setSelectedCategoryId(value);
            console.log('selectedCategoryId', selectedCategoryId);
        };
        if (name === 'color') {
            const selectedColor = colors.find((color) => color.name_ro === value);
            setFormValues((prev) => ({
                ...prev,
                color: selectedColor.name_ro,
            }));
        }
        if (name === 'unit_of_measure') {
            const selectedUM = UMs.find((UM) => UM.abbreviation === value);
            setFormValues((prev) => ({
                ...prev,
                unit_of_measure: selectedUM.abbreviation,
            }));
        }
        else {
            setFormValues((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleBack = () => {
        navigate('/raw-materials');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addRawMaterial(formValues))
            .then(() => {
                // Create an array of promises for each addSupplierMaterial dispatch
                const supplierMaterialPromises = selectedSuppliers.map(supplier => {
                    return dispatch(addSupplierMaterial(supplier.id, currentId));
                });
    
                // Use Promise.all to wait for all addSupplierMaterial dispatches to resolve
                return Promise.all(supplierMaterialPromises);
            })
            .then(() => {
                // This block will only run after all addSupplierMaterial dispatches have resolved
                setFormValues({
                    material_id: '',
                    name: '',
                    material_group: '',
                    material_type: '',
                    material_category: '',
                    material_subcategory: '',
                    color: '',
                    supplier_color: '',
                    size: '',
                    roll_width: null,
                    unit_of_measure: '',
                    price_per_unit: '',
                    lead_time: '',
                });
                setSelectedSuppliers([]);
            })
            .catch(() => {
                alert('Error adding raw material');
            });
    };
    

    return (
        <Container style={{ paddingBottom: '2rem', paddingTop: '3rem', }} >
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
                        <Button color="inherit" disabled>Inventory</Button>
                        <Button color="inherit" onClick={handleBack}>Raw Materials</Button>
                        <Button color="inherit" disabled>{formValues.name}</Button>
                    </Breadcrumbs>
                <Button variant="contained" color="primary" onClick={handleBack}
                    style={{
                        marginTop: '1rem',
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
                <Typography variant="h4">Update Raw Material</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}> 
                            <TextField
                            required
                            fullWidth
                            label="Material ID"
                            name="material_id"
                            value={formValues.material_id}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <TextField
                            required
                            fullWidth
                            label="Name"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <TextField
                            required
                            fullWidth
                            label="Group"
                            name="material_group"
                            value={formValues.material_group}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <TextField
                            required
                            fullWidth
                            label="Type"
                            name="material_type"
                            value={formValues.material_type}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <FormControl required fullWidth>
                                <InputLabel id="material-category-label">Category</InputLabel>
                                <Select
                                labelId="material-category-label"
                                name="material_category"
                                value={formValues.material_category}
                                onChange={handleChange}
                                >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <FormControl fullWidth>
                                <InputLabel id="material-subcategory-label">Subcategory</InputLabel>
                                <Select
                                labelId="material-subcategory-label"
                                name="material_subcategory"
                                value={formValues.material_subcategory}
                                onChange={handleChange}
                                >
                                {filteredSubCategories.map((filteredSubCategory) => (
                                    <MenuItem key={filteredSubCategory.id} value={filteredSubCategory.id}>
                                    {filteredSubCategory.name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}
                            style={
                                {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }
                            }>
                                <FormControl
                                    required fullWidth
                                    >
                                    <InputLabel id="color-label">Color</InputLabel>
                                    <Select
                                        labelId="color-label"
                                        name="color"
                                        value={formValues.color}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'color',
                                            }}
                                    >
                                        {colors.map((color) => (
                                            <MenuItem key={color.id} value={color.name_ro} >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        width: '100%',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    {color.name_ro}
                                                    <div style={{
                                                        background: color.gradient ? `linear-gradient(180deg, ${color.display_color_code} 0%, #000000 100%)` : color.display_color_code,
                                                        width: '1.5rem',
                                                        height: '1.5rem',
                                                        borderRadius: '50%',
                                                    }}/>
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <TextField
                            required
                            fullWidth
                            label="Supplier Color"
                            name="supplier_color"
                            value={formValues.supplier_color}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <TextField
                            required
                            fullWidth
                            label="Size"
                            name="size"
                            value={formValues.size}
                            onChange={handleChange}
                            />
                        </Grid>
                        {/* 
                        Only show the roll width field if the material_type is roll
                        */}
                        {formValues.material_type == 'roll' && (
                            <Grid item xs={12} md={6}> 
                            <TextField
                            // required
                            fullWidth
                            label="Roll Width"
                            name="roll_width"
                            type="number"
                            value={formValues.roll_width}
                            onChange={handleChange}
                            />
                        </Grid>
                        )}
                        <Grid item xs={12} md={6}>
                                <FormControl
                                    required fullWidth
                                    >
                                    <InputLabel id="um-label">UM</InputLabel>
                                    <Select
                                        labelId="um-label"
                                        name="um"
                                        value={formValues.unit_of_measure}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'unit_of_measure',
                                            }}
                                    >
                                        {UMs.map((UM) => (
                                            <MenuItem key={UM.id} value={UM.abbreviation} >
                                                {UM.abbreviation}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <TextField
                            InputProps={{
                                inputProps: {
                                    step: 0.01
                                }
                            }}
                            required
                            fullWidth
                            label="Price per unit"
                            name="price_per_unit"
                            type="number"
                            value={formValues.price_per_unit}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <TextField
                            // only accept integers
                            InputProps={{
                                inputProps: {
                                    step: 1
                                }
                            }}
                            required
                            fullWidth
                            label="Lead Time (days)"
                            name="lead_time"
                            type="number"
                            value={formValues.lead_time}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            { suppliers && (
                                <Autocomplete
                                    disablePortal
                                    multiple
                                    id="combo-box"
                                    name="main_supplier"
                                    options={suppliers}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => setSelectedSuppliers(value)}
                                    renderInput={(params) =>
                                        <TextField {...params} label={"Main Supplier(s)"} variant="standard"/>
                                    }
                                />
                            )}
                        </Grid>            
                        <Grid item xs={6}>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            >
                            Update Raw Material
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default RawMaterialPage;