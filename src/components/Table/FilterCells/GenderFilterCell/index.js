import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import Select from 'react-select';
import scssColors from '../../../../scss/custom.scss';
import { GENDER } from 'variables/gender';

const GenderFilterCell = ({ filter, onFilter }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const [gender, setGender] = useState('');

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
  const genderData = [
    {
      value: '',
      name: translate('common.all')
    },
    {
      value: GENDER.MALE,
      name: translate('common.male')
    },
    {
      value: GENDER.FEMALE,
      name: translate('common.female')
    },
    {
      value: GENDER.OTHER,
      name: translate('common.other')
    }
  ];

  const handleFilter = (value) => {
    setGender(value);
    onFilter(value === '' ? null : { value });
  };

  return (
    <th>
      <Select
        classNamePrefix="filter"
        value={genderData.filter(item => item.value === gender)}
        getOptionLabel={option => option.name}
        options={genderData}
        onChange={(e) => handleFilter(e.value)}
        menuPortalTarget={document.body}
        styles={customSelectStyles}
      />
    </th>
  );
};

GenderFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }),
  onFilter: PropTypes.func.isRequired
};

export default GenderFilterCell;
