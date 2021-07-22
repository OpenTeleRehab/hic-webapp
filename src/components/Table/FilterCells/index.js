import React from 'react';
import PropTypes from 'prop-types';

import { TableFilterRow } from '@devexpress/dx-react-grid-bootstrap4';
import StatusFilterCell from 'components/Table/FilterCells/StatusFilterCell';
import DateRangeFilterCell from 'components/Table/FilterCells/DateRangeFilterCell';
import NumberFilterCell from './NumberFilterCell';

const FilterCell = (props) => {
  const { column } = props;
  if (column.name === 'status') {
    return <StatusFilterCell {...props} />;
  } else if (column.name === 'last_login') {
    return <DateRangeFilterCell {...props} />;
  } else if (column.name === 'action' ||
    column.name === 'next_appointment' || column.name === 'treatment_plan' ||
    column.name === 'treatment_status' || column.name === 'region' ||
    column.name === 'storage_used' || column.name === 'on_going_treatment' ||
    column.name === 'total_patient' || column.name === 'assigned_patient') {
    return <th className="dx-g-bs4-fixed-cell position-sticky" style={{ right: 0 }} />;
  } else if (column.name === 'date_of_birth' || column.name === 'start_date' || column.name === 'end_date') {
    return <DateRangeFilterCell {...props} />;
  } else if (column.name === 'age' || column.name === 'limit_patient') {
    return <NumberFilterCell {...props} />;
  }
  return <TableFilterRow.Cell {...props} />;
};

FilterCell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired
};

export default FilterCell;
