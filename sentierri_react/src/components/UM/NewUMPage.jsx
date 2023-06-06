import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { SketchPicker } from 'react-color';
import { fetchUMs, addUM } from '../../features/UM/UMSlice';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Switch,
    CircularProgress,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));

const NewUMPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [submissionSuccessful, setSubmissionSuccessful] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [formValues, setFormValues] = useState({
        name_en: null,
        name_ro: null,
        abbreviation: null,
    });  

    useEffect(() => {
        dispatch(fetchUMs());
    }, [dispatch]);

    useEffect(() => {
        if (!openSnackbar) {
            setSubmissionSuccessful(false);
        }
    }, [openSnackbar]);
    
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
        dispatch(addUM(formValues));
        setSubmissionSuccessful(true);
        setOpenSnackbar(true);
        navigate('/settings/units-of-measure/');
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    

    return (
        <>
            <Container maxWidth="md">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Button variant="contained" color="primary" onClick={handleBack}
                        style={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                        }}
                        >
                        Back
                    </Button>
                </div>
                <Paper className={classes.root}>
                    <Typography variant="h5" gutterBottom>
                        Add New UM
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item sm={12} md={6}>
                                <TextField
                                fullWidth
                                label="Name (RO)"
                                name="name_ro"
                                value={formValues.name_ro || ''}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <TextField
                                fullWidth
                                label="Name (EN)"
                                name="name_en"
                                value={formValues.name_en || ''}
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
                                Save UM
                                </Button>
                            </Grid>
                        </Grid>
                        </form>
                </Paper>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    UM was successfully added!
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewUMPage;

