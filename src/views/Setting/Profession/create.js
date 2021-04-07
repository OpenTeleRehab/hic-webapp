import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { createProfession, updateProfession } from 'store/profession/actions';
import settings from 'settings';

const CreateProfession = ({ show, editId, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const professions = useSelector(state => state.profession.professions);
  const [errorName, setErrorName] = useState(false);

  const [formFields, setFormFields] = useState({
    name: '',
    country_id: ''
  });

  useEffect(() => {
    if (editId && professions.length) {
      const profession = professions.find(profession => profession.id === editId);
      setFormFields({
        name: profession.name,
        country_id: profession.country_id
      });
    } else {
      setFormFields({
        ...formFields,
        country_id: profile.country_id
      });
    }
    // eslint-disable-next-line
  }, [editId, professions, profile]);

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
        dispatch(updateProfession(editId, formFields)).then(result => {
          if (result) {
            handleClose();
          }
        });
      } else {
        dispatch(createProfession(formFields)).then(result => {
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
      title={translate(editId ? 'profession.edit' : 'profession.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
    >
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>{translate('profession.name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="name"
              onChange={handleChange}
              type="text"
              placeholder={translate('placeholder.profession.name')}
              isInvalid={errorName}
              value={formFields.name}
              maxLength={settings.textMaxLength}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.profession.name')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
      </Form>
    </Dialog>
  );
};

CreateProfession.propTypes = {
  show: PropTypes.bool,
  editId: PropTypes.string,
  handleClose: PropTypes.func
};

export default CreateProfession;
