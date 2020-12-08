import React, { useEffect, useState } from 'react';
import { Button, Tabs, Tab } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useKeycloak } from '@react-keycloak/web';

import GlobalAdmin from './TabContents/globalAdmin';
import CountryAdmin from './TabContents/countryAdmin';
import ClinicAdmin from './TabContents/clinicAdmin';

import CreateAdmin from './create';
import PropTypes from 'prop-types';
import { USER_GROUPS, USER_ROLES } from 'variables/user';

const Admin = ({ translate }) => {
  const { keycloak } = useKeycloak();
  const [show, setShow] = useState(false);
  const [type, setType] = useState(undefined);
  const [editId, setEditId] = useState('');

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
          <Tab eventKey={USER_GROUPS.GLOBAL_ADMIN} title="Global Admins">
            <GlobalAdmin handleEdit={handleEdit} type={type} />
          </Tab>
        )}
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_COUNTRY_ADMIN) && (
          <Tab eventKey={USER_GROUPS.COUNTRY_ADMIN} title="Country Admins">
            <CountryAdmin handleEdit={handleEdit} type={type} />
          </Tab>
        )}
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_CLINIC_ADMIN) && (
          <Tab eventKey={USER_GROUPS.CLINIC_ADMIN} title="Clinic Admins">
            <ClinicAdmin handleEdit={handleEdit} type={type} />
          </Tab>
        )}
      </Tabs>

      {show && <CreateAdmin show={show} handleClose={handleClose} editId={editId} setType={setType} type={type} />}
    </>
  );
};

Admin.propTypes = {
  translate: PropTypes.func
};

export default Admin;
