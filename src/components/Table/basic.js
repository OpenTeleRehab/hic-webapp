import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns
} from '@devexpress/dx-react-grid-bootstrap4';
import PropTypes from 'prop-types';

const BasicTable = ({ rows, columns }) => (
  <Grid
    rows={rows}
    columns={columns}>
    <Table columnExtensions={[{ columnName: 'action', align: 'center', width: 120 }]} />
    <TableHeaderRow />
    <TableFixedColumns rightColumns={['action']} />
  </Grid>
);

BasicTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array
};

export default BasicTable;
