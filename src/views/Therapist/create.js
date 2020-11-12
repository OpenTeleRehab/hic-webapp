import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import validateEmail from 'utils/validateEmail';
import { createTherapist } from 'store/therapist/actions';

const CreateTherapist = ({ show, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorLimitPatient, setErrorLimitPatient] = useState(false);

  const [formFields, setFormFields] = useState({
    email: '',
    first_name: '',
    last_name: '',
    country: '',
    limit_patient: '',
    institution: ''
  });
  useEffect(() => {
    if (!show) {
      resetData();
    }
  }, [show]);

  const resetData = () => {
    setErrorEmail(false);
    setErrorCountry(false);
    setErrorLimitPatient(false);
    setFormFields({
      email: '',
      first_name: '',
      last_name: '',
      country: '',
      limit_patient: '',
      birth_date: '',
      institution: ''
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
      console.log('test');
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (formFields.country === '') {
      canSave = false;
      setErrorCountry(true);
    } else {
      setErrorCountry(false);
    }

    if (formFields.limit_patient === '') {
      canSave = false;
      setErrorLimitPatient(true);
    } else {
      setErrorLimitPatient(false);
    }

    if (canSave) {
      dispatch(createTherapist(formFields))
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
      title={translate('therapist.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
    >
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>{translate('common.email')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            name="email"
            onChange={handleChange}
            type="email"
            placeholder={translate('placeholder.email')}
            isInvalid={errorEmail}
            value={formFields.email}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.email')}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Row>
          <Form.Group controlId="formCountry">
            <Form.Label>{translate('common.country')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="country"
              onChange={handleChange}
              as="select"
              isInvalid={errorCountry}
              value={formFields.country}
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
          <Form.Group as={Col} controlId="patient">
            <Form.Label>Patient Limit(Default:15)</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="limit_patient"
              onChange={handleChange}
              placeholder={translate('placeholder.limit_patient')}
              isInvalid={errorLimitPatient}
              value={formFields.limit_patient}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.limit_patient')}
            </Form.Control.Feedback>
            <p className={'mt-1'}>Ongoing Patients: 13</p>
          </Form.Group>
        </Form.Row>
        <><hr /></>
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
        <Form.Row>
          <Form.Group as={Col} controlId="dateOfBirth">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              name="birth_date"
              onChange={handleChange}
              placeholder={translate('placeholder.birth_date')}
            />
            <p className={'mt-1'}> Age: 38</p>
          </Form.Group>
          <Form.Group as={Col} controlId="institution">
            <Form.Label>Institution</Form.Label>
            <Form.Control
              name="institution"
              onChange={handleChange}
              placeholder="Enter Institution"
            />
          </Form.Group>
        </Form.Row>
      </Form>
    </Dialog>
  );
};

CreateTherapist.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func
};

export default CreateTherapist;
