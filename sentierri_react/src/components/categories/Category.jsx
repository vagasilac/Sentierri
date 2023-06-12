import React, { useState, useEffect } from 'react';
import { Container, Typography, Breadcrumbs, Box, Paper, Button, List, Grid, Card, CardContent, CardActions } from '@material-ui/core';
import { getCategory } from '../../services/categoryService';
import { useParams, useNavigate } from 'react-router-dom';
import SubCategories from './SubCategories';
import NewSubCategory from './NewSubCategory';
import { getAllSubCategories } from '../../services/subCategoryService';

const Category = () => {
    const [category, setCategory] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            const category = await getCategory(id);
            setCategory(category);
            console.log('category', category);
        };

        const fetchSubCategories = async () => {
            const subCategories = await getAllSubCategories(id);
            console.log('subCategories fetched in Category', subCategories);

            const filteredSubCategories = subCategories.filter(
                (subCategory) => subCategory.parentCategoryId === parseInt(id)
            );
            console.log('filteredSubCategories', filteredSubCategories);
            setFilteredSubCategories(filteredSubCategories);
            setLoading(false);
        };

        fetchCategory(id);
        fetchSubCategories(id);
    }, [reload]);

    const handleNewSubCategory = () => {
        setReload(!reload);
    };
    
    const handleBack = () => {
        navigate(-1);
    };        

    return (
        <>
            <Container
                maxWidth="lg"
                style={{ paddingTop: '3rem', paddingBottom: '4rem' }}
            >
                <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
                    <Button color="inherit" disabled>Settings</Button>
                    <Button color="inherit" onClick={handleBack}>Categories</Button>
                    <Button color="inherit" disabled>{category.name}</Button>
                </Breadcrumbs>
                <Box
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography variant="h4" style={{ marginBottom: '2rem' }}>
                    {category.name} | {category.abbreviation}</Typography>
                    <Button variant="contained" color="primary" onClick={handleBack}
                        style={{ marginTop: '1rem', marginBottom: '1rem',}}
                    >Back</Button>
                </Box>
                <Box style={{ flexGrow: 1, display:'flex' }} >
                    <Paper elevation={3} style={{ width: '100%' }}>
                        {!loading && <SubCategories subCategories={filteredSubCategories} />}
                    </Paper>
                    <NewSubCategory onNewSubCategory={handleNewSubCategory} />
                </Box>
            </Container>
        </>
    );
};

export default Category;