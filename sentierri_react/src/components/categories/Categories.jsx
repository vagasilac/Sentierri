import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import DataTable_cat from '../common/DataTable_cat';
import { getAllCategories } from '../../services/categoryService';
import NewCategory from './NewCategory';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
      console.log('Categories fetched',  categories);
    };
    fetchCategories();
  }, [reload]);

  const handleNewCategory = () => {
    setReload(!reload);
  };

  const columns = [
    { accessor: 'name',
      Header: 'Category Name',
      options: {
        filter: true,
        sort: true,
      }},
      { accessor: 'abbreviation',
      Header: 'Abbreviation',
      options: {
        filter: true,
        sort: true,
      }},
  ];

  return (
    <>
      <Container>
        <Typography variant="h4">Categories</Typography>
        <DataTable_cat key={categories.length} columns={columns} data={categories} />
      </Container>
      <NewCategory onNewCategory={handleNewCategory} />
    </>
  );
};

export default Categories;