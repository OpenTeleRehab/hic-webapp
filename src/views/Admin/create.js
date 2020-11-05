import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';

const CreateAdmin = ({ show, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  const handleConfirm = () => {
    console.log('-- todo: create admin user --');
  };

  return (
    <Dialog
      show={show}
      title={translate('admin.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
    >
      <Form>
        <Form.Group as={Row}>
          <Col xs={5} md={4}>
            <Form.Check
              defaultChecked
              type="radio"
              label="Global admin"
              name="formAdminType"
              id="formGlobalAdmin"
            />
          </Col>
          <Col xs={7} md={8}>
            <Form.Check
              type="radio"
              label="Country Admin"
              name="formAdminType"
              id="formCountryAdmin"
            />
          </Col>
        </Form.Group>
        <p className="text-muted">
          Global admins can manage Global Admins/ Country Admin, create and upload the content (exercises and questionnaires).
        </p>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control placeholder="Enter first name" />
          </Form.Group>
          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>First name</Form.Label>
            <Form.Control placeholder="Enter last name" />
          </Form.Group>
        </Form.Row>
      </Form>
    </Dialog>
  );
};

CreateAdmin.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func
};

export default CreateAdmin;
