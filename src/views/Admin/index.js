import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import GlobalAdmin from './TabContents/globalAdmin';
import CountryAdmin from './TabContents/countryAdmin';
import ClinicAdmin from './TabContents/clinicAdmin';

import CreateAdmin from './create';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { USER_GROUPS } from 'variables/user';
import { getUsers } from 'store/user/actions';

const Admin = ({ translate }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [type, setType] = useState(USER_GROUPS.GLOBAL_ADMIN);
  const [editId, setEditId] = useState('');

  const handleEdit = (id) => {
    setEditId(id);
    setShow(true);
  };

  useEffect(() => {
    if (type) {
      dispatch(getUsers({ admin_type: type }));
    }
  }, [type, dispatch]);

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
            <BsPlus className="mr-1" />
            {translate('admin.new')}
          </Button>
        </div>
      </div>

      <Tabs activeKey={type} onSelect={(key) => setType(key)} transition={false} id="admin-tab">
        <Tab eventKey={USER_GROUPS.GLOBAL_ADMIN} title="Global Admins">
          <GlobalAdmin handleEdit={handleEdit} />
        </Tab>
        <Tab eventKey={USER_GROUPS.COUNTRY_ADMIN} title="Country Admins">
          <CountryAdmin handleEdit={handleEdit} />
        </Tab>
        <Tab eventKey={USER_GROUPS.CLINIC_ADMIN} title="Clinic Admins">
          <ClinicAdmin handleEdit={handleEdit} />
        </Tab>
      </Tabs>

      {show && <CreateAdmin show={show} handleClose={handleClose} editId={editId} setType={setType} type={type} />}
    </>
  );
};

Admin.propTypes = {
  translate: PropTypes.func
};

export default Admin;
