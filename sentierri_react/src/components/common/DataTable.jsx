import React from 'react';
import {
  useTable,
  useGroupBy,
  useExpanded,
  useSortBy,
  useBlockLayout,
  useFilters,
} from 'react-table';
import { useSticky } from 'react-table-sticky';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableSortLabel,
  TextField,
} from '@mui/material';

const StyledTable = styled(Table)({
  minWidth: 650,
});0

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.frozen': {
    position: 'sticky',
    left: 0,
    background: theme.palette.background.paper,
    zIndex: 2,
  },
}));


const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <div className="search-input-container">
      <TextField
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`filter`}
      >
      </TextField>
    </div>
  );
};

const DataTable = ({ columns, data }) => {
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
      data,
      defaultColumn: { Filter: DefaultColumnFilter }, // Set a default column filter
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    useSticky,
    useBlockLayout
  );

  const navigate = useNavigate();
    // const handleCellClick = (id) => {
  //   navigate(`/settings/categories/${id}`);
  // };

  return (
    <Paper>
      <div style={{ position: 'relative', overflowX: 'hidden' }}>
        <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <TableContainer>
            <StyledTable {...getTableProps()}>
              <TableHead>
                {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <StyledTableCell 
                        {...column.getHeaderProps(column.getSortByToggleProps())} 
                        className={column.id === 'name' ? 'frozen' : ''}
                      >
                        {column.render('Header')}
                        {column.canGroupBy ? (
                          <span {...column.getGroupByToggleProps()}>
                            {column.isGrouped ? '✖ ' : '⊞ '}
                          </span>
                        ) : null}
                        {column.isSorted ? (
                          <TableSortLabel active direction={column.isSortedDesc ? 'desc' : 'asc'} />
                        ) : null}
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                      </StyledTableCell>
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
          </TableContainer>
        </div>
      </div>
    </Paper>
  );
};

export default DataTable;