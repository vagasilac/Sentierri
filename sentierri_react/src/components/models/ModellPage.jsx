import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Paper, Chip, Divider, Box, Tabs, Tab, Typography, Breadcrumbs, Grid, TextField, Button, Switch } from "@material-ui/core";
import { deleteMaterialLabelUrl } from '../../features/rawMaterials/rawMaterialsSlice';
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchModellById, updateModell } from "../../features/modells/modellsSlice";
import { fetchModTypeById } from "../../features/modTypes/modTypesSlice";
import { fetchStageById } from "../../features/stages/stagesSlice";
import { fetchModellColorsByModellId } from "../../features/modellColors/modellColorsSlice";
import { fetchColors } from "../../features/colors/colorsSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SPO } from './SPO';
import { SInvoices_dummy } from './SInvoices_dummy';
import { QualityIssues_dummy } from './QualityIssues_dummy';
import { clearFileUrl, uploadFile } from '../../features/fileUpload/fileUploadSlice';
import ImageUpload from '../common/ImageUpload';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(3),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));

const ModellPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const numId = Number(id);
    console.log('numId: ', numId);
    const { currentModell, loading, error } = useSelector((state) => state.modells);
    const { currentModType } = useSelector((state) => state.modTypes);
    const { currentStage } = useSelector((state) => state.stages);
    const modellColors = useSelector((state) => state.modellColors.data);
    const colors = useSelector((state) => state.colors.data);
    const modellColorsArray = modellColors.map(modellColor => modellColor.colorId);
    const [tabValue, setTabValue] = useState(0);
    const [colorsToDisplay, setColorsToDisplay] = useState([]);
    console.log('colorsToDisplay: ', colorsToDisplay);
    console.log('colors: ', colors);
    
    useEffect(() => {
        if (numId && numId !== "") {
            dispatch(fetchModellById(numId));
            dispatch(fetchModellColorsByModellId(numId));
            dispatch(fetchColors());
        }
    }, [dispatch, numId]);
    
    useEffect(() => {
        if (currentModell && currentModell.parentModTypeId !== "") {    
            dispatch(fetchModTypeById(currentModell.parentModTypeId));
        }
        if (currentModell && currentModell.parentStageId !== "") {
            dispatch(fetchStageById(currentModell.parentStageId));
        }
    }, [dispatch, currentModell]);



    // FILE UPLOAD EVENT HANDLERS
    const handleFileUpload = () => {
        dispatch(uploadFile(file));
    };

    const handleImageDelete = () => {
        dispatch(deleteMaterialLabelUrl(numId, formValues.label_url));
        dispatch(clearFileUrl());
        setFileUploaded(false);
        setFormValues(prev => ({ ...prev, label_url: null }));
        setKey(Math.random());
    };

    // TAB EVENT HANDLERS
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleBack = () => {
        navigate('/models');
    };

    console.log('currentModell.parentModTypeId: ', currentModell?.parentModTypeId);
    console.log('currentModell.parentStageId: ', currentModell?.parentStageId);
    console.log('modellColors: ', modellColors);
    console.log('modellColorsArray: ', modellColorsArray);

    return (
        <Container
            maxWidth="xl"
            style={{ paddingTop: '3rem', paddingBottom: '4rem', marginLeft: '1rem' }}
        >
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
                    <Button color="inherit" disabled>PLM</Button>
                    <Button color="inherit" link="/models/" >Models</Button>
                    <Button color="inherit" disabled >{currentModell?.name}</Button>
                </Breadcrumbs>
                <Button variant="contained" color="primary" onClick={handleBack} style={{ marginBottom: '1rem', }} > Back </Button>
            </Box>
            <Grid container spacing={3}>
                {/* Main Card */}
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>
                        {loading && <Typography variant="body1">Loading...</Typography>}
                        {currentModell && (<Typography variant="h4" gutterBottom>{currentModell?.name}</Typography>)}
                        <Divider />
                        {error && <Typography variant="body1">{error}</Typography>}
                        {currentModell && (
                            <Box style={{ marginTop: '1rem', }} >
                                <Typography variant="body1">{currentModell?.description}</Typography>
                                <Typography variant="body1">{currentModType?.name}</Typography>
                                <Chip 
                                    color={ currentStage?.name === "Production" ? "secondary" : "default" }
                                    icon={ currentStage?.name === "Production" ? <CheckCircleIcon /> : null }
                                    label={currentStage?.name}
                                    style={{ marginTop: '1rem', }}
                                    />
                            </Box>
                        )}
                    </Paper>
                </Grid>
                {/* Color + Size filter */}
                <Grid item xs={12} sm={9}>
                    {/* Color filter */}
                    <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>Colors</Typography>
                        <Grid container spacing={3}>
                            {colors?.map((color, index) => (
                            <Grid item xs={3} key={index}>
                                <div style={{ backgroundColor: color?.value, height: '100px', width: '100px' }}></div>
                            </Grid>
                            ))}
                        </Grid>
                    </Paper>
                    {/* Size filter */}
                    <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>Sizes</Typography>
                    </Paper>
                </Grid>
                {/* Tables with Tabs */}
                <Grid item xs={12} sm={8}>
                    <Paper
                        elevation={4}
                        className={classes.paper}
                        style={{ 
                            padding: '3rem',
                            marginVertical: '2rem',
                        }}
                    >
                        {/* Tabs */}
                        <Box
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                            style={{
                                marginBottom: '2rem',
                            }}
                        >
                            <Tabs value={tabValue}
                            indicatorColor="primary"
                            textColor="primary"

                            onChange={handleTabChange}
                            >
                                <Tab label="Supplier Purchase Orders" />
                                <Tab label="Supplier Invoices" />
                                <Tab label="Quality Issues" />
                            </Tabs>
                        </Box>
                        {/* Tab Panel - ... */}
                        {tabValue === 0 && (
                            <Box p={3}>
                                <SPO />
                            </Box>
                        )}
                        {/* Tab Panel - ... */}
                        {tabValue === 1 && (
                            <Box p={3}>
                                <SInvoices_dummy />    
                            </Box>
                        )}
                        {/* Tab Panel - ... */}
                        {tabValue === 2 && (
                            <Box p={3}>
                                <QualityIssues_dummy />
                            </Box>
                        )}
                    </Paper>
                </Grid>
                {/* Side panel: Summary + Photo */}
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper} style={{marginBottom: '2rem'}}>
                        <Typography variant="h5" gutterBottom>Summary</Typography>
                    </Paper>
                    <ImageUpload
                                // key={key}
                                // fileUrlRead={formValues.label_url}
                                title={"Supplier Label"}
                                loading={loading}
                                onFileUpload={handleFileUpload}
                                onImageDelete={handleImageDelete}
                                // uploaded={fileUploaded}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ModellPage;