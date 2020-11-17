import React from 'react';
import CustomTable from 'components/Table';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CountryAdmin = ({ handleEdit }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const users = useSelector(state => state.user.users);

  const columns = [
    { name: 'id', title: 'ID' },
    { name: 'first_name', title: 'First Name' },
    { name: 'last_name', title: 'Last Name' },
    { name: 'email', title: 'Email' },
    { name: 'status', title: 'Status' },
    { name: 'last_login', title: 'Last Login' },
    { name: 'action', title: 'Actions' }
  ];
  return (
    <div className="mt-3">
      <p>
        Country Admins manage therapist of a country
      </p>
      <CustomTable
        columns={columns}
        rows={users.map(user => {
          const dropdown = (
            <DropdownButton variant="outline-dark" id="dropdown-basic-button" title={translate('common.actions')}>
              <Dropdown.Item onClick={() => handleEdit(user.id)}>{translate('common.edit_info')}</Dropdown.Item>
              <Dropdown.Item href="#/action-2">{translate('common.deactivate')}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">{translate('common.delete')}</Dropdown.Item>
            </DropdownButton>
          );

          return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            status: '',
            last_login: '',
            action: dropdown
          };
        })}
      />
    </div>
  );
};

CountryAdmin.propTypes = {
  handleEdit: PropTypes.func
};

export default CountryAdmin;
