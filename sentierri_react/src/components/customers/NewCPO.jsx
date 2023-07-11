import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Breadcrumbs, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, Box, } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


// TODO: validation (duplicate material_id, name, etc., required fields, etc., numeric fields, etc.)

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
}));

const NewCPO = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Settings</Typography>
                <Typography color="textPrimary">CPOs</Typography>
                <Typography color="textPrimary">New CPO</Typography>
            </Breadcrumbs>
            <Typography variant="h4" component="h1" gutterBottom>
                New CPO
            </Typography>
            <Paper variant="outlined">
            </Paper>
        </Container>
    );
};

export default NewCPO;
                    
