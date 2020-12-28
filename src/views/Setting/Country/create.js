import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { createCountry, updateCountry } from 'store/country/actions';
import settings from 'settings';
import { getLanguageName } from 'utils/language';

const CreateCountry = ({ show, editId, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();

  const [errorIsoCode, setErrorIsoCode] = useState(false);
  const [errorPhoneCode, setErrorPhoneCode] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const languages = useSelector(state => state.language.languages);
  const countries = useSelector(state => state.country.countries);

  const [formFields, setFormFields] = useState({
    name: '',
    iso_code: '',
    phone_code: '',
    language: ''
  });

  useEffect(() => {
    if (editId && countries.length) {
      const country = countries.find(country => country.id === editId);
      setFormFields({
        name: country.name,
        iso_code: country.iso_code,
        phone_code: country.phone_code,
        language: getLanguageName(country.language_id, languages)
      });
    }
  }, [editId, countries, languages]);

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

    if (formFields.iso_code === '' || formFields.iso_code.length !== settings.isoCodeLength) {
      canSave = false;
      setErrorIsoCode(true);
    } else {
      setErrorIsoCode(false);
    }

    if (formFields.phone_code === '') {
      canSave = false;
      setErrorPhoneCode(true);
    } else {
      setErrorPhoneCode(false);
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
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>{translate('country.name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="name"
              onChange={handleChange}
              type="text"
              placeholder={translate('placeholder.country.name')}
              isInvalid={errorName}
              value={formFields.name}
              maxLength={settings.textMaxLength}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.country.name')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="patient">
            <Form.Label>{translate('country.iso_code')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="iso_code"
              onChange={handleChange}
              placeholder={translate('placeholder.country.iso_code')}
              isInvalid={errorIsoCode}
              value={formFields.iso_code}
            />
            <Form.Control.Feedback type="invalid">
              { errorIsoCode && formFields.iso_code === '' ? translate('error.country.iso_code') : translate('error.country.iso_code.format') }
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="phone_code">
            <Form.Label>{translate('country.phone_code')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="phone_code"
              onChange={handleChange}
              type="text"
              placeholder={translate('placeholder.country.phone_code')}
              isInvalid={errorPhoneCode}
              value={formFields.phone_code}
              maxLength={settings.phoneCodeMaxLength}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.country.phone_code')}
            </Form.Control.Feedback>
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
