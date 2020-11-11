import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import CreateTherapist from '../Therapist/create';
import PropTypes from 'prop-types';
import CustomTable from 'components/Table';

const Therapist = ({ translate }) => {
  const [show, setShow] = useState(false);

  const columns = [
    { name: 'id', title: 'ID' },
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'email', title: 'Email' },
    { name: 'status', title: 'Status' },
    { name: 'lastLogin', title: 'Last Login' },
    { name: 'action', title: 'Actions' }
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h1>{translate('therapist.management')}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" onClick={handleShow}>
            <BsPlus className="mr-1" />
            {translate('therapist.new')}
          </Button>
        </div>
      </div>

      <CreateTherapist show={show} handleClose={handleClose} />

      <CustomTable columns={columns} />
    </>
  );
};

Therapist.propTypes = {
  translate: PropTypes.func
};

export default Therapist;
