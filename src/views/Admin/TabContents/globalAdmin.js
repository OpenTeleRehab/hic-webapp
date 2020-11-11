import React, { useState, useEffect } from 'react';
import { FilteringState, IntegratedFiltering, SearchState, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableFilterRow,
  Toolbar,
  ColumnChooser,
  TableColumnVisibility,
  SearchPanel,
  TableHeaderRow,
  PagingPanel
} from '@devexpress/dx-react-grid-bootstrap4';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { generateRows, globalSalesValues } from './DemoData/generator';

const PagingContainer = props => (
  <PagingPanel.Container {...props} className="custom-class" />
);

export default GlobalAdmin => {
  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'email', title: 'Email' },
    { name: 'status', title: 'Status' },
    { name: 'lastLogin', title: 'Last Login' },
    { name: 'action', title: 'Actions' }
  ]);

  const [appState, setAppState] = useState({
    repos: null
  });

  useEffect(() => {
    const apiUrl = 'http://localhost:8082/api/admin/adminType=global_admin';
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ repos: repos });
      });
  }, [setAppState]);

  console.log(appState.repos);

  const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 12 }));
  const [filteringColumnExtensions] = useState([
    {
      columnName: 'saleDate',
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        if (filter && filter.operation === 'month') {
          const month = parseInt(value.split('-')[1], 10);
          return month === parseInt(filter.value, 10);
        }
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      }
    }
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
      >
        <SearchState />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <TableFilterRow />
        <TableColumnVisibility />
        <Toolbar />
        <SearchPanel />
        <ColumnChooser />
        <PagingPanel
          pageSizes={pageSizes} containerComponent={PagingContainer} />
      </Grid>
    </div>
  );
};
