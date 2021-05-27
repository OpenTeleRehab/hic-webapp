import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { createCountry, updateCountry, getDefinedCountries } from 'store/country/actions';
import { Clinic as clinicService } from 'services/clinic';

const CreateCountry = ({ show, editId, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();

  const [errorTherapistLimit, setErrorTherapistLimit] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const languages = useSelector(state => state.language.languages);
  const countries = useSelector(state => state.country.countries);
  const definedCountries = useSelector(state => state.country.definedCountries);
  const [totalTherapistLimitByCountry, setTotalTherapistLimitByCountry] = useState(0);
  const [errorTherapistLimitMessage, setErrorTherapistLimitMessage] = useState('');

  const [formFields, setFormFields] = useState({
    name: '',
    country_code: '',
    iso_code: '',
    phone_code: '',
    language: '',
    therapist_limit: 50
  });

  useEffect(() => {
    dispatch(getDefinedCountries());
  }, [dispatch]);

  useEffect(() => {
    if (editId && countries.length) {
      const country = countries.find(country => country.id === editId);
      setFormFields({
        name: country.name,
        country_code: country.iso_code,
        iso_code: country.iso_code,
        phone_code: country.phone_code,
        language: country.language_id,
        therapist_limit: country.therapist_limit
      });

      clinicService.countTherapistLimitByCountry(country.id).then(res => {
        if (res.data) {
          setTotalTherapistLimitByCountry(res.data.total);
        }
      });
    }
  }, [editId, countries]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleCountryChange = e => {
    const { value } = e.target;

    const definedCountry = definedCountries.find(definedCountry => definedCountry.iso_code === value);
    if (definedCountry) {
      setFormFields({
        ...formFields,
        iso_code: definedCountry.iso_code,
        phone_code: definedCountry.phone_code,
        country_code: definedCountry.iso_code,
        name: definedCountry.name
      });
    }
  };

  const handleConfirm = () => {
    let canSave = true;

    if (formFields.country_code === '') {
      canSave = false;
      setErrorName(true);
    } else {
      setErrorName(false);
    }

    const pattern = new RegExp(/^[0-9\b]+$/);
    if (formFields.therapist_limit === '') {
      canSave = false;
      setErrorTherapistLimit(true);
      setErrorTherapistLimitMessage(translate('error.country.therapist_limit'));
    } else if (!pattern.test(formFields.therapist_limit)) {
      canSave = false;
      setErrorTherapistLimit(true);
      setErrorTherapistLimitMessage(translate('error.country.therapist_limit.format'));
    } else if (editId && parseInt(formFields.therapist_limit) < parseInt(totalTherapistLimitByCountry)) {
      canSave = false;
      setErrorTherapistLimit(true);
      setErrorTherapistLimitMessage(translate('error.country.therapist_limit.lessthan.theraist_limit_clinic'));
    } else {
      setErrorTherapistLimit(false);
    }

    if (canSave) {
      if (editId) {
        dispatch(updateCountry(editId, formFields)).then(result => {
          if (result) {
            handleClose();
          }
        });
      } else {
        dispatch(createCountry(formFields)).then(result => {
          if (result) {
            handleClose();
          }
        });
      }
    }
  };

  return (
    <Dialog
      show={show}
      title={translate(editId ? 'country.edit' : 'country.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
    >
      <Form onSubmit={handleConfirm}>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>{translate('country.name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="country_code"
              onChange={handleCountryChange}
              as="select"
              value={formFields.country_code}
              isInvalid={errorName}
            >
              <option value="">{translate('placeholder.country')}</option>
              {definedCountries.map((country, index) => (
                <option key={index} value={country.iso_code}>{country.name}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {translate('error.country.name')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="patient">
            <Form.Label>{translate('country.iso_code')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="iso_code"
              placeholder={translate('placeholder.country.iso_code')}
              value={formFields.iso_code}
              disabled={true}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="phone_code">
            <Form.Label>{translate('country.phone_code')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="phone_code"
              type="text"
              placeholder={translate('placeholder.country.phone_code')}
              value={formFields.phone_code}
              disabled={true}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLanguage">
            <Form.Label>{translate('common.language')}</Form.Label>
            <Form.Control
              name="language"
              onChange={handleChange}
              as="select"
              value={formFields.language}
            >
              <option value="">{translate('placeholder.language')}</option>
              {languages.map((language, index) => (
                <option key={index} value={language.id}>{language.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formTherapistLimit">
          <Form.Label>{translate('common.therapist_limit')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            name="therapist_limit"
            onChange={handleChange}
            type="text"
            placeholder={translate('placeholder.country.therapist_limit')}
            isInvalid={errorTherapistLimit}
            value={formFields.therapist_limit}
          />
          <Form.Control.Feedback type="invalid">
            { errorTherapistLimitMessage }
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Dialog>
  );
};

CreateCountry.propTypes = {
  show: PropTypes.bool,
  editId: PropTypes.string,
  handleClose: PropTypes.func
};

export default CreateCountry;
