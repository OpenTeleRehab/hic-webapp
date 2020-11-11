import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import GlobalAdmin from './TabContents/globalAdmin';
import CountryAdmin from './TabContents/countryAdmin';
import ClinicAdmin from './TabContents/clinicAdmin';

import CreateAdmin from './create';
import PropTypes from 'prop-types';

const Admin = ({ translate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
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

      <CreateAdmin show={show} handleClose={handleClose} />

      <Tabs defaultActiveKey="global-admin" transition={false} id="admin-tab">
        <Tab eventKey="global-admin" title="Global Admins">
          <GlobalAdmin />
        </Tab>
        <Tab eventKey="country-admin" title="Country Admins">
          <CountryAdmin />
        </Tab>
        <Tab eventKey="clinic-admin" title="Clinic Admins">
          <ClinicAdmin />
        </Tab>
      </Tabs>
    </>
  );
};

Admin.propTypes = {
  translate: PropTypes.func
};

export default Admin;
