import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';

import validateEmail from 'utils/validateEmail';
import { USER_GROUPS } from 'variables/user';
import settings from 'settings';
import Dialog from 'components/Dialog';
import { createUser, updateUser } from 'store/user/actions';

const CreateUser = ({ show, handleClose, editId, setType }) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const users = useSelector(state => state.user.users);
  const [hintMessage, setHintMessage] = useState('');
  const { profile } = useSelector((state) => state.auth);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    type: USER_GROUPS.ADMIN,
    email: '',
    first_name: '',
    last_name: ''
  });

  useEffect(() => {
    if (editId && users.length) {
      const editingData = users.find(user => user.id === editId);
      setFormFields({
        type: editingData.type,
        email: editingData.email || '',
        first_name: editingData.first_name || '',
        last_name: editingData.last_name || '',
        gender: editingData.gender
      });
    }
  }, [editId, users]);

  useEffect(() => {
    setErrorEmail(false);
    setErrorFirstName(false);
    setErrorLastName(false);

    if (!editId) {
      setFormFields({
        ...formFields,
        email: '',
        first_name: '',
        last_name: ''
      });
    }

    if (formFields.type === USER_GROUPS.ADMIN) {
      setHintMessage(translate('user.hint_message_user'));
    } else if (formFields.type === USER_GROUPS.MODERATOR) {
      setHintMessage(translate('user.hint_message_resource'));
    }
    // eslint-disable-next-line
  }, [formFields.type, profile]);

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

    if (canSave) {
      setIsLoading(true);
      if (editId) {
        dispatch(updateUser(editId, formFields))
          .then(result => {
            if (result) {
              setType(formFields.type);
              handleClose();
            }
            setIsLoading(false);
          });
      } else {
        dispatch(createUser(formFields))
          .then(result => {
            if (result) {
              setType(formFields.type);
              handleClose();
            }
            setIsLoading(false);
          });
      }
    }
  };

  const handleFormSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConfirm();
    }
  };

  const handleSingleSelectChange = (key, value) => {
    setFormFields({ ...formFields, [key]: value });
  };

  return (
    <Dialog
      show={show}
      title={translate(editId ? 'user.edit' : 'user.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
      disabled={isLoading}
    >
      <Form onKeyPress={(e) => handleFormSubmit(e)}>
        <fieldset>
          <legend className="d-none">Admin type</legend>
          <Form.Group as={Row}>
            <>
              <Col xs={5} md={4}>
                <Form.Check
                  name="type"
                  onChange={handleChange}
                  value={USER_GROUPS.ADMIN}
                  checked={formFields.type === USER_GROUPS.ADMIN}
                  type="radio"
                  label={translate('common.admin')}
                  id="formGlobalAdmin"
                />
              </Col>
              <Col xs={5} md={4}>
                <Form.Check
                  name="type"
                  onChange={handleChange}
                  value={USER_GROUPS.MODERATOR}
                  checked={formFields.type === USER_GROUPS.MODERATOR}
                  type="radio"
                  label={translate('common.moderator')}
                  id="formModerator"
                />
              </Col>
            </>
          </Form.Group>
        </fieldset>
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
            disabled={!!editId}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.email')}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>{translate('common.last_name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="last_name"
              onChange={handleChange}
              value={formFields.last_name}
              placeholder={translate('placeholder.last_name')}
              isInvalid={errorLastName}
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
              value={formFields.first_name}
              placeholder={translate('placeholder.first_name')}
              isInvalid={errorFirstName}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.first_name')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGender">
            <Form.Label>{translate('common.gender')}</Form.Label>
            <Select
              classNamePrefix="filter"
              value={settings.genders.options.filter(option => option.value === formFields.gender)}
              getOptionLabel={option => option.text}
              options={settings.genders.options}
              onChange={(e) => handleSingleSelectChange('gender', e.value)}
              aria-label="Gender"
            />
          </Form.Group>
        </Form.Row>
      </Form>
    </Dialog>
  );
};

CreateUser.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  editId: PropTypes.string,
  setType: PropTypes.func,
  type: PropTypes.string
};

export default CreateUser;
