import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getTranslate } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { updateUserProfile } from 'store/user/actions';
import { USER_GROUPS } from 'variables/user';

const EdiInformation = ({ editId }) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const history = useHistory();
  const { profile } = useSelector((state) => state.auth);
  const countries = useSelector(state => state.country.countries);
  const clinics = useSelector(state => state.clinic.clinics);

  const [errorLastName, setErrorLastName] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [disabled, setDisable] = useState(true);

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
    setDisable(false);
  };

  const handleCancel = () => {
    history.goBack();
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

    if (canSave) {
      dispatch(updateUserProfile(profile.id, formFields))
        .then((result) => {
          if (result) {
            history.goBack();
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
    }
  }, [profile]);

  if (profile === undefined) {
    return React.Fragment;
  }

  return (
    <>
      <Form
        className="mt-4"
      >
        <Form.Row >
          <Form.Group className="col-sm-2 md-4" controlId="formLastName">
            <Form.Label>{translate('common.last_name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="last_name"
              placeholder={translate('placeholder.last_name')}
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
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="first_name"
              placeholder={translate('placeholder.first_name')}
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
              type="email"
              value={formFields.email}
              disabled

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
              value={formFields.gender}
            >
              <option value="">{translate('placeholder.gender')}</option>
              <option value="male">{translate('male')}</option>
              <option value="female">{translate(('female'))}</option>
              <option value="other">{translate(('other'))}</option>
            </Form.Control>

          </Form.Group>
        </Form.Row>

        { profile.type !== USER_GROUPS.GLOBAL_ADMIN && (
          <Form.Row>
            <Form.Group className="col-sm-4 md-4" controlId="formCountry">
              <Form.Label>{translate('common.country')}</Form.Label>
              <Form.Control
                name="country_id"
                as="select"
                value={formFields.country_id}
                disabled

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
        )}

        {profile.type === USER_GROUPS.CLINIC_ADMIN && (
          <Form.Row>
            <Form.Group className="col-sm-4 md-4" controlId="formClinic">
              <Form.Label>{translate('common.clinic')}</Form.Label>
              <Form.Control
                name="clinic_id"
                as="select"
                value={formFields.clinic_id}
                disabled

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
        )}

        <Form.Row>
          <Button
            disabled={disabled}
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            {translate('common.save')}
          </Button>

          <Button
            className="ml-2"
            variant="outline-dark"
            onClick={handleCancel}
          >
            {translate('common.cancel')}
          </Button>
        </Form.Row>
      </Form>
    </>
  );
};

EdiInformation.propTypes = {
  editId: PropTypes.string
};

export default EdiInformation;
