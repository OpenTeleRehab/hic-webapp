import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Tabs, Tab } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useKeycloak } from '@react-keycloak/web';
import { deleteUser } from 'store/user/actions';

import GlobalAdmin from './TabContents/globalAdmin';
import CountryAdmin from './TabContents/countryAdmin';
import ClinicAdmin from './TabContents/clinicAdmin';

import CreateAdmin from './create';
import PropTypes from 'prop-types';
import { USER_GROUPS, USER_ROLES } from 'variables/user';
import Dialog from 'components/Dialog';

const Admin = ({ translate }) => {
  const { keycloak } = useKeycloak();
  const [show, setShow] = useState(false);
  const [type, setType] = useState(undefined);
  const [editId, setEditId] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (keycloak.hasRealmRole(USER_ROLES.MANAGE_GLOBAL_ADMIN)) {
      setType(USER_GROUPS.GLOBAL_ADMIN);
    } else if (keycloak.hasRealmRole(USER_ROLES.MANAGE_COUNTRY_ADMIN)) {
      setType(USER_GROUPS.COUNTRY_ADMIN);
    } else if (keycloak.hasRealmRole(USER_ROLES.MANAGE_CLINIC_ADMIN)) {
      setType(USER_GROUPS.CLINIC_ADMIN);
    }
  }, [keycloak]);

  const handleEdit = (id) => {
    setEditId(id);
    setShow(true);
  };

  const handleClose = () => {
    setEditId('');
    setShow(false);
  };
  const handleShow = () => setShow(true);

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

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h1>{translate('admin.management')}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" onClick={handleShow}>
            <BsPlus size={20} className="mr-1" />
            {translate('admin.new')}
          </Button>
        </div>
      </div>

      <Tabs activeKey={type} onSelect={(key) => setType(key)} transition={false}>
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_GLOBAL_ADMIN) && (
          <Tab eventKey={USER_GROUPS.GLOBAL_ADMIN} title={translate('global_admin')}>
            <GlobalAdmin handleEdit={handleEdit} type={type} handleDelete={handleDelete} />
          </Tab>
        )}
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_COUNTRY_ADMIN) && (
          <Tab eventKey={USER_GROUPS.COUNTRY_ADMIN} title={translate('country_admin')}>
            <CountryAdmin handleEdit={handleEdit} type={type} handleDelete={handleDelete} />
          </Tab>
        )}
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_CLINIC_ADMIN) && (
          <Tab eventKey={USER_GROUPS.CLINIC_ADMIN} title={translate('clinic_admin')}>
            <ClinicAdmin handleEdit={handleEdit} type={type} handleDelete={handleDelete} />
          </Tab>
        )}
      </Tabs>

      {show && <CreateAdmin show={show} handleClose={handleClose} editId={editId} setType={setType} type={type} />}
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
    </>
  );
};

Admin.propTypes = {
  translate: PropTypes.func
};

export default Admin;
