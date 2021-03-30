import React from 'react';
import PropTypes from 'prop-types';

import { TableFilterRow } from '@devexpress/dx-react-grid-bootstrap4';
import StatusFilterCell from 'components/Table/FilterCells/StatusFilterCell';
import DateRangeFilterCell from 'components/Table/FilterCells/DateRangeFilterCell';
import CountryFilterCell from './CountryFilterCell';
import ClinicFilterCell from './ClinicFilterCell';

const FilterCell = (props) => {
  const { column } = props;
  if (column.name === 'status') {
    return <StatusFilterCell {...props} />;
  } else if (column.name === 'last_login') {
    return <DateRangeFilterCell {...props} />;
  } else if (column.name === 'action') {
    return <th className="dx-g-bs4-fixed-cell position-sticky" style={{ right: 0 }} />;
  } else if (column.name === 'therapist_country') {
    return <CountryFilterCell {...props} />;
  } else if (column.name === 'therapist_clinic') {
    return <ClinicFilterCell {...props} />;
  } else if (column.name === 'total_patient') {
    return <th className="dx-g-bs4-fixed-cell position-sticky" style={{ right: 0 }} />;
  } else if (column.name === 'on_going_treatment') {
    return <th className="dx-g-bs4-fixed-cell position-sticky" style={{ right: 0 }} />;
  } else if (column.name === 'storage_used') {
    return <th className="dx-g-bs4-fixed-cell position-sticky" style={{ right: 0 }} />;
  } else if (column.name === 'region') {
    return <th className="dx-g-bs4-fixed-cell position-sticky" style={{ right: 0 }} />;
  }
  return <TableFilterRow.Cell {...props} />;
};

FilterCell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired
};

export default FilterCell;
