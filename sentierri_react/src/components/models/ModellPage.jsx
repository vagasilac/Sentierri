import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Avatar, Paper, Chip, Divider, Box, Tooltip, Tabs, Tab, Typography, Breadcrumbs, Grid, TextField, Button, Switch } from "@material-ui/core";
import { deleteMaterialLabelUrl } from '../../features/rawMaterials/rawMaterialsSlice';
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchModellById, updateModell } from "../../features/modells/modellsSlice";
import { fetchModTypeById } from "../../features/modTypes/modTypesSlice";
import { fetchStageById } from "../../features/stages/stagesSlice";
import { fetchModellColorsByModellId } from "../../features/modellColors/modellColorsSlice";
import { fetchModellSizesByModellId, clearModellSizes } from "../../features/modellSizes/modellSizesSlice";
import { fetchColors } from "../../features/colors/colorsSlice";
import { fetchSizes } from "../../features/sizes/sizesSlice";
import { SPO } from './SPO';
import { SInvoices_dummy } from './SInvoices_dummy';
import { QualityIssues_dummy } from './QualityIssues_dummy';
import { clearFileUrl, uploadFile } from '../../features/fileUpload/fileUploadSlice';
import ImageUpload from '../common/ImageUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import StraightenIcon from '@mui/icons-material/Straighten';

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
    const modellSizes = useSelector((state) => state.modellSizes.data);
    const { loading: colorsLoading, data: colors } = useSelector((state) => state.colors);
    const { loading: sizesLoading, data: sizes } = useSelector((state) => state.sizes);
    const modellColorsArray = modellColors.map(modellColor => modellColor.colorId);
    const modellSizesArray = modellSizes.map(modellSize => modellSize.sizeId);
    const [tabValue, setTabValue] = useState(0);
    const [colorsToDisplay, setColorsToDisplay] = useState([]);
    const [sizesToDisplay, setSizesToDisplay] = useState([]);
    const [prevColorsLoading, setPrevColorsLoading] = useState(colorsLoading);
    const [prevSizesLoading, setPrevSizesLoading] = useState(sizesLoading);
    console.log('modellColorsArray: ', modellColorsArray);
    console.log('colorstoDisplay: ', colorsToDisplay);
    console.log('colorsLoading: ', colorsLoading);
    console.log('colors: ', colors);
    console.log('modellSizesArray: ', modellSizesArray);
    console.log('sizesToDisplay: ', sizesToDisplay);
    console.log('sizesLoading: ', sizesLoading);
    console.log('sizes: ', sizes);
    
    useEffect(() => {
        console.log('useEffect() 0');
        dispatch(clearModellSizes());
    }, [dispatch, numId]);

    useEffect(() => {
        console.log('useEffect() modellSizesArray', modellSizesArray);
    }, [modellSizesArray]);

    useEffect(() => {
        console.log('useEffect() 1');
        if (numId && numId !== "") {
            dispatch(fetchModellById(numId));
            dispatch(fetchModellColorsByModellId(numId));
            dispatch(clearModellSizes()).then(() => dispatch(fetchModellSizesByModellId(numId)));
            dispatch(fetchColors());
            dispatch(fetchSizes());
        }
    }, [dispatch, numId]);
    
    console.log('modellSizesArray: ', modellSizesArray);

    useEffect(() => {
        console.log('useEffect() 2');
        if (currentModell && currentModell.parentModTypeId !== "") {    
            dispatch(fetchModTypeById(currentModell.parentModTypeId));
        }
        if (currentModell && currentModell.parentStageId !== "") {
            dispatch(fetchStageById(currentModell.parentStageId));
        }
    }, [dispatch, currentModell]);


    useEffect(() => {
        console.log('useEffect() 3');
        if (prevColorsLoading && !colorsLoading) {
            if (modellColorsArray.length > 0 && colors.length > 0) {
                const filteredColors = colors.filter(color => modellColorsArray.includes(color.id));
                setColorsToDisplay(filteredColors);
            }
            else {
                setColorsToDisplay([]);
            }
        }
        setPrevColorsLoading(colorsLoading);
      }, [modellColorsArray, colors, colorsLoading, prevColorsLoading]);

    useEffect(() => {
        console.log('useEffect() 4');
        if (prevSizesLoading && !sizesLoading) {
            if (modellSizesArray.length > 0 && sizes.length > 0) {
                const filteredSizes = sizes.filter(size => modellSizesArray.includes(size.id));
                setSizesToDisplay(filteredSizes);
            }
            else {
                setSizesToDisplay([]);
            }
        }
        setPrevSizesLoading(sizesLoading);
        }, [modellSizesArray, sizes, sizesLoading, prevSizesLoading]);

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
                    <Button color="inherit" onClick={handleBack} >Models</Button>
                    <Button color="inherit" disabled >{currentModell?.name}</Button>
                </Breadcrumbs>
                <Button variant="contained" color="primary" onClick={handleBack} style={{ marginBottom: '1rem', }} > Back </Button>
            </Box>
            <Grid container spacing={3}>
                {/* Main Card */}
                <Grid item xs={12} sm={3} >
                    <Paper className={classes.paper}>
                        {loading && <Typography variant="body1">Loading...</Typography>}
                        {currentModell && (<Typography variant="h4" gutterBottom>{currentModell?.name}</Typography>)}
                        <Divider />
                        {error && <Typography variant="body1">{error}</Typography>}
                        <Grid container spacing={3}>
                        {currentModell && (
                            <>
                                <Grid item xs={12} sm={6} style={{ marginTop: '1rem', }}>
                                    <Typography variant="body1">{currentModell?.description}</Typography>
                                    <Typography variant="body1">{currentModType?.name}</Typography>
                                    <Chip 
                                        color={ currentStage?.name === "Production" ? "secondary" : "default" }
                                        icon={ currentStage?.name === "Production" ? <CheckCircleIcon /> : null }
                                        label={currentStage?.name}
                                        style={{ marginTop: '1rem' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                                    <Tooltip title="The model is available in the shown number of color variations  " placement="top">
                                        <Chip
                                            avatar={<Avatar><ColorLensIcon/></Avatar>}
                                            label={modellColorsArray?.length}
                                            />
                                    </Tooltip>
                                    <Tooltip title="The model is available in the shown number of size variations  " placement="top">
                                        <Chip
                                            avatar={<Avatar><StraightenIcon/></Avatar>}
                                            label={modellSizesArray?.length}
                                            style={{ marginTop: '1rem' }}
                                            />
                                    </Tooltip>
                                </Grid>
                            </>
                        )}
                        </Grid>
                    </Paper>
                </Grid>
                {/* Color + Size filter */}
                <Grid item xs={12} sm={9}>
                    {/* Color filter */}
                    <Paper className={classes.paper}
                        style={{ paddingTop: '0.5rem' }}
                    >
                        {colorsToDisplay?.map((color, index) => (
                            <Chip
                                avatar=
                                    {<Avatar>
                                        <ColorLensIcon
                                            style={{ color: color?.display_color_code }}
                                        />
                                    </Avatar>}
                                key={index}
                                label={color?.name_en}
                                style={{ marginRight: '1rem', marginTop: '1rem'
                            }}
                                />
                            ))}
                    </Paper>
                    {/* Size filter */}
                    <Paper className={classes.paper}
                        style={{ paddingTop: '0.5rem' }}
                    >
                        {sizes?.map((size, index) => (
                            <Chip
                                key={index}
                                label={size?.size_ro}
                                style={{ 
                                    marginRight: '1rem', marginTop: '1rem',
                                    backgroundColor: modellSizesArray.includes(size.id) ? 'lightgreen' : 'default' 
                                }}
                            />
                        ))}
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