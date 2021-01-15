import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import settings from 'settings';
import { createTermAndCondition, updateTermAndCondition } from 'store/termAndCondition/actions';

const CreateTermAndCondition = ({ show, editId, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();

  const [errorContent, setErrorContent] = useState(false);
  const [errorVersion, setVersion] = useState(false);
  const { languages } = useSelector(state => state.language);
  const { termAndConditions } = useSelector(state => state.termAndCondition);

  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    version: '',
    content: ''
  });

  useEffect(() => {
    if (languages.length) {
      setLanguage(languages[0].id);
    }
  }, [languages]);

  useEffect(() => {
    if (editId && termAndConditions.length) {
      const termAndCondition = termAndConditions.find(term => term.id === editId);
      setFormFields({
        version: termAndCondition.version,
        content: termAndCondition.content
      });
    }
  }, [editId, termAndConditions]);

  const handleLanguageChange = e => {
    const { value } = e.target;
    setLanguage(value);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleConfirm = () => {
    let canSave = true;

    if (formFields.version === '') {
      canSave = false;
      setVersion(true);
    } else {
      setVersion(false);
    }

    if (formFields.content === '') {
      canSave = false;
      setErrorContent(true);
    } else {
      setErrorContent(false);
    }

    if (canSave) {
      if (editId) {
        dispatch(updateTermAndCondition(editId, { ...formFields, lang: language }))
          .then(result => {
            if (result) {
              handleClose();
            }
          });
      } else {
        dispatch(createTermAndCondition({ ...formFields, lang: language }))
          .then(result => {
            if (result) {
              handleClose();
            }
          });
      }
    }
  };

  return (
    <Dialog
      size="lg"
      show={show}
      title={translate(editId ? 'term_and_condition.edit' : 'term_and_condition.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
    >
      <Form>
        <Form.Group controlId="formLanguage">
          <Form.Label>{translate('common.show_language.version')}</Form.Label>
          <Form.Control as="select" value={editId ? language : ''} onChange={handleLanguageChange} disabled>
            {languages.map((language, index) => (
              <option key={index} value={language.id}>
                {language.name} {language.code === language.fallback && `(${translate('common.default')})`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="version">
          <Form.Label>{translate('term_and_condition.version')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            name="version"
            onChange={handleChange}
            type="text"
            placeholder={translate('placeholder.term_and_condition.version')}
            isInvalid={errorVersion}
            value={formFields.version}
            maxLength={settings.textMaxLength}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.term_and_condition.version')}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>{translate('term_and_condition.content')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            as="textarea"
            name="content"
            onChange={handleChange}
            placeholder={translate('placeholder.term_and_condition.content')}
            isInvalid={errorContent}
            value={formFields.content}
            rows={15}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.term_and_condition.content')}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Dialog>
  );
};

CreateTermAndCondition.propTypes = {
  show: PropTypes.bool,
  editId: PropTypes.number,
  handleClose: PropTypes.func
};

export default CreateTermAndCondition;
