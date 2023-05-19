import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { updateRawMaterial } from '../../services/rawMaterialService';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const RawMaterialUpdateForm = ({ formValues }) => {
    const id = formValues.id;
    const [newFormValues, setNewFormValues] = useState({
        material_id: formValues.material_id,
        name: formValues.name,
        material_group: formValues.material_group,
        material_type: formValues.material_type,
        material_category: formValues.material_category,
        material_subcategory: formValues.material_subcategory,
        color: formValues.color,
        size: formValues.size,
        unit_of_measure: formValues.unit_of_measure,
        supplier_color: formValues.supplier_color,
        roll_width: formValues.roll_width,
        price_per_unit: formValues.price_per_unit,
        lead_time: formValues.lead_time,
        main_supplier: formValues.main_supplier,
    });
    const classes = useStyles();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFormValues({ ...newFormValues, [name]: value });
        console.log('id', id);
    };

    const handleSubmit = async (e) => {
        let id = formValues.id;
        e.preventDefault();
        console.log('id submit', id);
        const success = await updateRawMaterial(id, newFormValues);
        if (success) {
        alert('Raw material updated successfully');
        navigate('/raw-materials');
        } else {
        alert('Error updating raw material');
        }
    };

    return (
    <Container>
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
                value={newFormValues.name}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Material Group"
                name="material_group"
                value={newFormValues.material_group}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Material Type"
                name="material_type"
                value={newFormValues.material_type}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Material Category"
                name="material_category"
                value={newFormValues.material_category}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Material Subcategory"
                name="material_subcategory"
                value={newFormValues.material_subcategory}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Color"
                name="color"
                value={newFormValues.color}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Supplier Color"
                name="supplier_color"
                value={newFormValues.supplier_color}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Size"
                name="size"
                value={newFormValues.size}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Roll Width"
                name="roll_width"
                value={newFormValues.roll_width}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Unit of Measure"
                name="unit_of_measure"
                value={newFormValues.unit_of_measure}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Price per Unit"
                name="price_per_unit"
                value={newFormValues.price_per_unit}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Lead Time"
                name="lead_time"
                value={newFormValues.lead_time}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                required
                fullWidth
                label="Main Supplier"
                name="main_supplier"
                value={newFormValues.main_supplier}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
            </Grid>
        </Grid>
    </form>
    </Container>
    );
};

export default RawMaterialUpdateForm;
