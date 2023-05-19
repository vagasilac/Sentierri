import React from 'react';
import MUIDataTable from 'mui-datatables';

const DataTable = ({ columns, data }) => {
  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'single',
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <>
        <button onClick={() => console.log('View')}>Edit</button>
        <button onClick={() => console.log('Archive')}>Archive</button>
      </>
    ),
  };

  return (
    <MUIDataTable
      title={'Data Table'}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default DataTable;