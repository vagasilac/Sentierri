import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addSubCategory } from '../../services/subCategoryService';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
  }));

const NewSubCategory = ({onNewSubCategory}) => {
    const { id } = useParams();
    const classes = useStyles();
    const [formValues, setFormValues] = useState({
        subCategory_name: '',
        parentCategoryId: id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formValues to send to addSubCategory', formValues);
        const success = await addSubCategory(formValues);
        if (success) {
        alert('SubCategory added successfully');
        setFormValues({
            name: '',
            parentCategoryId: id,
        });
        onNewSubCategory();
        } else {
        alert('Error adding subcategory');
        }
    };

    return (
        <Container>
        <Typography
            padding-top="20px"
            variant="h6"
            gutterBottom>
            Add New Subcategory
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}> 
                    <TextField
                    required
                    fullWidth
                    label="Subcategory Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    >
                    Add Subcategory
                    </Button>
                </Grid>
            </Grid>
        </form>
        </Container>
    );
};
  
export default NewSubCategory;