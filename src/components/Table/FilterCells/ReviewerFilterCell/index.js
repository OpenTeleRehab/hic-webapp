import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import scssColors from '../../../../scss/custom.scss';
import Select from 'react-select';

const ReviewerFilterCell = ({ filter, onFilter }) => {
  const localize = useSelector((state) => state.localize);
  const reviewers = useSelector(state => state.user.reviewers);
  const translate = getTranslate(localize);
  const [reviewer, setReviewer] = useState('');

  const customSelectStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: scssColors.infoLight
      }
    }),
    menuPortal: base => ({ ...base, zIndex: 1000 })
  };
  console.log(reviewers);

  const handleFilter = (value) => {
    setReviewer(value);
    onFilter(value === '' ? null : { value });
  };
  const optionData = [
    {
      id: '',
      name: translate('common.all')
    },
    ...reviewers
  ];

  return (
    <th>
      <Select
        classNamePrefix="filter"
        value={optionData.filter(item => item.id === reviewer)}
        getOptionLabel={option => option.name}
        options={optionData}
        onChange={(e) => handleFilter(e.id)}
        menuPortalTarget={document.body}
        styles={customSelectStyles}
        aria-label="Reviewer"
      />
    </th>
  );
};

ReviewerFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }),
  onFilter: PropTypes.func.isRequired
};

export default ReviewerFilterCell;
