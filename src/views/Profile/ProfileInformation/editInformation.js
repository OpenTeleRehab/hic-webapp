import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getTranslate } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../../variables/routes';
import { updateUserProfile } from 'store/user/actions';
import validateEmail from '../../../utils/validateEmail';

const EdiInformation = ({ editId }) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const { profile } = useSelector((state) => state.auth);
  const countries = useSelector(state => state.country.countries);
  const clinics = useSelector(state => state.clinic.clinics);

  const [errorLastName, setErrorLastName] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorClinic, setErrorClinic] = useState(false);

  const [formFields, setFormFields] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    country_id: '',
    clinic_id: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSave = () => {
    let canSave = true;

    if (formFields.last_name === '') {
      canSave = false;
      setErrorLastName(true);
    } else {
      setErrorLastName(false);
    }

    if (formFields.first_name === '') {
      canSave = false;
      setErrorFirstName(true);
    } else {
      setErrorFirstName(false);
    }

    if (formFields.email === '' || !validateEmail(formFields.email)) {
      canSave = false;
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (formFields.gender === '') {
      canSave = false;
      setErrorGender(true);
    } else {
      setErrorGender(false);
    }

    if (formFields.country_id === '') {
      canSave = false;
      setErrorCountry(true);
    } else {
      setErrorCountry(false);
    }

    if (formFields.clinic_id === '') {
      canSave = false;
      setErrorClinic(true);
    } else {
      setErrorClinic(false);
    }

    if (canSave) {
      dispatch(updateUserProfile(profile.id, formFields))
        .then((result) => {
          if (result) {
          // history.goBack();
          }
        });
    }
  };

  useEffect(() => {
    if (profile) {
      setFormFields({
        email: profile.email,
        gender: profile.gender || '',
        first_name: profile.first_name,
        last_name: profile.last_name,
        country_id: profile.country_id || '',
        clinic_id: profile.clinic_id || ''
      });
    } else {
      resetData();
    }
  }, [profile]);

  if (profile === undefined) {
    return React.Fragment;
  }

  const resetData = () => {
    setErrorFirstName(false);
    setErrorLastName(false);
    setErrorEmail(false);
    setErrorGender(false);
    setErrorCountry(false);
    setErrorClinic(false);
    setFormFields({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      country_id: '',
      clinic_id: ''
    });
  };

  return (
    <>
      <Form
        className="mt-4"
      >
        <Form.Row >
          <Form.Group className="col-sm-2 md-4" controlId="formLastName">
            <Form.Label>{translate('common.last_name')}</Form.Label>
            <Form.Control
              name="last_name"
              onChange={handleChange}
              isInvalid={errorLastName}
              value={formFields.last_name}

            />
            <Form.Control.Feedback type="invalid">
              {translate('error.last_name')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="col-sm-2 md-4" controlId="formFirstName">
            <Form.Label>{translate('common.first_name')}</Form.Label>
            <Form.Control
              name="first_name"
              onChange={handleChange}
              isInvalid={errorFirstName}
              value={formFields.first_name}

            />
            <Form.Control.Feedback type="invalid">
              {translate('error.first_name')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="col-sm-4 md-4" controlId="formEmail">
            <Form.Label>{translate('common.email')}</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              type="email"
              isInvalid={errorEmail}
              value={formFields.email}

            />
            <Form.Control.Feedback type="invalid">
              {translate('error.email')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="col-sm-4 md-4" controlId="formGender">
            <Form.Label>{translate('gender')}</Form.Label>
            <Form.Control
              name="gender"
              as="select"
              onChange={handleChange}
              isInvalid={errorGender}
              value={formFields.gender}
            >
              <option value="">{translate('placeholder.gender')}</option>
              <option value="male">{translate('male')}</option>
              <option value="female">{translate(('female'))}</option>
              <option value="other">{translate(('other'))}</option>
            </Form.Control>

          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group className="col-sm-4 md-4" controlId="formCountry">
            <Form.Label>{translate('common.country')}</Form.Label>
            <Form.Control
              name="country_id"
              onChange={handleChange}
              as="select"
              value={formFields.country_id}
              isInvalid={errorCountry}

            >
              <option value="">{translate('placeholder.country')}</option>
              {countries.map((country, index) => (
                <option key={index} value={country.identity}>{country.name}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {translate('error.country')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group className="col-sm-4 md-4" controlId="formClinic">
            <Form.Label>{translate('common.clinic')}</Form.Label>
            <Form.Control
              name="clinic_id"
              onChange={handleChange}
              as="select"
              isInvalid={errorClinic}
              value={formFields.clinic_id}
              disabled={!!editId}

            >
              <option value="">{translate('placeholder.clinic')}</option>
              {clinics.map((clinic, index) => (
                <option key={index} value={clinic.identity}>{clinic.name}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {translate('error.clinic')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleSave}
          >
            {translate('common.save')}
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            disabled={!formFields.current_password && !formFields.new_password && !formFields.confirm_password}
          >
            <NavLink
              exact
              to={ROUTES.AVATAR}
              key='avatar'
            >
              {translate('common.cancel')}
            </NavLink>
          </button>
        </Form.Row>
      </Form>
    </>
  );
};

EdiInformation.propTypes = {
  editId: PropTypes.string
};

export default EdiInformation;
