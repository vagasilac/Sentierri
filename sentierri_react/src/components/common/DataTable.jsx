import React, { useState, useEffect } from 'react';
import {
  useTable,
  useGroupBy,
  useExpanded,
  useSortBy,
  useFilters,
} from 'react-table';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';



const StyledTable = styled(Table)({
  minWidth: 650,
});

const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <TextField
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`filter`}
        size="small"
        >
      </TextField>
  );
};

const DataTable = ({ columns, data }) => {
  console.log('Columns:', columns);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnsToFilter, setColumnsToFilter] = useState([]);

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (globalFilter) {
      setFilteredData(
        data.filter(row =>
          columnsToFilter.some(column =>
            row[column].toString().toLowerCase().includes(globalFilter.toLowerCase())
          )
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [data, globalFilter, columnsToFilter]);

  const getFilteredRows = () => {
    if (!globalFilter) return data; // If there's no filter, return all data

    return data.filter(row => 
        columnsToFilter.some(columnId => 
            row[columnId].toString().toLowerCase().includes(globalFilter.toLowerCase())
        )
    );
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { groupBy, expanded },
  } = useTable(
    {
      columns,
      data: filteredData,
      defaultColumn: { Filter: DefaultColumnFilter }, // Set a default column filter
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded
  );

  const handleFilterChange = (event) => {
    setGlobalFilter(event.target.value || "");
  };

  const handleColumnFilterChange = (event) => {
    setColumnsToFilter(event.target.value.length > 0 ? event.target.value : columns.map(col => col.accessor));
  };
  

  const navigate = useNavigate();
    // const handleCellClick = (id) => {
  //   navigate(`/settings/categories/${id}`);
  // };
  

  return (
    <Paper>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <TextField
            // variant not outlined, filled, standard
            variant='standard'
            size='small'
            value={globalFilter} 
            onChange={handleFilterChange} 
            placeholder="Global search..."
            style={{margin: '1rem'}} 
        />
        <FormControl
          variant="filled"
          size='small'
          style={{
            marginRight: '1rem',
            minWidth: '200px',
          }}
        >
          <InputLabel id="columns-select-label">What to filter?</InputLabel>
          <Select
            labelId="columns-select-label"
            id="columns-select"
            size='small'
            multiple
            style={{display: 'flex', flexWrap: 'wrap'}}
            value={columnsToFilter}
            onChange={handleColumnFilterChange}
          >
            {columns.map((column) => (
              <MenuItem key={column.accessor} value={column.accessor}>
                {column.Header}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <StyledTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow
              style={{ backgroundColor: '#eef1f6', fontSize: '15rem' }}
              {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                    {column.canGroupBy ? (
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? '✖ ' : '⊞ '}
                      </span>
                    ) : null}
                    {column.isSorted ? (
                      <TableSortLabel active direction={column.isSortedDesc ? 'desc' : 'asc'} />
                    ) : null}
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      {...cell.getCellProps()}
                      onClick={() => handleCellClick(cell.row.original.id)}
                      style={{
                        background: cell.isGrouped
                          ? '#0aff0082'
                          : cell.isAggregated
                          ? '#ffa50078'
                          : cell.isPlaceholder
                          ? '#ff000042'
                          : 'white',
                      }}
                    >
                      {cell.isGrouped ? (
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell')} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : (
                        cell.render('Cell')
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </Paper>
  );
};

export default DataTable;