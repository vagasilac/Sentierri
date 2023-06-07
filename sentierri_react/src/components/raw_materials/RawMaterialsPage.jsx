import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { getAllMaterials } from '../../services/rawMaterialService';
import { useNavigate } from 'react-router-dom';

const RawMaterialsPage = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRawMaterials = async () => {
      const materials = await getAllMaterials();
      setRawMaterials(materials);
      console.log('Raw materials fetched - useEffect materials', materials);
      console.log('Raw materials fetched - useEffect rawmaterials:', rawMaterials);
    };
    fetchRawMaterials();
  }, []);

  // columns for react-table
  const columns = [
    { accessor: 'material_id',
      Header: 'Material ID',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'name',
      Header: 'Name',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'material_group',
      Header: 'Group',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'material_type',
      Header: 'Type',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'material_category',
      Header: 'Category',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'material_subcategory',
      Header: 'Subcategory',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'color',
      Header: 'Color',
      options: {
        filter: true,
        sort: true,
      }},
      { accessor: 'supplier_color',
      Header: 'Supplier color',
      options: {
        filter: true,
        sort: true,
        }},
    { accessor: 'size',
      Header: 'Size',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'roll_width',
      Header: 'Width',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'unit_of_measure',
      Header: 'UM',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'price_per_unit',
      Header: 'Price per unit',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'lead_time',
      Header: 'Lead time',
      options: {
        filter: true,
        sort: true,
       }},
    { accessor: 'main_supplier',
      Header: 'Main\nsupplier',
      options: {
        filter: true,
        sort: true,
       }},
    { Header: 'Actions',
      Cell: ({row}) => (
        <div>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => navigate(`/raw_materials/${row.original.id}`)}>View</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => console.log(`Delete ${row.original.material_id}`)}>Delete</Button>
        </div>
      )
  }
  ];

  return (
      <Container
        maxWidth="xl"
        style={{ paddingTop: '3rem', paddingBottom: '4rem', marginLeft: '3rem' }}
      >
        <Box>
          <Box style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography
              variant="h4"
              style={{ marginBottom: '2rem' }}
            >
              Raw Materials</Typography>
              <Button
                variant="contained"
                color="primary"
                style={{marginBottom: '2rem'}}
                onClick={() => navigate('/suppliers/new')}>Add New</Button>
          </Box>
          <DataTable key={rawMaterials.length} columns={columns} data={rawMaterials} />
        </Box>
    </Container>
  );
};

export default RawMaterialsPage;