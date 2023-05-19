import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, List } from '@material-ui/core';
import { getCategory } from '../../services/categoryService';
import { useParams } from 'react-router-dom';
import SubCategories from './SubCategories';
import NewSubCategory from './NewSubCategory';
import { getAllSubCategories } from '../../services/subCategoryService';

const Category = () => {
    const [category, setCategory] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchCategory = async () => {
            const category = await getCategory(id);
            setCategory(category);
            console.log('category', category);
        };

        const fetchSubCategories = async () => {
            const subCategories = await getAllSubCategories(id);
            console.log('subCategories fetched in Category', subCategories);
            setSubCategories(subCategories);
        };

        fetchCategory(id);
        fetchSubCategories(id);
    }, [reload]);

    useEffect(() => {
        const filteredSubCategories = subCategories.filter(
            (subCategory) => subCategory.parentCategoryId === parseInt(id)
        );
        console.log('filteredSubCategories', filteredSubCategories);
        setFilteredSubCategories(filteredSubCategories);
        setLoading(false);
    }, [subCategories]);

    const handleNewSubCategory = () => {
        setReload(!reload);
    };

    return (
        <>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Name: {category.name}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Abbreviation: {category.abbreviation}
                </Typography>
                {!loading && <SubCategories subCategories={filteredSubCategories} />}
                <Button variant="contained" color="primary" href="/settings/categories/">
                    Back
                </Button>
            </Container>
            <NewSubCategory onNewSubCategory={handleNewSubCategory} />
        </>
    );
};

export default Category;