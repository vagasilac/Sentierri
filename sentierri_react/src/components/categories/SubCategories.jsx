import React, { useState, useEffect } from 'react';
import DataTable from '../common/DataTable';
import { Button } from '@material-ui/core';

const SubCategories = ({subCategories}) => {
    console.log('subCategories passed to SubCategories', subCategories);
    const columns = [
        { accessor: 'name',
          Header: 'Subcategory Name',
          options: {
            filter: true,
            sort: true,
          }},
          { Header: 'Actions',
          Cell: ({row}) => (
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => console.log(`Delete ${row.original.name}`)}>Delete</Button>
            </div>
          )
      }
      ];

    return (
        <DataTable columns={columns} data={subCategories} />
)};

export default SubCategories;