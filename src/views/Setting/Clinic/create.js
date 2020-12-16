import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { createClinic } from 'store/clinic/actions';
import settings from 'settings';
import { getCountryISO } from 'utils/country';

const CreateClinic = ({ show, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();

  const [errorName, setErrorName] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorRegion, setErrorRegion] = useState(false);

  const countries = useSelector(state => state.country.countries);
  const profile = useSelector(state => state.auth.profile);

  const [formFields, setFormFields] = useState({
    name: '',
    country: '',
    region: '',
    province: '',
    city: '',
    country_iso: ''
  });

  useEffect(() => {
    if (profile !== undefined) {
      setFormFields({ ...formFields, country: profile.country_id, country_iso: getCountryISO(profile.country_id, countries) });
    }
    // eslint-disable-next-line
  }, [profile, countries]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleConfirm = () => {
    let canSave = true;

    if (formFields.name === '') {
      canSave = false;
      setErrorName(true);
    } else {
      setErrorName(false);
    }

    if (formFields.region === '') {
      canSave = false;
      setErrorRegion(true);
    } else {
      setErrorRegion(false);
    }

    if (formFields.city === '') {
      canSave = false;
      setErrorCity(true);
    } else {
      setErrorCity(false);
    }

    if (canSave) {
      dispatch(createClinic(formFields)).then(result => {
        if (result) {
          handleClose();
        }
      });
    }
  };

  return (
    <Dialog
      show={show}
      title={translate('clinic.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={translate('common.create')}
    >
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="patient">
            <Form.Label>{translate('clinic.country.iso_code')}: {formFields.country_iso}</Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>{translate('clinic.name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="name"
              onChange={handleChange}
              type="text"
              placeholder={translate('placeholder.clinic.name')}
              isInvalid={errorName}
              value={formFields.name}
              maxLength={settings.textMaxLength}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.country.name')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="region">
            <Form.Label>{translate('clinic.region')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="region"
              onChange={handleChange}
              type="text"
              placeholder={translate('placeholder.clinic.region')}
              isInvalid={errorRegion}
              value={formFields.region}
              maxLength={settings.textMaxLength}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.clinic.region')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="city">
            <Form.Label>{translate('clinic.city')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="city"
              onChange={handleChange}
              type="text"
              placeholder={translate('placeholder.clinic.city')}
              isInvalid={errorCity}
              value={formFields.city}
              maxLength={settings.textMaxLength}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.clinic.city')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="province">
            <Form.Label>{translate('clinic.province')}</Form.Label>
            <Form.Control
              name="province"
              onChange={handleChange}
              type="text"
              placeholder={translate('placeholder.clinic.province')}
              value={formFields.province}
              maxLength={settings.textMaxLength}
            />
          </Form.Group>
        </Form.Row>
      </Form>
    </Dialog>
  );
};

CreateClinic.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func
};

export default CreateClinic;
