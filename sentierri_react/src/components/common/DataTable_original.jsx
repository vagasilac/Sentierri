import React from 'react';
import {
  useTable,
  useGroupBy,
  useExpanded,
  useSortBy,
  useFilters,
} from 'react-table';
import { useNavigate } from 'react-router-dom';
import './DataTable.css';
import SearchIcon from '@mui/icons-material/Search';


const tableContainerStyles = {
  overflowX: 'auto',
};

const tableStyles = {
  padding: '1rem',
};

const tableCellStyles = {
  margin: 0,
  padding: '0.5rem',
  borderBottom: '1px solid black',
  borderRight: '1px solid black',
  color: '#4a4a4a',
  whiteSpace: 'nowrap',
};

const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  const count = filterValue ? filterValue.length : 0;
  return (
    <div className="search-input-container">
      <SearchIcon />
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`... (${count})`}
      />
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
    useExpanded
  );

  const navigate = useNavigate();
  // const handleCellClick = (id) => {
  //   navigate(`/settings/categories/${id}`);
  // };

  return (
    <div style={tableStyles}>
      <div style={tableContainerStyles}>
        <table {...getTableProps()} style={{ borderSpacing: 0, border: '1px solid black', tableLayout: 'auto' }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} style={tableCellStyles}>
                    {column.render('Header')}
                    <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {column.canGroupBy ? (
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? '✖ ' : '⊞ '}
                      </span>
                    ) : null}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                    {/* Render column filter */}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        onClick={() => handleCellClick(cell.row.original.id)}
                        style={{
                          ...tableCellStyles,
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
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
