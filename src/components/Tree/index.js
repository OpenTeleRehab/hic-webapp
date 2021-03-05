import React from 'react';
import {
  SelectionState,
  TreeDataState,
  CustomTreeData
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  Table,
  TableHeaderRow,
  TableTreeColumn
} from '@devexpress/dx-react-grid-bootstrap4';
import PropTypes from 'prop-types';

const CustomTree = ({ data, columns, treeColumnName, tableColumnExtensions, selection, onSelectChange }) => {
  const getChildRows = (row, rootRows) => {
    const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
    return childRows.length ? childRows : null;
  };

  return (
    <div className="card tree-container">
      <Grid
        rows={data}
        columns={columns}
      >
        <SelectionState
          selection={selection}
          onSelectionChange={onSelectChange}
        />
        <TreeDataState />
        <CustomTreeData
          getChildRows={getChildRows}
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <VirtualTable height={300} />
        <TableHeaderRow />
        <TableTreeColumn
          for={treeColumnName}
          showSelectionControls
        />
      </Grid>
    </div>
  );
};

CustomTree.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  treeColumnName: PropTypes.array,
  tableColumnExtensions: PropTypes.array,
  selection: PropTypes.array,
  onSelectChange: PropTypes.func
};

export default CustomTree;
