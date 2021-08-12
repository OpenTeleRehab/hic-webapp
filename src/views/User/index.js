import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment';

import CreateUser from './create';
import PropTypes from 'prop-types';
import { getUsers } from 'store/user/actions';
import CustomTable from 'components/Table';
import settings from 'settings';
import { EditAction, DeleteAction, EnabledAction, DisabledAction, MailSendAction } from 'components/ActionIcons';
import { Translate } from 'react-localize-redux';

let timer = null;
const User = ({ translate }) => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState('');
  const users = useSelector(state => state.user.users);

  const columns = [
    { name: 'first_name', title: translate('common.first_name') },
    { name: 'last_name', title: translate('common.last_name') },
    { name: 'email', title: translate('common.email') },
    { name: 'gender', title: translate('common.gender') },
    { name: 'type', title: translate('common.role') },
    { name: 'last_login', title: translate('common.last_login') },
    { name: 'action', title: translate('common.action') }
  ];

  const [pageSize, setPageSize] = useState(60);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setEditId('');
    setShow(false);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, searchValue, filters]);

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(getUsers({
        search_value: searchValue,
        filters: filters,
        page_size: pageSize,
        page: currentPage + 1
      })).then(result => {
        if (result) {
          setTotalCount(result.total_count);
        }
      });
    }, 500);
  }, [currentPage, pageSize, searchValue, filters, dispatch]);

  const columnExtensions = [
    { columnName: 'last_name', wordWrapEnabled: true },
    { columnName: 'first_name', wordWrapEnabled: true },
    { columnName: 'last_login', wordWrapEnabled: true, width: 250 }
  ];

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h1>{translate('user.management')}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" onClick={handleShow}>
            <BsPlus size={20} className="mr-1" />
            {translate('user.new')}
          </Button>
        </div>
      </div>
      <div className="middle-content mt-4">
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
                {user.enabled
                  ? <EnabledAction />
                  : <DisabledAction />
                }
                <EditAction />
                <DeleteAction className="ml-1" />
                <MailSendAction />
              </>
            );

            return {
              last_name: user.last_name,
              first_name: user.first_name,
              email: user.email,
              gender: user.gender ? <Translate id={`common.${user.gender}`} /> : '',
              type: user.type ? <Translate id={`common.${user.type}`} /> : '',
              last_login: user.last_login ? moment.utc(user.last_login).local().format(settings.datetime_format) : '',
              action
            };
          })}
        />
      </div>
      {show && <CreateUser show={show} handleClose={handleClose} editId={editId} />}
    </>
  );
};

User.propTypes = {
  translate: PropTypes.func
};

export default User;
