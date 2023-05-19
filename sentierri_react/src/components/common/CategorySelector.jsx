import React from 'react';
import { Chip, FormControl } from '@material-ui/core';

const CategorySelector = ({ categories, selectedCategories, setSelectedCategories }) => {
  const handleCategoryClick = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
    console.log('selectedCategories', selectedCategories);
  };

  return (
    <FormControl
        style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
            gap: '10px',
        }}
    >
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          clickable
          color={selectedCategories.includes(category.id) ? 'primary' : 'default'}
          onClick={() => handleCategoryClick(category.id)}
        />
      ))}
    </FormControl>
  );
};

export default CategorySelector;