import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Breadcrumbs, FormControlLabel,Typography, Box, Switch, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColorById, updateColor } from '../../features/colors/colorsSlice';
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

const ColorPage = () => {
    const [gradient, setGradient] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('id: ', id);
    const classes = useStyles();
    const dispatch = useDispatch();
    const color = useSelector((state) => state.colors.currentColor);
    console.log('currentColor: ', color);
    const [formValues, setFormValues] = useState({
        name_en: '',
        name_ro: '',
        display_color_code: null,
        gradient: false,
    });  

    useEffect(() => {
        dispatch(fetchColorById(id));
    }, [dispatch, id]);

    useEffect(() => {
            if (color) {
                setFormValues(color);
            }
        }, [color]);

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

    useEffect(() => {
        if (formValues.gradient) {
            setGradient(true);
        } else {
            setGradient(false);
        }
    }, [formValues.gradient]);

    useEffect(() => {
        if (gradient) {
            setFormValues((prev) => ({
                ...prev,
                gradient: true,
            }));
        } else {
            setFormValues((prev) => ({
                ...prev,
                gradient: false,
            }));
        }
    }, [gradient]);

    const handleBack = () => {
        navigate('/settings/colors/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateColor(formValues));
    }

    return (
        <Container
            maxWidth="md"
            style={{
                paddingTop: '2rem',
            }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'top'
                }}>
                    <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
                        <Button color="inherit" disabled>Settings</Button>
                        <Button color="inherit" onClick={handleBack}>Colors</Button>
                        <Button color="inherit" disabled>{formValues.name_en}</Button>
                    </Breadcrumbs>
                    {/* <Button variant="contained" color="primary" onClick={handleBack}
                        style={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                        }}
                        >
                        Back
                    </Button> */}
                    <div style={{
                        background: gradient ? `linear-gradient(180deg, ${formValues.display_color_code} 0%, #000000 100%)` : formValues.display_color_code,
                        width: '5rem',
                        height: '5rem',
                        borderRadius: '50%',
                        boxShadow: 'inset rgba(0, 0, 0, 0.2) -2px 1px 3px 1px, inset rgba(255, 255, 255, 0.5) 2px 1px 3px 1px',
                    }} />
                </div>
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
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={gradient}
                                        onChange={(event) => setGradient(event.target.checked)}
                                        name="gradient"
                                        color="primary"
                                    />
                                }
                                label="Gradient"
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
