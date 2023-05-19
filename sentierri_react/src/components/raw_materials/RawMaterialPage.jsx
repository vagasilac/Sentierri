import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { getRawMaterial } from '../../services/rawMaterialService';
import { useParams } from 'react-router-dom';
import Modal from '../common/Modal';
import RawMaterialUpdateForm from './RawMaterialUpdateForm';

const RawMaterialPage = () => {
    const [rawMaterial, setRawMaterial] = useState([]);
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };

  useEffect(() => {
    // fetch raw material data based on materialId
    const fetchRawMaterial = async (id) => {
        const material = await getRawMaterial(id);
        setRawMaterial(material);
        console.log('material', material);
        console.log('Raw material id fetched - useEffect rawmaterial:', rawMaterial);
    };
    fetchRawMaterial(id);
    }, []);

// Grid for displaying the raw material data
    return (
        <>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Name: {rawMaterial.name}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Material ID: {rawMaterial.material_id}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Group: {rawMaterial.material_group}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Category: {rawMaterial.material_category}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Subcategory: {rawMaterial.material_subcategory}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Type: {rawMaterial.material_type}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Color: {rawMaterial.color}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Supplier Color: {rawMaterial.supplier_color}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Size: {rawMaterial.size}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Roll width: {rawMaterial.roll_width}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Unit of measure: {rawMaterial.unit_of_measure}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Supplier: {rawMaterial.main_supplier}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Lead Time: {rawMaterial.lead_time} days
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Price per unit: {rawMaterial.price_per_unit}
                </Typography>
                    
                <Button variant="contained" color="primary" href="/raw-materials">
                    Back
                </Button>
                {/* onclick of edit button open modal with the raw material data */}
                <Button variant="contained" color="primary" onClick={
                    () => {
                        setOpen(true);
                    }
                }>
                    Edit
                </Button>
            </Container>
            <Modal
                open={open}
                onClose={onClose}
                title="Edit Raw Material"
                >
                <RawMaterialUpdateForm
                    onClose={onClose}
                    formValues={rawMaterial}
                    />
            </Modal>
        </>
    );
};

export default RawMaterialPage;