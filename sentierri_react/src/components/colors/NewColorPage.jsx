import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColors, addColor } from '../../features/colors/colorsSlice';
import { SketchPicker } from 'react-color';


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

const NewColorPage = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const colors = useSelector((state) => state.colors);
    const [formValues, setFormValues] = useState({
        name_en: '',
        name_ro: '',
        display_color_code: null,
    });  

    useEffect(() => {
        dispatch(fetchColors());
    }, [dispatch]);

    const [colorPickerValue, setColorPickerValue] = useState('');

    useEffect(() => {
        setColorPickerValue(formValues.display_color_code);
    }, [formValues.display_color_code]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleBack = () => {
        navigate('/settings/colors/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addColor(formValues));
    }

    return (
        <Container maxWidth="md">
            <Button variant="contained" color="primary" onClick={handleBack}
                style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
                >
                Back
            </Button>
            <Paper className={classes.root}>
                <Typography variant="h5" gutterBottom>
                    Add New Color
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
                            onChange={(e) => {
                                handleChange(e);
                                setColorPickerValue(e.target.value);
                            }}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                        {/* if formValues.display_color_code is loaded show this */}
                        { formValues.display_color_code && (
                            <SketchPicker
                                color={formValues.display_color_code}
                                onChange={(color) => {
                                    setFormValues((prev) => ({
                                        ...prev,
                                        display_color_code: color.hex,
                                    }));
                                }}
                            />
                        )
                        || ( <CircularProgress /> )
                        }
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            >
                            Save Color
                            </Button>
                        </Grid>
                    </Grid>
                    </form>
            </Paper>
        </Container>
    );
};

export default NewColorPage;
