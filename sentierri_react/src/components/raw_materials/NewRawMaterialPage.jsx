import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addRawMaterial } from '../../services/rawMaterialService';
import { getAllCategories } from '../../services/categoryService';
import { getAllSubCategories } from '../../services/subCategoryService';
import { getAllSuppliers } from '../../services/supplierService';
import ComboBox from '../common/ComboBox';

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
  }));



const NewRawMaterialPage = () => {
 
    const classes = useStyles();
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
        roll_width: '',
        unit_of_measure: '',
        price_per_unit: '',
        lead_time: '',
        main_supplier: '',
    });

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getAllCategories();
            setCategories(categories);
            console.log('Categories fetched - useEffect materials', categories);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubCategories = async () => {
            const subCategories = await getAllSubCategories(selectedCategoryId);
            console.log('subCategories fetched in Category', subCategories);

            const filteredSubCategories = subCategories.filter(
                (subCategory) => subCategory.parentCategoryId === selectedCategoryId
            );
            console.log('filteredSubCategories', filteredSubCategories);
            setFilteredSubCategories(filteredSubCategories);
        };
            if (selectedCategoryId) {
            fetchSubCategories();
            };
    }, [selectedCategoryId]);

    useEffect(() => {
        const fetchSuppliers = async () => {
          const suppliers = await getAllSuppliers();
            setSuppliers(suppliers.map((supplier) => supplier.name));
          console.log('Suppliers fetched - useEffect suppliers', suppliers);
        };
        fetchSuppliers();
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        // set selectedCategory to the id value of the selected category
        if (name === 'material_category') {
            setSelectedCategoryId(value);
            console.log('selectedCategoryId', selectedCategoryId);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addRawMaterial(formValues);
        if (success) {
        alert('Raw material added successfully');
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
            roll_width: '',
            unit_of_measure: '',
            price_per_unit: '',
            lead_time: '',
            main_supplier: '',
        });
        } else {
        alert('Error adding raw material');
        }
    };

    return (
        <Container>
        <Typography variant="h4">Add New Raw Material</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={6}> 
                    <TextField
                    required
                    fullWidth
                    label="Material ID"
                    name="material_id"
                    value={formValues.material_id}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}> 
                    <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    fullWidth
                    label="Group"
                    name="material_group"
                    value={formValues.material_group}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    fullWidth
                    label="Type"
                    name="material_type"
                    value={formValues.type}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <FormControl required fullWidth>
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
                <Grid item xs={6}>
                    <TextField
                    required
                    fullWidth
                    label="Color"
                    name="color"
                    value={formValues.color}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    fullWidth
                    label="Supplier Color"
                    name="supplier_color"
                    value={formValues.supplier_color}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
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
                Only show the roll width field if the type is roll
                */}
                <Grid item xs={6}>
                    <TextField
                    required
                    fullWidth
                    label="Roll Width"
                    name="roll_width"
                    type="number"
                    value={formValues.roll_width}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    fullWidth
                    label="UM"
                    name="unit_of_measure"
                    value={formValues.unit_of_measure}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    fullWidth
                    label="Price per unit"
                    name="price_per_unit"
                    type="number"
                    value={formValues.price_per_unit}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    required
                    fullWidth
                    label="Lead Time (days)"
                    name="lead_time"
                    type="number"
                    value={formValues.lead_time}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ComboBox options={suppliers} label="Main Supplier"/>
                </Grid>            
                <Grid item xs={6}>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    >
                    Add Raw Material
                    </Button>
                </Grid>
            </Grid>
        </form>
        </Container>
    );
};
  
export default NewRawMaterialPage;