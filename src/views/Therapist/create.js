import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import validateEmail from 'utils/validateEmail';
import { createTherapist, updateTherapist } from 'store/therapist/actions';
import { getCountryName, getCountryIdentity } from 'utils/country';
import { getClinicName, getClinicIdentity } from 'utils/clinic';
import { getProfessions } from 'store/profession/actions';

const CreateTherapist = ({ show, handleClose, editId }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();

  const therapists = useSelector(state => state.therapist.therapists);
  const countries = useSelector(state => state.country.countries);
  const clinics = useSelector(state => state.clinic.clinics);

  const { profile } = useSelector((state) => state.auth);
  const professions = useSelector(state => state.profession.professions);
  const languages = useSelector(state => state.language.languages);
  const defaultLimitedPatients = useSelector(state => state.defaultLimitedPatient.defaultLimitedPatients);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorLimitPatient, setErrorLimitPatient] = useState(false);
  const [errorClinic, setErrorClinic] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);

  const [formFields, setFormFields] = useState({
    email: '',
    first_name: '',
    last_name: '',
    country: '',
    limit_patient: '',
    clinic: '',
    clinic_identity: '',
    country_identity: ''
  });

  useEffect(() => {
    dispatch(getProfessions());
  }, [dispatch]);

  const resetData = () => {
    setErrorEmail(false);
    setErrorCountry(false);
    setErrorLimitPatient(false);
    setErrorClinic(false);
    setFormFields({
      email: '',
      first_name: '',
      last_name: '',
      limit_patient: defaultLimitedPatients.value,
      clinic: '',
      country: ''
    });
  };

  useEffect(() => {
    if (editId && therapists.length) {
      const editingData = therapists.find(user => user.id === editId);
      setFormFields({
        email: editingData.email || '',
        first_name: editingData.first_name || '',
        last_name: editingData.last_name || '',
        country: editingData.country_id || '',
        clinic: editingData.clinic_id || '',
        limit_patient: editingData.limit_patient || '',
        language: editingData.language_id || '',
        profession: editingData.profession_id || ''
      });
    } else {
      resetData();
      if (profile !== undefined) {
        setFormFields({ ...formFields, country: profile.country_id, clinic: profile.clinic_id, country_identity: getCountryIdentity(profile.country_id, countries), clinic_identity: getClinicIdentity(profile.clinic_id, clinics) });
      }
    }
    // eslint-disable-next-line
  }, [editId, therapists, profile]);

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

    if (formFields.country === '') {
      canSave = false;
      setErrorCountry(true);
    } else {
      setErrorCountry(false);
    }

    if (formFields.first_name === '') {
      canSave = false;
      setErrorFirstName(true);
    } else {
      setErrorFirstName(false);
    }

    if (formFields.last_name === '') {
      canSave = false;
      setErrorLastName(true);
    } else {
      setErrorLastName(false);
    }

    if (formFields.clinic === '') {
      canSave = false;
      setErrorClinic(true);
    } else {
      setErrorClinic(false);
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
      if (editId) {
        dispatch(updateTherapist(editId, formFields)).then(result => {
          if (result) {
            handleClose();
          }
        });
      } else {
        dispatch(createTherapist(formFields)).then(result => {
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
      title={translate(editId ? 'admin.edit' : 'therapist.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
    >
      <Form onSubmit={handleConfirm}>
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
            disabled={!!editId}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.email')}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formCountry" className="mb-0">
            <Form.Label>{translate('common.country')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="country"
              onChange={handleChange}
              as="select"
              value={formFields.country}
              disabled
              isInvalid={errorCountry}
            >
              { profile !== undefined && (
                <option value={profile.country_id}>{getCountryName(profile.country_id, countries)}</option>
              )}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {translate('error.country')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="patient" className="mb-0">
            <Form.Label>{translate('common.limit_treatment')}</Form.Label>
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
            <p className="mt-1">{translate('common.on_going.treatment')}</p>
          </Form.Group>
        </Form.Row>
        <hr />
        <Form.Row>
          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>{translate('common.last_name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="last_name"
              onChange={handleChange}
              isInvalid={errorLastName}
              value={formFields.last_name}
              placeholder={translate('placeholder.last_name')}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.last_name')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>{translate('common.first_name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="first_name"
              onChange={handleChange}
              isInvalid={errorFirstName}
              value={formFields.first_name}
              placeholder={translate('placeholder.first_name')}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.first_name')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formProfession">
            <Form.Label>{translate('common.profession')}</Form.Label>
            <Form.Control
              name="profession"
              onChange={handleChange}
              as="select"
              value={formFields.profession}
            >
              <option value="">{translate('placeholder.profession')}</option>
              {professions.map((profession, index) => (
                <option key={index} value={profession.id}>{profession.name}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {translate('error.profession')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="clinic">
            <Form.Label>{translate('common.clinic')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="clinic"
              onChange={handleChange}
              as="select"
              value={formFields.clinic}
              disabled
              isInvalid={errorClinic}
            >
              { profile !== undefined && (
                <option value={profile.clinic_id}>{getClinicName(profile.clinic_id, clinics)}</option>
              )}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {translate('error.clinic')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="formLanguage">
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

CreateTherapist.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  editId: PropTypes.string
};

export default CreateTherapist;
