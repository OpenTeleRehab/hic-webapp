import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import Select from 'react-select';
import scssColors from '../../../../scss/custom.scss';
import { USER_GROUPS } from 'variables/user';

const UserGroupFilterCell = ({ filter, onFilter }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const [role, setRole] = useState('');

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
  const roleData = [
    {
      value: '',
      name: translate('common.all')
    },
    {
      value: USER_GROUPS.ADMIN,
      name: translate('common.admin')
    },
    {
      value: USER_GROUPS.MODERATOR,
      name: translate('common.moderator')
    }
  ];

  const handleFilter = (value) => {
    setRole(value);
    onFilter(value === '' ? null : { value });
  };

  return (
    <th>
      <Select
        classNamePrefix="filter"
        value={roleData.filter(item => item.value === role)}
        getOptionLabel={option => option.name}
        options={roleData}
        onChange={(e) => handleFilter(e.value)}
        menuPortalTarget={document.body}
        styles={customSelectStyles}
      />
    </th>
  );
};

UserGroupFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }),
  onFilter: PropTypes.func.isRequired
};

export default UserGroupFilterCell;
