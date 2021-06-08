import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { createDisease, updateDisease } from 'store/disease/actions';
import settings from 'settings';

const CreateDisease = ({ show, editId, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const diseases = useSelector(state => state.disease.diseases);
  const [errorName, setErrorName] = useState(false);

  const [formFields, setFormFields] = useState({
    name: ''
  });

  useEffect(() => {
    if (editId && diseases.length) {
      const disease = diseases.find(disease => disease.id === editId);
      setFormFields({
        name: disease.name
      });
    } else {
      setFormFields({
        ...formFields
      });
    }
    // eslint-disable-next-line
  }, [editId, diseases, profile]);

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

    if (canSave) {
      if (editId) {
        dispatch(updateDisease(editId, formFields)).then(result => {
          if (result) {
            handleClose();
          }
        });
      } else {
        dispatch(createDisease(formFields)).then(result => {
          if (result) {
            handleClose();
          }
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

  return (
    <Dialog
      show={show}
      title={translate(editId ? 'disease.edit' : 'disease.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
    >
      <Form onKeyPress={(e) => handleFormSubmit(e)}>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>{translate('disease.name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="name"
              onChange={handleChange}
              type="text"
              placeholder={translate('placeholder.disease.name')}
              isInvalid={errorName}
              value={formFields.name}
              maxLength={settings.textMaxLength}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.disease.name')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
      </Form>
    </Dialog>
  );
};

CreateDisease.propTypes = {
  show: PropTypes.bool,
  editId: PropTypes.string,
  handleClose: PropTypes.func
};

export default CreateDisease;
