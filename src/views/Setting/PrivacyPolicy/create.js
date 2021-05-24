import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import settings from 'settings';
import { createPrivacyPolicy, updatePrivacyPolicy } from 'store/privacyPolicy/actions';

const CreatePrivacyPolicy = ({ show, editId, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();

  const [errorContent, setErrorContent] = useState(false);
  const [errorContentMessage, setErrorContentMessage] = useState('');
  const [errorClass, setErrorClass] = useState('');
  const [errorVersion, setVersion] = useState(false);
  const { languages } = useSelector(state => state.language);
  const { privacyPolicies } = useSelector(state => state.privacyPolicy);

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
    if (editId && privacyPolicies.length) {
      const privacyPolicy = privacyPolicies.find(privacyPolicy => privacyPolicy.id === editId);
      setFormFields({
        version: privacyPolicy.version
      });
      setContent(privacyPolicy.content);
    }
  }, [editId, privacyPolicies]);

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
      setErrorContentMessage(translate('error.privacy_policy.version'));
      setErrorClass('error-feedback');
    } else {
      setErrorContent(false);
    }

    if (canSave) {
      if (editId) {
        dispatch(updatePrivacyPolicy(editId, { ...formFields, content, lang: language }))
          .then(result => {
            if (result) {
              handleClose();
            }
          });
      } else {
        dispatch(createPrivacyPolicy({ ...formFields, content, lang: language }))
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
      title={translate(editId ? 'privacy_policy.edit' : 'privacy_policy.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
    >
      <Form>
        <Form.Group controlId="formLanguage">
          <Form.Label>{translate('common.show_language.version')}</Form.Label>
          <Form.Control as="select" value={editId ? language : ''} onChange={handleLanguageChange} disabled={!editId}>
            {languages.map((language, index) => (
              <option key={index} value={language.id}>
                {language.name} {language.code === language.fallback && `(${translate('common.default')})`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="version">
          <Form.Label>{translate('privacy_policy.version')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            name="version"
            onChange={handleChange}
            type="text"
            placeholder={translate('placeholder.privacy_policy.version')}
            isInvalid={errorVersion}
            value={formFields.version}
            maxLength={settings.textMaxLength}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.privacy_policy.version')}
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
          <span className={errorClass}>{ errorContentMessage }</span>
        </Form.Group>
      </Form>
    </Dialog>
  );
};

CreatePrivacyPolicy.propTypes = {
  show: PropTypes.bool,
  editId: PropTypes.number,
  handleClose: PropTypes.func
};

export default CreatePrivacyPolicy;
