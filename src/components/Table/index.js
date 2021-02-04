import React, { useState } from 'react';
import {
  FilteringState,
  SearchState,
  PagingState,
  CustomPaging,
  EditingState
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
  PagingPanel,
  TableEditRow,
  TableEditColumn
} from '@devexpress/dx-react-grid-bootstrap4';
import PropTypes from 'prop-types';
import { getTranslate } from 'react-localize-redux';

import Toolbar from 'components/Table/Toolbar';
import SearchInput from 'components/Table/SearchPanel/Input';
import FilterToggle from 'components/Table/FilterToggle';
import ToggleButton from 'components/Table/ColumnChooser/ToggleButton';
import FilterCells from 'components/Table/FilterCells';

import '@icon/open-iconic/open-iconic.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { useSelector } from 'react-redux';

const FilterRow = (props) => <Table.Row className="filter" {...props} />;
const FixedColumnCell = (props) => <TableFixedColumns.Cell {...props} showLeftDivider={false} />;

const CustomTable = ({ rows, columns, columnExtensions, pageSize, setPageSize, currentPage, setCurrentPage, totalCount, setSearchValue, setFilters, filters, showInlineEdited, editingStateColumnExtensions, commitChanges, editingRowIds, setEditingRowIds, hideSearchFilter }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const [showFilter, setShowFilter] = useState(false);

  const pageSizes = [10, 20, 30, 40, 50];
  const rightColumns = ['action'];
  const tableColumnExtensions = [...columnExtensions, { columnName: 'action', align: 'center', width: 120 }];
  const tableColumnVisibilityColumnExtensions = [{ columnName: 'action', togglingEnabled: false }];
  const filteringStateColumnExtensions = [{ columnName: 'action', filteringEnabled: false }];

  const toggleFilter = () => {
    if (filters && filters.length) {
      setFilters([]);
    }
    setShowFilter(!showFilter);
  };

  return (
    <Grid
      rows={rows}
      columns={columns}>
      <SearchState onValueChange={setSearchValue} />
      <FilteringState defaultFilters={[]} onFiltersChange={setFilters} columnExtensions={filteringStateColumnExtensions} />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
      <CustomPaging
        totalCount={totalCount}
      />
      <EditingState
        onCommitChanges={commitChanges}
        columnExtensions={editingStateColumnExtensions}
        editingRowIds={editingRowIds}
        onEditingRowIdsChange={setEditingRowIds}
      />

      <Table columnExtensions={tableColumnExtensions} />
      <TableHeaderRow />
      <TableEditRow />
      {showInlineEdited && <TableEditColumn showEditCommand /> }
      {showFilter && <TableFilterRow rowComponent={FilterRow} cellComponent={FilterCells} messages={{ filterPlaceholder: translate('common.search.placeholder') }} />}
      <TableFixedColumns rightColumns={rightColumns} cellComponent={FixedColumnCell} />
      <TableColumnVisibility columnExtensions={tableColumnVisibilityColumnExtensions} />

      <Toolbar />
      {!hideSearchFilter && <SearchPanel inputComponent={SearchInput} /> }
      {!hideSearchFilter && <FilterToggle onToggle={toggleFilter} showFilter={showFilter} /> }
      {!hideSearchFilter && <ColumnChooser toggleButtonComponent={ToggleButton} /> }
      <PagingPanel pageSizes={pageSizes} />
    </Grid>
  );
};

CustomTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  columnExtensions: PropTypes.array,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  totalCount: PropTypes.number,
  setSearchValue: PropTypes.func,
  setFilters: PropTypes.func,
  filters: PropTypes.array,
  showInlineEdited: PropTypes.bool,
  editingStateColumnExtensions: PropTypes.array,
  commitChanges: PropTypes.func,
  editingRowIds: PropTypes.array,
  setEditingRowIds: PropTypes.func,
  hideSearchFilter: PropTypes.bool
};

CustomTable.defaultProps = {
  columnExtensions: []
};

export default CustomTable;
