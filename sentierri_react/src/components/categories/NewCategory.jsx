import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addCategory } from '../../services/categoryService';

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
  }));

const NewCategory = ({onNewCategory}) => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState({
        category_name: '',
        abbreviation: '',
    });

    // Here REDUX should be used to get the list of categories and subcategories and their abbreviations
    const subcatAbbrev = {
        Tesatura_costum: 'TES',
        Tesature_sacou: 'TES',
        Tesature_vesta: 'TES',
        Fermoar: 'FERM',
        Captuseala: 'CAPT',
        Umeras: 'UM',
        Placuta: 'PL',
        Indicator_marimi: 'INDM',
        Cuglu: 'CUG',
        Perinite_Ginette: 'PER',
        Termocolant: 'ADEZ',
        Valterm: 'VALT',
        Banda_extrafor: 'BANDA-EXTRAFOR',
        Insertii_inguste: 'INSERtII-INGUSTE',
        Punga_buzunar: 'PUNGA-BUZUNAR',
        Nasturi: 'NAST',
        Broderie: 'BROD',
        Etichete: 'ETIC',
        Snur_eticheta: 'SNUR-ETICHETA',
        Huse: 'HUSE',
        Banda_betelie: 'BANDA-BETELIE',
        Capse: 'CPS',
        Catarama: 'CAT',
        Aplicatie_771: 'APLICA-771',  
        Capat_cordon: 'CAPCORDON'}

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formValues to send to addCategory', formValues);
        const success = await addCategory
        (formValues);
        if (success) {
        alert('Category added successfully');
        setFormValues({
            name: '',
            abbreviation: '',
        });
        onNewCategory();
        } else {
        alert('Error adding category');
        }
    };

    return (
        <Container>
        <Typography variant="h4">Add New Category</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}> 
                    <TextField
                    required
                    fullWidth
                    label="Category Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}> 
                    <TextField
                    required
                    fullWidth
                    label="Abbreviation"
                    name="abbreviation"
                    value={formValues.abbreviation}
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
                    Add Category
                    </Button>
                </Grid>
            </Grid>
        </form>
        </Container>
    );
};
  
export default NewCategory;