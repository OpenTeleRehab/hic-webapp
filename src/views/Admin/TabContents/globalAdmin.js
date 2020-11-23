import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { getUsers } from 'store/user/actions';
import { USER_GROUPS } from 'variables/user';
import settings from 'settings';
import * as moment from 'moment';

import CustomTable from 'components/Table';
import EnabledStatus from 'components/EnabledStatus';

const GlobalAdmin = ({ handleEdit, type }) => {
  const dispatch = useDispatch();
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
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, searchValue, filters]);

  useEffect(() => {
    if (type === USER_GROUPS.GLOBAL_ADMIN) {
      dispatch(getUsers({
        search_value: searchValue,
        filters: filters,
        admin_type: type,
        page_size: pageSize,
        page: currentPage + 1
      })).then(result => {
        if (result) {
          setTotalCount(result.total_count);
        }
      });
    }
  }, [currentPage, type, pageSize, searchValue, filters, dispatch]);

  const columnExtensions = [
    { columnName: 'last_name', wordWrapEnabled: true },
    { columnName: 'first_name', wordWrapEnabled: true }
  ];

  return (
    <div className="mt-3">
      <p>
        Global admins can manage Global Admin/ Country Admins, create and update the content (exercises and questionnairs).
      </p>
      <CustomTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        setSearchValue={setSearchValue}
        setFilters={setFilters}
        filters={filters}
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
            status: <EnabledStatus enabled={!!user.enabled} />,
            last_login: moment(user.last_login).format(settings.date_format),
            action: dropdown
          };
        })}
      />
    </div>
  );
};

GlobalAdmin.propTypes = {
  handleEdit: PropTypes.func,
  type: PropTypes.string
};

export default GlobalAdmin;
