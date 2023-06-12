import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addCategory } from '../../features/categories/categoriesSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    root: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
    },
    submitButton: {
        marginTop: theme.spacing(3),
    },
  }));

const NewCategory = ({onNewCategory}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [formValues, setFormValues] = useState({
        category_name: '',
        abbreviation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formValues to send to addCategory', formValues);
        dispatch(addCategory(formValues));
        setFormValues({
            name: '',
            abbreviation: '',
        });
        onNewCategory();
    };

return (
    <>
        <Container maxWidth="md">
            <Paper className={classes.root}>
                <Typography variant="h5" gutterBottom>
                    Add New Category
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={6}>
                            <TextField
                            fullWidth
                            label="Category Name"
                            name="name"
                            value={formValues.name || ''}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <TextField
                            fullWidth
                            label="Abbreviation"
                            name="abbreviation"
                            value={formValues.abbreviation || ''}
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
                                Add Category
                                </Button>
                            </Grid>
                    </Grid>
                    </form>
            </Paper>
        </Container>
    </>
);
};
  
export default NewCategory;