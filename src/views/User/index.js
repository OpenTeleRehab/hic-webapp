import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment';
import { useKeycloak } from '@react-keycloak/web';

import CreateUser from './create';
import PropTypes from 'prop-types';
import { getUsers, deleteUser, updateUserStatus, resendEmail } from 'store/user/actions';
import CustomTable from 'components/Table';
import settings from 'settings';
import { EditAction, DeleteAction, EnabledAction, DisabledAction, MailSendAction } from 'components/ActionIcons';
import { Translate } from 'react-localize-redux';
import Dialog from 'components/Dialog';
import { USER_GROUPS, USER_ROLES } from 'variables/user';
import EnabledStatus from 'components/EnabledStatus';
import { checkFederatedUser } from 'utils/user';

let timer = null;
const User = ({ translate }) => {
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const users = useSelector(state => state.user.users);
  const { profile } = useSelector((state) => state.auth);
  const [pageSize, setPageSize] = useState(60);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [id, setId] = useState('');
  const [type, setType] = useState(undefined);
  const [showSwitchStatusDialog, setShowSwitchStatusDialog] = useState(false);
  const [formFields, setFormFields] = useState({
    enabled: 0,
    type: undefined
  });

  const columns = [
    { name: 'first_name', title: translate('common.first_name') },
    { name: 'last_name', title: translate('common.last_name') },
    { name: 'email', title: translate('common.email') },
    { name: 'gender', title: translate('common.gender') },
    { name: 'type', title: translate('common.role') },
    { name: 'user_status', title: translate('common.status') },
    { name: 'last_login', title: translate('common.last_login') },
    { name: 'action', title: translate('common.action') }
  ];

  const columnExtensions = [
    { columnName: 'last_name', wordWrapEnabled: true },
    { columnName: 'first_name', wordWrapEnabled: true },
    { columnName: 'last_login', wordWrapEnabled: true, width: 250 }
  ];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setId('');
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

  useEffect(() => {
    if (keycloak.hasRealmRole(USER_ROLES.MANAGE_USER)) {
      setType(USER_GROUPS.ADMIN);
    }
  }, [keycloak]);

  const handleDelete = (id) => {
    setId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setId(null);
    setShowDeleteDialog(false);
  };

  const handleDeleteDialogConfirm = () => {
    dispatch(deleteUser(id, type)).then(result => {
      if (result) {
        handleDeleteDialogClose();
      }
    });
  };

  const handleSwitchStatus = (id, enabled) => {
    setId(id);
    setFormFields({ ...formFields, enabled: enabled, type: type });
    setShowSwitchStatusDialog(true);
  };

  const handleSwitchStatusDialogClose = () => {
    setId(null);
    setShowSwitchStatusDialog(false);
  };

  const handleSwitchStatusDialogConfirm = () => {
    dispatch(updateUserStatus(id, formFields)).then(result => {
      if (result) {
        handleSwitchStatusDialogClose();
      }
    });
  };

  const handleEdit = (id) => {
    setId(id);
    setShow(true);
  };

  const handleSendMail = (id) => {
    dispatch(resendEmail(id));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1 className="text-primary">{translate('user.management')}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" onClick={handleShow}>
            <BsPlus size={20} className="mr-1" />
            {translate('user.new')}
          </Button>
        </div>
      </div>
      <div className="no-gutters bg-white p-md-3">
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
            const isFederatedUser = checkFederatedUser(user.email);

            const action = (
              <div className='d-flex justify-content-start'>
                {user.enabled
                  ? <EnabledAction onClick={() => handleSwitchStatus(user.id, 0)} disabled={parseInt(user.id) === parseInt(profile.id)}/>
                  : <DisabledAction onClick={() => handleSwitchStatus(user.id, 1)} disabled={parseInt(user.id) === parseInt(profile.id)} />
                }
                <EditAction onClick={() => handleEdit(user.id)} />
                <DeleteAction className="ml-1" onClick={() => handleDelete(user.id)} disabled={parseInt(user.id) === parseInt(profile.id) || user.enabled} />
                {!isFederatedUser && <MailSendAction onClick={() => handleSendMail(user.id)} disabled={user.last_login} />}
              </div>
            );

            return {
              last_name: user.last_name,
              first_name: user.first_name,
              email: user.email,
              gender: user.gender ? <Translate id={`common.${user.gender}`} /> : '',
              type: user.type ? <Translate id={`common.${user.type}`} /> : '',
              user_status: <EnabledStatus enabled={!!user.enabled} />,
              last_login: user.last_login ? moment.utc(user.last_login).local().format(settings.datetime_format) : '',
              action
            };
          })}
        />
      </div>
      {show && <CreateUser show={show} handleClose={handleClose} editId={id} setType={setType} />}
      <Dialog
        show={showDeleteDialog}
        title={translate('user.delete_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handleDeleteDialogClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handleDeleteDialogConfirm}
      >
        <p>{translate('common.delete_confirmation_message')}</p>
      </Dialog>
      <Dialog
        show={showSwitchStatusDialog}
        title={translate('user.switchStatus_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handleSwitchStatusDialogClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handleSwitchStatusDialogConfirm}
      >
        <div>
          <p>{translate('common.switchStatus_confirmation_message')}</p>
        </div>
      </Dialog>
    </>
  );
};

User.propTypes = {
  translate: PropTypes.func
};

export default User;
