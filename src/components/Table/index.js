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
import SearchInput from 'components/Table/SearchPanel/Input';
import ToggleButton from 'components/Table/ColumnChooser/ToggleButton';
// import PagingPanelContainer from 'components/Table/PagingPanel/Container';

import '@icon/open-iconic/open-iconic.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

const CustomTable = ({ columns, rows }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 15];
  const rightColumns = ['action'];
  const tableColumnExtensions = [{ columnName: 'action', align: 'right', width: 120 }];
  const tableColumnVisibilityColumnExtensions = [{ columnName: 'action', togglingEnabled: false }];
  const filteringStateColumnExtensions = [{ columnName: 'action', filteringEnabled: false }];
  const FilterRow = (props) => <Table.Row className="filter" {...props} />;
  const FixedColumnCell = (props) => <TableFixedColumns.Cell {...props} showLeftDivider={false} />;

  return (
    <Grid
      rows={rows}
      columns={columns}>
      <SearchState />
      <FilteringState defaultFilters={[]} columnExtensions={filteringStateColumnExtensions} />
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
      <TableFilterRow rowComponent={FilterRow} />
      <TableFixedColumns rightColumns={rightColumns} cellComponent={FixedColumnCell} />
      <TableColumnVisibility columnExtensions={tableColumnVisibilityColumnExtensions} />
      <Toolbar />
      <SearchPanel inputComponent={SearchInput} />
      <ColumnChooser toggleButtonComponent={ToggleButton} />
      <PagingPanel pageSizes={pageSizes} />
    </Grid>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
};
export default CustomTable;
