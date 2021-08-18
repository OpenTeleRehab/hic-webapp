import React from 'react';
import PropTypes from 'prop-types';

import { TableFilterRow } from '@devexpress/dx-react-grid-bootstrap4';
import StatusFilterCell from 'components/Table/FilterCells/StatusFilterCell';
import DateRangeFilterCell from 'components/Table/FilterCells/DateRangeFilterCell';
import ReviewerFilterCell from 'components/Table/FilterCells/ReviewerFilterCell';
import ContributorFilterCell from 'components/Table/FilterCells/ContributorFilterCell';
import ContributorEmailFilterCell from 'components/Table/FilterCells/ContributorEmailFilterCell';
import GenderFilterCell from 'components/Table/FilterCells/GenderFilterCell';
import UserGroupFilterCell from 'components/Table/FilterCells/UserGroupFilterCell';
import UserStatusFilterCell from 'components/Table/FilterCells/UserStatusFilterCell';

const FilterCell = (props) => {
  const { column } = props;
  if (column.name === 'status') {
    return <StatusFilterCell {...props} />;
  } else if (column.name === 'action') {
    return <th className="dx-g-bs4-fixed-cell position-sticky" style={{ right: 0 }} />;
  } else if (column.name === 'uploaded_date' || column.name === 'last_login') {
    return <DateRangeFilterCell {...props} />;
  } else if (column.name === 'reviewed_by') {
    return <ReviewerFilterCell {...props} />;
  } else if (column.name === 'uploaded_by') {
    return <ContributorFilterCell {...props} />;
  } else if (column.name === 'uploaded_by_email') {
    return <ContributorEmailFilterCell {...props} />;
  } else if (column.name === 'gender') {
    return <GenderFilterCell {...props} />;
  } else if (column.name === 'type') {
    return <UserGroupFilterCell {...props} />;
  } else if (column.name === 'user_status') {
    return <UserStatusFilterCell {...props} />;
  }

  return <TableFilterRow.Cell {...props} />;
};

FilterCell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired
};

export default FilterCell;
