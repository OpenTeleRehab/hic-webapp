import React, { useState } from 'react';
import {
  FilteringState,
  IntegratedFiltering,
  SearchState,
  PagingState,
  IntegratedPaging
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableFilterRow,
  ColumnChooser,
  TableColumnVisibility,
  SearchPanel,
  TableHeaderRow,
  TableFixedColumns,
  PagingPanel
} from '@devexpress/dx-react-grid-bootstrap4';
import PropTypes from 'prop-types';

import Toolbar from 'components/Table/Toolbar';
import ToggleButtonProps from 'components/Table/ColumnChooser/ToggleButtonProps';

import '@icon/open-iconic/open-iconic.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

const CustomTable = ({ columns, rows }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 15];
  const rightColumns = ['action'];
  const tableColumnExtensions = [{ columnName: 'action', align: 'right', width: 120 }];
  const tableColumnVisibilityColumnExtensions = [{ columnName: 'action', togglingEnabled: false }];

  return (
    <Grid
      rows={rows}
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
      <Table columnExtensions={tableColumnExtensions} />
      <TableHeaderRow />
      <TableFilterRow />
      <TableFixedColumns rightColumns={rightColumns} />
      <TableColumnVisibility columnExtensions={tableColumnVisibilityColumnExtensions} />
      <Toolbar />
      <SearchPanel />
      <ColumnChooser toggleButtonComponent={ToggleButtonProps} />
      <PagingPanel pageSizes={pageSizes} />
    </Grid>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
};
export default CustomTable;
