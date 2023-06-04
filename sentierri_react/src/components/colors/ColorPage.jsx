import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColorById, updateColor } from '../../features/colors/colorsSlice';
import { HexColorPicker } from 'react-colorful';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
    },
    submitButton: {
        marginTop: theme.spacing(3),
    },
}));

const ColorPage = () => {
    const { id } = useParams();
    console.log('id: ', id);
    const classes = useStyles();
    const dispatch = useDispatch();
    const color = useSelector((state) => state.colors.currentColor);
    console.log('currentColor: ', color);
    // use useSelector to get the color belonging to the id from the url
    // put code here
    const [formValues, setFormValues] = useState({
        name_en: '',
        name_ro: '',
        display_color_code: '',
    });  

    useEffect(() => {
        dispatch(fetchColorById(id));
    }, [dispatch, id]);

    useEffect(() => {
            if (color) {
                setFormValues(color);
            }
        }, [color]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateColor(formValues));
    }

    return (
        <Container maxWidth="md">
            <Paper className={classes.root}>
                <Typography variant="h5" gutterBottom>
                    Update Color
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={6}>
                            <TextField
                            fullWidth
                            label="Name (English)"
                            name="name_en"
                            value={formValues.name_en || ''}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <TextField
                            fullWidth
                            label="Name (Romanian)"
                            name="name_ro"
                            value={formValues.name_ro || ''}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <TextField
                            fullWidth
                            label="Display Color Code"
                            name="display_color_code"
                            value={formValues.display_color_code || ''}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <HexColorPicker
                                name="hex_color_code"
                                defaultValue={formValues.display_color_code || ''}
                                value={formValues.display_color_code || ''}
                                onChange={(color) => setFormValues((prev) => ({
                                    ...prev,
                                    display_color_code: color,
                                    hex_color_code: color,
                                }))}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            >
                            Update Color
                            </Button>
                        </Grid>
                    </Grid>
                    </form>
            </Paper>
        </Container>
    );
};

export default ColorPage;
