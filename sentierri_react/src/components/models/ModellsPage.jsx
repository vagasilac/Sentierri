import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Button, Breadcrumbs } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchModells  } from '../../features/modells/modellsSlice';
import { fetchModTypes } from '../../features/modTypes/modTypesSlice';
import { fetchStages } from '../../features/stages/stagesSlice';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';

let modTypeNameMap = {};
let stageNameMap = {};

const ModellsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const modTypes = useSelector(state => {
    try {
      return state.modTypes.data.map(modType => ({
        ...modType,
      }));
    } catch (error) {
      console.error('Error transforming modTypes data:', error);
      return [];
    }
  });

  const stages = useSelector(state => {
    try {
      return state.stages.data.map(stage => ({
        ...stage,
      }));
    } catch (error) {
      console.error('Error transforming stages data:', error);
      return [];
    }
  });

  const modells = useSelector(state => {
    try {
      return state.modells.data.map(modell => ({
        ...modell,
        parentModTypeId: modTypeNameMap[modell.parentModTypeId] || 'N/A',
        parentStageId: stageNameMap[modell.parentStageId] || 'N/A',
      }));
    } catch (error) {
      console.error('Error transforming modells data:', error);
      return [];
    }
  });
  
  useEffect(() => {
    dispatch(fetchModells());
    dispatch(fetchModTypes());
    dispatch(fetchStages());
  }, [dispatch]);

  useEffect(() => {
    modTypes.forEach(modType => {
    modTypeNameMap[modType.id] = modType.name;
    });
  }, [modTypes]);

  useEffect(() => {
    stages.forEach(stage => {
    stageNameMap[stage.id] = stage.name;
    });
  }, [stages]);

  // columns for react-table
  const columns = [
    { accessor: 'name',
    Header: 'Name',
      options: {
        filter: true,
        sort: true,
      }},
    { accessor: 'parentModTypeId',
    Header: 'Type',
    options: {
      filter: true,
      sort: true,
    }},
    { accessor: 'parentStageId',
    Header: 'Stage',
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
                onClick={() => navigate(`/models/${row.original.id}`)}>
                  <VisibilityIcon />
              </Button>
            </div>
          )
      }
  ];

  return (
    <Container
        maxWidth="lg"
        style={{ paddingTop: '3rem', paddingBottom: '4rem', }}
      >
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
        <Button color="inherit" disabled>PLM</Button>
        <Button color="inherit" disabled>Models</Button>
      </Breadcrumbs>
      <Box style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography
            variant="h4"
            style={{ marginBottom: '2rem' }}
          >Models</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{marginBottom: '2rem'}}
          onClick={() => navigate('/models/new')}>Add New</Button>
      </Box>
      {
      modells?.loading || modells?.length == 0 ? (
        <CircularProgress
          style={{ marginLeft: '50%', marginTop: '2rem' }}
        />
      ) : modells?.length > 0 ? (
        <DataTable key={modells?.length} columns={columns} data={modells} />
      ) : (
          <p>No models found</p>
        )
      }
    </Container>
  );
};

export default ModellsPage;
