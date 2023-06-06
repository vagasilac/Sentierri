import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUMById, updateUM } from '../../features/UM/UMSlice';

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

const UMPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('id: ', id);
    const classes = useStyles();
    const dispatch = useDispatch();
    const UM = useSelector((state) => state.UM.currentUM);
    console.log('currentUM: ', UM);
    const [formValues, setFormValues] = useState({
        name_en: '',
        name_ro: '',
    });  

    useEffect(() => {
        dispatch(fetchUMById(id));
    }, [dispatch, id]);

    useEffect(() => {
            if (UM) {
                setFormValues(UM);
            }
        }, [UM]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleBack = () => {
        navigate('/settings/units-of-measure/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUM(formValues));
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
                    Update UM
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
                            Update UM
                            </Button>
                        </Grid>
                    </Grid>
                    </form>
            </Paper>
        </Container>
    );
}

export default UMPage;