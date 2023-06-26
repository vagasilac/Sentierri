import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Tabs, Tab, CardHeader, Divider, Container, Grid, Breadcrumbs, Box, Typography, TextField, Button, FormControl, List, ListItem, ListItemText, ListItemAvatar, Avatar, InputLabel, Select, MenuItem, Paper, Card, CardMedia, } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { fetchSubCategories } from '../../features/subCategories/subCategoriesSlice';
import { fetchColors } from '../../features/colors/colorsSlice';
import { fetchSuppliers } from '../../features/suppliers/suppliersSlice';
import { fetchRawMaterials, addRawMaterial, updateRawMaterial, deleteMaterialLabelUrl } from '../../features/rawMaterials/rawMaterialsSlice';
import { addSupplierMaterial, fetchSupplierMaterialsByMaterialId } from '../../features/supplierMaterials/supplierMaterialsSlice';
import { fetchUMs } from '../../features/UM/UMSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Style } from '@material-ui/icons';
import QRBox from '../common/QRBox';
import ImageUpload from '../common/ImageUpload';
import { clearFileUrl, uploadFile } from '../../features/fileUpload/fileUploadSlice';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import CategoryIcon from '@mui/icons-material/Category';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StraightenIcon from '@mui/icons-material/Straighten';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PaidIcon from '@mui/icons-material/Paid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ModelTable from '../raw_materials/ModelTable';
import StockTable from '../raw_materials/StockTable';
import TransactionsTable from '../raw_materials/TransactionsTable';
import { useSwipeable } from 'react-swipeable';

// TODO: validation (duplicate material_id, name, etc., required fields, etc., numeric fields, etc.)

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
    cardGrid: {
        display: 'flex', justifyContent: 'space-between', backgroundColor: '#f5f5f5', alignItems: 'center', borderRadius: '2rem', paddingLeft: '2rem', paddingRight: '2rem', margin: '0.5rem' },

}));
  
const RawMaterialPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();
    const numId = Number(id);
    const rawMaterials = useSelector((state) => state.rawMaterials.data);
    const rawMaterial = useSelector(state => state.rawMaterials.data.find(rawMaterial => rawMaterial.id === numId));
    const colors = useSelector((state) => state.colors.data);
    const UMs = useSelector((state) => state.UM.data);
    const categories = useSelector((state) => state.categories.data);
    const subCategories = useSelector((state) => state.subCategories.data);
    const suppliers = useSelector((state) => state.suppliers.data);
    // const suppliersOfMaterial = useSelector((state) => state.supplierMaterials.data.filter(supplierMaterial => supplierMaterial.material_id === numId));
    const supplierMaterials = useSelector((state) => state.supplierMaterials.byMaterialId && state.supplierMaterials.byMaterialId[numId] ? state.supplierMaterials.byMaterialId[numId] : []);
    console.log('supplierMaterials', supplierMaterials);

    const [formValues, setFormValues] = useState({
        material_id: '',
        name: '',
        material_group: '',
        material_type: '',
        material_category: '',
        material_subcategory: '',
        color: '',
        supplier_color: '',
        size: '',
        roll_width: null,
        unit_of_measure: '',
        price_per_unit: '',
        lead_time: '',
        main_supplier: '',
        label_url: '',
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [key, setKey] = useState(Math.random());
    //set value of "loading, fileUrl, error" to null, then get it with useSelector from fileUploadSlice state
    const { loading, fileUrl, error } = useSelector((state) => state.fileUpload);   
    const [fileUploaded, setFileUploaded] = useState(false);
    const [file, setFile] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        dispatch(clearFileUrl());
        dispatch(fetchRawMaterials());
        dispatch(fetchColors());
        dispatch(fetchUMs());
        dispatch(fetchCategories());
        dispatch(fetchSubCategories());
        dispatch(fetchSuppliers());
        dispatch(fetchSupplierMaterialsByMaterialId(numId));
        console.log('Colors fetched - useEffect materials', colors);
    }, [dispatch]);

    useEffect(() => {
        const filteredSubCategories = subCategories.filter(
                (subCategory) => subCategory.parentCategoryId === selectedCategoryId
            );
            setFilteredSubCategories(filteredSubCategories);
            if (selectedCategoryId) {
            fetchSubCategories();
            };
    }, [selectedCategoryId]);

    useEffect(() => {
        rawMaterial &&         
            setFormValues(rawMaterial);
    }, [rawMaterial]);

    useEffect(() => {
        if (selectedSuppliers.length > 0) {
            selectedSuppliers.forEach(supplier => {
                console.log({ supplierId: supplier.id, materialId: currentId })});
        }
    }, [selectedSuppliers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        // set selectedCategory to the id value of the selected category
        if (name === 'material_category') {
            setSelectedCategoryId(value);
            console.log('selectedCategoryId', selectedCategoryId);
        };
        if (name === 'color') {
            const selectedColor = colors.find((color) => color.name_ro === value);
            setFormValues((prev) => ({
                ...prev,
                color: selectedColor.name_ro,
            }));
        }
        if (name === 'unit_of_measure') {
            const selectedUM = UMs.find((UM) => UM.abbreviation === value);
            setFormValues((prev) => ({
                ...prev,
                unit_of_measure: selectedUM.abbreviation,
            }));
        }
        else {
            setFormValues((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handlers = useSwipeable({
        onSwiped: (eventData) => console.log("User Swiped!", eventData),
        delta: 30,
        trackMouse: true,
      });

    const handleBack = () => {
        navigate('/raw-materials');
    };
   
    const handleFileUpload = () => {
        dispatch(uploadFile(file));
    };

    useEffect(() => {
        if (formValues.label_url) {
            setFileUploaded(true);
        }
    }, [formValues.label_url]);

    useEffect(() => {
        if (fileUrl) {
            setFormValues((prev) => ({ ...prev, label_url: fileUrl }));
            setFileUploaded(true);
        }
    }, [fileUrl, rawMaterial]);

    const handleImageDelete = () => {
        dispatch(deleteMaterialLabelUrl(numId, formValues.label_url));
        dispatch(clearFileUrl());
        setFileUploaded(false);
        setFormValues(prev => ({ ...prev, label_url: null }));
        setKey(Math.random());
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            dispatch(updateRawMaterial(numId, formValues))
            alert('Raw material updated successfully');
            selectedSuppliers.map(supplier => {
                return dispatch(addSupplierMaterial(supplier.id, currentId))});
            navigate('/raw-materials');
        }
        catch (err) {
            alert('Error updating raw material');
        }
    };
   

    return (
        <Container style={{ paddingBottom: '2rem', paddingTop: '3rem', }} >
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
                        <Button color="inherit" disabled>Inventory</Button>
                        <Button color="inherit" onClick={handleBack}>Raw Materials</Button>
                        <Button color="inherit" disabled>{formValues.name}</Button>
                    </Breadcrumbs>
                <Button variant="contained" color="primary" onClick={handleBack}
                    style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                    }}
                    >
                    Back
                </Button>
            </Box>
            <Grid container spacing={3} style={{display: 'flex',flexDirection: 'row', width: '100%'}}>
                {/* Main Content */}
                <Grid item xs={12} md={9}>
                    <Grid container spacing={3}>
                        {/* Details card */}
                        <Grid item xs={12}>
                            <Card className={classes.root}>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CardHeader
                                            title={formValues.name}
                                            subheader={formValues.material_id}
                                            />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit}
                                            style={{
                                                marginRight: '1rem',
                                            }}
                                            >
                                                Update
                                        </Button>
                                    </Box>
                                    <Divider />
                                    <CardContent
                                        style={{
                                            // display: 'flex',
                                            // flexDirection: 'row',
                                            // maxHeight: '20rem',
                                            // overflow: 'auto',
                                        }}
                                    >
                                    <div {...handlers}>
                                        <List
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                flexWrap: 'nowrap',
                                                overflowX: 'auto',
                                                // hide scrollbar
                                                scrollbarWidth: 'none',
                                                msOverflowStyle: 'none',
                                                '&::-webkit-scrollbar': {
                                                    width: '0 !important',
                                                    display: 'none !important',
                                                },
                                            }}
                                        >
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                    <Diversity2Icon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={formValues.material_group}
                                                    // secondary={secondary ? 'Secondary text' : null}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                    <CategoryIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={formValues.material_category}
                                                    secondary={formValues.material_subcategory}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ColorLensIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={formValues.color}
                                                    secondary={formValues.supplier_color}
                                                />
                                            </ListItem>
                                        {/* </List>
                                        <List> */}
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <SquareFootIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={formValues.size}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <StraightenIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={formValues.roll_width}
                                                    />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <DateRangeIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={formValues.lead_time}
                                                    />
                                            </ListItem>
                                        {/* </List>
                                        <List> */}
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <PaidIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={formValues.price_per_unit}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <LocalShippingIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={formValues.main_supplier}
                                                />
                                            </ListItem>
                                        </List>
                                    </div>
                                    </CardContent>
                            </Card>
                        </Grid>
                        {/* table with three tabs: "Models", "Stock", "Transactions" */}
                        <Grid item xs={12}>
                            <Paper
                                elevation={4}
                                className={classes.paper}
                                style={{ 
                                    padding: '3rem',
                                    marginVertical: '2rem',
                                }}
                            >
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
                                        <Tab label="Models" />
                                        <Tab label="Stock" />
                                        <Tab label="Transactions" />
                                    </Tabs>
                                </Box>
                                {tabValue === 0 && (
                                    <Box p={3}>
                                        <ModelTable />
                                    </Box>
                                )}
                                {tabValue === 1 && (
                                    <Box p={3}>
                                        <StockTable />
                                    </Box>
                                )}
                                {tabValue === 2 && (
                                    <Box p={3}>
                                        <TransactionsTable />
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Side panel - QR, label */}
                <Grid item xs={12} md={3}>
                    <Grid container
                        direction="column"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <QRBox title="Internal Label" barcode={formValues.material_id} />
                        </Grid>
                        <Grid item xs={12}>
                            <ImageUpload
                                key={key}
                                fileUrlRead={formValues.label_url}
                                title={"Supplier Label"}
                                loading={loading}
                                onFileUpload={handleFileUpload}
                                onImageDelete={handleImageDelete}
                                uploaded={fileUploaded}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default RawMaterialPage;