import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import CustomTable from 'components/Table';
import EnabledStatus from 'components/EnabledStatus';
import { USER_GROUPS } from 'variables/user';
import { getUsers } from 'store/user/actions';
import { getCountryName } from 'utils/country';
import * as moment from 'moment';
import settings from 'settings';
import { DeleteAction, EditAction } from 'components/ActionIcons';
import { getTranslate } from 'react-localize-redux';

let timer = null;

const CountryAdmin = ({ handleEdit, type }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const countries = useSelector(state => state.country.countries);
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  const columns = [
    { name: 'last_name', title: translate('common.last_name') },
    { name: 'first_name', title: translate('common.first_name') },
    { name: 'email', title: translate('common.email') },
    { name: 'country', title: translate('common.country') },
    { name: 'status', title: translate('common.status') },
    { name: 'last_login', title: translate('common.last_login') },
    { name: 'action', title: translate('common.action') }
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
    if (type === USER_GROUPS.COUNTRY_ADMIN) {
      if (searchValue || filters.length) {
        clearTimeout(timer);
        timer = setTimeout(() => {
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
        }, 500);
      } else {
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
    }
  }, [currentPage, type, pageSize, searchValue, filters, dispatch]);

  const columnExtensions = [
    { columnName: 'last_name', wordWrapEnabled: true },
    { columnName: 'first_name', wordWrapEnabled: true }
  ];

  return (
    <div className="mt-3">
      <p>
        {translate('common.country_admin.management')}
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
          const action = (
            <>
              <EditAction onClick={() => handleEdit(user.id)} />
              <DeleteAction className="ml-1" disabled />
            </>
          );

          return {
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email,
            country: getCountryName(user.country_id, countries),
            status: <EnabledStatus enabled={!!user.enabled} />,
            last_login: moment(user.last_login).format(settings.date_format),
            action
          };
        })}
      />
    </div>
  );
};

CountryAdmin.propTypes = {
  handleEdit: PropTypes.func,
  type: PropTypes.string
};

export default CountryAdmin;
