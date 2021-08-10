import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import scssColors from '../../../../scss/custom.scss';
import Select from 'react-select';

const ContributorEmailFilterCell = ({ filter, onFilter }) => {
  const localize = useSelector((state) => state.localize);
  const contributors = useSelector(state => state.contributor.contributors);
  const translate = getTranslate(localize);
  const [contributor, setContributor] = useState('');

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

  const handleFilter = (value) => {
    setContributor(value);
    onFilter(value === '' ? null : { value });
  };
  const optionData = [
    {
      id: '',
      email: translate('common.all')
    },
    ...contributors
  ];

  return (
    <th>
      <Select
        classNamePrefix="filter"
        value={optionData.filter(item => item.id === contributor)}
        getOptionLabel={option => option.email}
        options={optionData}
        onChange={(e) => handleFilter(e.id)}
        menuPortalTarget={document.body}
        styles={customSelectStyles}
        aria-label="Contributor email"
      />
    </th>
  );
};

ContributorEmailFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }),
  onFilter: PropTypes.func.isRequired
};

export default ContributorEmailFilterCell;
