import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import validateEmail from 'utils/validateEmail';
import { USER_GROUPS } from 'variables/user';

import { createUser } from 'store/user/actions';

const CreateAdmin = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  const [hintMessage, setHintMessage] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorClinic, setErrorClinic] = useState(false);

  const [formFields, setFormFields] = useState({
    type: USER_GROUPS.GLOBAL_ADMIN,
    email: '',
    first_name: '',
    last_name: '',
    country_id: '',
    hospital_id: ''
  });

  useEffect(() => {
    if (!show) {
      resetData();
    }
  }, [show]);

  useEffect(() => {
    setErrorEmail(false);
    setErrorCountry(false);
    setErrorClinic(false);
    setFormFields({
      ...formFields,
      email: '',
      first_name: '',
      last_name: '',
      country_id: '',
      hospital_id: ''
    });

    if (formFields.type === USER_GROUPS.GLOBAL_ADMIN) {
      setHintMessage(translate('admin.hint_message_global_admin'));
    } else if (formFields.type === USER_GROUPS.COUNTRY_ADMIN) {
      setHintMessage(translate('admin.hint_message_country_admin'));
    } else {
      setHintMessage(translate('admin.hint_message_clinic_admin'));
    }

    // eslint-disable-next-line
  }, [formFields.type]);

  const resetData = () => {
    setErrorEmail(false);
    setErrorCountry(false);
    setErrorClinic(false);
    setFormFields({
      type: USER_GROUPS.GLOBAL_ADMIN,
      email: '',
      first_name: '',
      last_name: '',
      country_id: '',
      hospital_id: ''
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleConfirm = () => {
    let canSave = true;

    if (formFields.email === '' || !validateEmail(formFields.email)) {
      canSave = false;
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if ((formFields.type === USER_GROUPS.COUNTRY_ADMIN ||
        formFields.type === USER_GROUPS.CLINIC_ADMIN) &&
        formFields.country_id === '') {
      canSave = false;
      setErrorCountry(true);
    } else {
      setErrorCountry(false);
    }

    if (formFields.type === USER_GROUPS.CLINIC_ADMIN && formFields.hospital_id === '') {
      canSave = false;
      setErrorClinic(true);
    } else {
      setErrorClinic(false);
    }

    if (canSave) {
      dispatch(createUser(formFields))
        .then(result => {
          if (result) {
            handleClose();
          }
        });
    }
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
              name="type"
              onChange={handleChange}
              value={USER_GROUPS.GLOBAL_ADMIN}
              defaultChecked
              type="radio"
              label={translate('global_admin')}
              id="formGlobalAdmin"
            />
          </Col>
          <Col xs={7} md={8}>
            <Form.Check
              name="type"
              onChange={handleChange}
              value={USER_GROUPS.COUNTRY_ADMIN}
              type="radio"
              label={translate('country_admin')}
              id="formCountryAdmin"

            />
          </Col>
          <Col xs={7} md={8}>
            <Form.Check
              name="type"
              onChange={handleChange}
              value={USER_GROUPS.CLINIC_ADMIN}
              type="radio"
              label={translate('clinic_admin')}
              id="formClinicAdmin"
            />
          </Col>
        </Form.Group>
        <p className="text-muted font-italic">
          { hintMessage }
        </p>
        <Form.Group controlId="formEmail">
          <Form.Label>{translate('common.email')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            name="email"
            onChange={handleChange}
            type="email"
            placeholder={translate('placeholder.email')}
            value={formFields.email}
            isInvalid={errorEmail}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.email')}
          </Form.Control.Feedback>
        </Form.Group>
        {(formFields.type === USER_GROUPS.COUNTRY_ADMIN ||
          formFields.type === USER_GROUPS.CLINIC_ADMIN) && (
          <Form.Group controlId="formCountry">
            <Form.Label>{translate('common.country')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="country_id"
              onChange={handleChange}
              as="select"
              isInvalid={errorCountry}
              value={formFields.country_id}
            >
              <option value="">{translate('placeholder.country')}</option>
              <option value="1">Cambodia</option>
              <option value="2">Laos</option>
              <option value="3">Vietnam</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {translate('error.country')}
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {formFields.type === USER_GROUPS.CLINIC_ADMIN && (
          <Form.Group controlId="formClinic">
            <Form.Label>{translate('common.clinic')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="hospital_id"
              onChange={handleChange}
              as="select"
              isInvalid={errorClinic}
              value={formFields.hospital_id}
            >
              <option value="">{translate('placeholder.clinic')}</option>
              <option value="1">Clinic A</option>
              <option value="2">Clinic B</option>
              <option value="3">Clinic C</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {translate('error.clinic')}
            </Form.Control.Feedback>
          </Form.Group>
        )}
        <Form.Row>
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>{translate('common.first_name')}</Form.Label>
            <Form.Control
              name="first_name"
              onChange={handleChange}
              value={formFields.first_name}
              placeholder={translate('placeholder.first_name')}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>{translate('common.last_name')}</Form.Label>
            <Form.Control
              name="last_name"
              onChange={handleChange}
              value={formFields.last_name}
              placeholder={translate('placeholder.last_name')}
            />
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
