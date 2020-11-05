import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';

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

      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-0">Global Admins</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Country Admins</Nav.Link>
        </Nav.Item>
      </Nav>

      <CreateAdmin show={show} handleClose={handleClose} />
    </>
  );
};

Admin.propTypes = {
  translate: PropTypes.func
};

export default Admin;
