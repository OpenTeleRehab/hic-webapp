import React, { useEffect, useState } from 'react';
import {
  Form
} from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import settings from 'settings';
import { createGuidancePage, getGuidancePage, updateGuidancePage } from 'store/guidancePage/actions';
import { Editor } from '@tinymce/tinymce-react';

const CreateGuidancePage = ({ show, editId, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();

  const [errorContent, setErrorContent] = useState(false);
  const { languages } = useSelector(state => state.language);
  const { profile } = useSelector((state) => state.auth);

  const { guidancePage, filters } = useSelector(state => state.guidancePage);

  const [language, setLanguage] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (languages.length) {
      if (editId) {
        if (filters && filters.lang) {
          setLanguage(filters.lang);
        } else if (profile && profile.language_id) {
          setLanguage(profile.language_id);
        }
      } else {
        setLanguage(languages[0].id);
      }
    }
  }, [languages, filters, editId, profile]);

  useEffect(() => {
    if (editId && language) {
      dispatch(getGuidancePage(editId, language));
    }
  }, [editId, language, dispatch]);

  useEffect(() => {
    if (editId && guidancePage.id) {
      setContent(guidancePage.content || '');
    }
  }, [editId, guidancePage]);

  const handleLanguageChange = e => {
    const { value } = e.target;
    setLanguage(value);
  };

  const handleEditorChange = (value, editor) => {
    setContent(value);
  };

  const handleConfirm = () => {
    let canSave = true;

    if (content === '') {
      canSave = false;
      setErrorContent(true);
    } else {
      setErrorContent(false);
    }

    if (canSave) {
      if (editId) {
        dispatch(updateGuidancePage(editId, { content, lang: language }))
          .then(result => {
            if (result) {
              handleClose();
            }
          });
      } else {
        dispatch(createGuidancePage({ content, lang: language }))
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
      title={translate(editId ? 'guidance_page.edit' : 'guidance_page.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
    >
      <Form onSubmit={handleConfirm}>
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
        <Form.Group controlId="content">
          <Form.Label>{translate('term_and_condition.content')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Editor
            apiKey={settings.tinymce.apiKey}
            name="content"
            isInvalid={errorContent}
            value={content}
            init={{
              height: 500,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link | help'
            }}
            onEditorChange={handleEditorChange}
          />
          {errorContent &&
            <div className="invalid-feedback d-block">{translate('error.term_and_condition.content')}</div>
          }
        </Form.Group>
      </Form>
    </Dialog>
  );
};

CreateGuidancePage.propTypes = {
  show: PropTypes.bool,
  editId: PropTypes.number,
  handleClose: PropTypes.func
};

export default CreateGuidancePage;
