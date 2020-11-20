import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';

import CustomTable from 'components/Table';
import EnabledStatus from 'components/EnabledStatus';
import { USER_GROUPS } from '../../../variables/user';
import { getUsers } from '../../../store/user/actions';

const ClinicAdmin = ({ handleEdit, type }) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const users = useSelector(state => state.user.users);

  const columns = [
    { name: 'last_name', title: 'Last Name' },
    { name: 'first_name', title: 'First Name' },
    { name: 'email', title: 'Email' },
    { name: 'country', title: 'Country' },
    { name: 'clinic', title: 'Clinic' },
    { name: 'status', title: 'Status' },
    { name: 'last_login', title: 'Last Login' },
    { name: 'action', title: 'Actions' }
  ];
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, searchValue]);

  useEffect(() => {
    if (type === USER_GROUPS.CLINIC_ADMIN) {
      dispatch(getUsers({
        search_value: searchValue,
        admin_type: type,
        page_size: pageSize,
        current_page: currentPage + 1
      })).then(result => {
        if (result) {
          setTotalCount(result.total_count);
        }
      });
    }
  }, [currentPage, type, pageSize, searchValue, dispatch]);

  const columnExtensions = [
    { columnName: 'last_name', wordWrapEnabled: true },
    { columnName: 'first_name', wordWrapEnabled: true }
  ];

  return (
    <div className="mt-3">
      <p>
        Country Admins manage therapist of a clinic
      </p>
      <CustomTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        setSearchValue={setSearchValue}
        columns={columns}
        columnExtensions={columnExtensions}
        rows={users.map(user => {
          const dropdown = (
            <DropdownButton alignRight variant="outline-dark" title={translate('common.actions')}>
              <Dropdown.Item onClick={() => handleEdit(user.id)}>{translate('common.edit_info')}</Dropdown.Item>
              <Dropdown.Item href="#/action-2">{translate('common.deactivate')}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">{translate('common.delete')}</Dropdown.Item>
            </DropdownButton>
          );

          return {
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email,
            country: user.country_id,
            clinic: user.clinic_id,
            status: <EnabledStatus enabled={user.enabled} />,
            last_login: '',
            action: dropdown
          };
        })}
      />
    </div>
  );
};

ClinicAdmin.propTypes = {
  handleEdit: PropTypes.func,
  type: PropTypes.string
};

export default ClinicAdmin;
