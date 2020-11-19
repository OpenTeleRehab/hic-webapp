import React from 'react';
import { useSelector } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';

import CustomTable from 'components/Table';
import EnabledStatus from 'components/EnabledStatus';

const GlobalAdmin = ({ handleEdit }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const users = useSelector(state => state.user.users);

  const columns = [
    { name: 'last_name', title: 'Last Name' },
    { name: 'first_name', title: 'First Name' },
    { name: 'email', title: 'Email' },
    { name: 'status', title: 'Status' },
    { name: 'last_login', title: 'Last Login' },
    { name: 'action', title: 'Actions' }
  ];

  return (
    <div className="mt-3">
      <p>
        Global admins can manage Global Admin/ Country Admins, create and update the content (exercises and questionnairs).
      </p>
      <CustomTable
        columns={columns}
        rows={users.map(user => {
          const dropdown = (
            <DropdownButton alignRight variant="outline-dark" id="dropdown-basic-button" title={translate('common.actions')}>
              <Dropdown.Item onClick={() => handleEdit(user.id)}>{translate('common.edit_info')}</Dropdown.Item>
              <Dropdown.Item href="#/action-2">{translate('common.deactivate')}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">{translate('common.delete')}</Dropdown.Item>
            </DropdownButton>
          );

          return {
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email,
            status: <EnabledStatus enabled={user.enabled} />,
            last_login: '',
            action: dropdown
          };
        })}
      />
    </div>
  );
};

GlobalAdmin.propTypes = {
  handleEdit: PropTypes.func
};

export default GlobalAdmin;
