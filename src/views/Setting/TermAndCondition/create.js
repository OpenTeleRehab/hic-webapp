import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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
    version: ''
  });

  const [content, setContent] = useState('');

  useEffect(() => {
    if (languages.length) {
      setLanguage(languages[0].id);
    }
  }, [languages]);

  useEffect(() => {
    if (editId && termAndConditions.length) {
      const termAndCondition = termAndConditions.find(term => term.id === editId);
      setFormFields({
        version: termAndCondition.version
      });
      setContent(termAndCondition.content);
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

    if (content === '') {
      canSave = false;
      setErrorContent(true);
    } else {
      setErrorContent(false);
    }

    if (canSave) {
      if (editId) {
        dispatch(updateTermAndCondition(editId, { ...formFields, content, lang: language }))
          .then(result => {
            if (result) {
              handleClose();
            }
          });
      } else {
        dispatch(createTermAndCondition({ ...formFields, content, lang: language }))
          .then(result => {
            if (result) {
              handleClose();
            }
          });
      }
    }
  };

  const handleEditorChange = (value, editor) => {
    setContent(value);
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
        <Form.Group controlId="version">
          <Form.Label>Content</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Editor
            apiKey={settings.tinymce.apiKey}
            name="content"
            value={content}
            isInvalid={errorContent}
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
              height: 500,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link | help'
            }}
            onEditorChange={handleEditorChange}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.term_and_condition.version')}
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
