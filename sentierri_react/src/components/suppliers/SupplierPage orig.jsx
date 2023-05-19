import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { getSupplier } from '../../services/supplierService';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const SupplierPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    const fetchSupplier = async () => {
      const fetchedSupplier = await getSupplier(id);
      setSupplier(fetchedSupplier);
      console.log('Supplier fetched - useEffect supplier', fetchedSupplier);
    };
    fetchSupplier();
  }, [id]);

  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        Supplier Details
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(supplier).map(([key, value]) => (
          <Grid item xs={6} key={key}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{key}</Typography>
              <Typography variant="body1">{value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SupplierPage;