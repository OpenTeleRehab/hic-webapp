import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const CustomTable = ({ columns }) => {
  const users = useSelector(state => state.user.users);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);

  return (
    <Grid
      rows={users}
      columns={columns}>
      <SearchState />
      <FilteringState defaultFilters={[]} />
      <IntegratedFiltering />
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
        pageSizes={pageSizes} />
    </Grid>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.func
};
export default CustomTable;
