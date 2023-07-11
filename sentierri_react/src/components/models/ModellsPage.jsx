import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Container, Button, Breadcrumbs } from '@material-ui/core';
import DataTable from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchModells  } from '../../features/modells/modellsSlice';
import { fetchModTypes } from '../../features/modTypes/modTypesSlice';
import { fetchStages } from '../../features/stages/stagesSlice';
import { fetchColors } from '../../features/colors/colorsSlice';
import { fetchSizes } from '../../features/sizes/sizesSlice';
import { fetchModellColors } from '../../features/modellColors/modellColorsSlice';
import { fetchModellSizes } from '../../features/modellSizes/modellSizesSlice';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicSpeedDial from '../common/BasicSpeedDial';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <AddIcon />, name: 'Take Order', link: '/customers/cpos/new' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

const ModellsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  } 

  const transformData = (data) => {
    try {
      return data.map(item => ({ ...item }));
    } catch (error) {
      console.error(`Error transforming data: ${error}`);
      return [];
    }
  };
  
  const modTypes = useSelector(state => transformData(state.modTypes.data));
  const stages = useSelector(state => transformData(state.stages.data));
  const colors = useSelector(state => transformData(state.colors.data));
  const sizes = useSelector(state => transformData(state.sizes.data)); 
  const modellColors = useSelector(state => transformData(state.modellColors.data));
  const modellSizes = useSelector(state => transformData(state.modellSizes.data));
  const { loading: modellsLoading } = useSelector((state) => state.modells);
  const { loading: colorsLoading } = useSelector((state) => state.colors);
  const { loading: sizesLoading } = useSelector((state) => state.sizes);
  const { loading: modTypesLoading } = useSelector((state) => state.modTypes);
  const { loading: stagesLoading } = useSelector((state) => state.stages);
  const { loading: modellColorsLoading } = useSelector((state) => state.modellColors);
  const { loading: modellSizesLoading } = useSelector((state) => state.modellSizes);
  const isLoading = modellsLoading || colorsLoading || sizesLoading || modTypesLoading || stagesLoading || modellColorsLoading || modellSizesLoading;
  const prevModellsLoading = usePrevious(modellsLoading);
  const prevColorsLoading = usePrevious(colorsLoading);
  const prevSizesLoading = usePrevious(sizesLoading);
  const prevModTypesLoading = usePrevious(modTypesLoading);
  const prevStagesLoading = usePrevious(stagesLoading);
  const prevModellColorsLoading = usePrevious(modellColorsLoading);
  const prevModellSizesLoading = usePrevious(modellSizesLoading);

  const [modellColorNameMap, setModellColorNameMap] = useState({});
  const [modellSizeNameMap, setModellSizeNameMap] = useState({});
  const [modTypeNameMap, setModTypeNameMap] = useState({});
  const [stageNameMap, setStageNameMap] = useState({});

  const modells = useSelector(state => {
    try {
      return state.modells.data.map(modell => ({
        ...modell,
        parentModTypeId: modTypeNameMap[modell.parentModTypeId] || 'N/A',
        parentStageId: stageNameMap[modell.parentStageId] || 'N/A',
        colors: modellColorNameMap[modell.id]?.join(', ') || 'N/A',
        sizes: modellSizeNameMap[modell.id]?.join(', ') || 'N/A',
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
    dispatch(fetchColors())
    .then(() => dispatch(fetchModellColors()));
    dispatch(fetchSizes())
    .then(() => dispatch(fetchModellSizes()));
  }, [dispatch]);

  useEffect(() => {
    if (prevModTypesLoading && !modTypesLoading) {
      let newModTypeNameMap = { ...modTypeNameMap };
      modTypes.forEach(modType => {
        newModTypeNameMap[modType.id] = modType.name;
      });
      setModTypeNameMap(newModTypeNameMap);
    }
  }, [modTypes, modTypesLoading, prevModTypesLoading]);
  
  useEffect(() => {
    if (prevStagesLoading && !stagesLoading) {
      let newStageNameMap = { ...stageNameMap };
      stages.forEach(stage => {
        newStageNameMap[stage.id] = stage.name;
      });
      setStageNameMap(newStageNameMap);
    }
  }, [stages, stagesLoading, prevStagesLoading]);
  

  useEffect(() => {
    if (prevModellColorsLoading && !modellColorsLoading && !colorsLoading) {
      let newModellColorNameMap = {};
      modellColors.forEach(modellColor => {
        if (!newModellColorNameMap[modellColor.modellId]) {
          newModellColorNameMap[modellColor.modellId] = [];
        }
        const color = colors.find(color => color.id === modellColor.colorId);
        if (color) {
          newModellColorNameMap[modellColor.modellId].push(color.name_ro);
        }
      });
      setModellColorNameMap(newModellColorNameMap);
    }
  }, [modellColors, colors, prevModellColorsLoading, modellColorsLoading, colorsLoading]);

  useEffect(() => {
    if (prevModellSizesLoading && !modellSizesLoading && !sizesLoading) {
      let newModellSizeNameMap = {};
      modellSizes.forEach(modellSize => {
        if (!newModellSizeNameMap[modellSize.modellId]) {
          newModellSizeNameMap[modellSize.modellId] = [];
        }
        const size = sizes.find(size => size.id === modellSize.sizeId);
        if (size) {
          newModellSizeNameMap[modellSize.modellId].push(size.size_ro);
        }
      });
      setModellSizeNameMap(newModellSizeNameMap);
    }
  }, [modellSizes, sizes, prevModellSizesLoading, modellSizesLoading, sizesLoading]);

  
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
    { accessor: 'colors',
    Header: 'Colors',
    options: {
      filter: true,
      sort: true,
    }},
    { accessor: 'sizes',
    Header: 'Sizes',
    options: {
      filter: true,
      sort: true,
    }},
    { accessor: 'reserved stock',
    Header: 'Reserved Stock',
    options: {
      filter: true,
      sort: true,
    }},
    { accessor: 'available stock',
    Header: 'Available Stock',
    options: {
      filter: true,
      sort: true,
    }},
    { accessor: 'demand',
    Header: 'Demand',
    options: {
      filter: true,
      sort: true,
    }},
    { accessor: 'to produce',
    Header: 'To Produce',
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

  console.log('modells:', modells);
  console.log('modTypes:', modTypes);
  console.log('stages:', stages);
  console.log('modellColors:', modellColors);
  console.log('modellSizes:', modellSizes);
  console.log('colors:', colors);
  console.log('sizes:', sizes);

  return (
    <>
      <BasicSpeedDial actions={actions} />
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
        isLoading ? (
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
    </>
  );
};

export default ModellsPage;
