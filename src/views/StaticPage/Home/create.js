import React, { useEffect, useState } from 'react';
import {
  Form,
  Button
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import settings from 'settings';
import { getHomePage, createStaticPage, updateStaticPage } from 'store/staticPage/actions';
import { toMB } from '../../../utils/file';
import { BsUpload, BsXCircle } from 'react-icons/bs/index';
import { Editor } from '@tinymce/tinymce-react';

import Select from 'react-select';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../variables/routes';
import scssColors from '../../../scss/custom.scss';

const CreateHomePage = ({ type, editId }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();
  const { maxFileSize } = settings.educationMaterial;

  const [errorContent, setErrorContent] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [materialFile, setMaterialFile] = useState(undefined);
  const [fileError, setFileError] = useState(false);
  const { languages } = useSelector(state => state.language);
  const { profile } = useSelector((state) => state.auth);
  const [disabled, setDisable] = useState(true);

  const { homePage, filters } = useSelector(state => state.staticPage);

  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    url: type,
    title: '',
    file: undefined,
    display_quick_stat: '',
    display_feature_resource: ''
  });
  const [content, setContent] = useState('');
  const [partnerContent, setPartnerContent] = useState('');

  useEffect(() => {
    if (languages.length) {
      if (editId) {
        if (filters && filters.lang) {
          setLanguage(filters.lang);
        } else if (profile && profile.language_id) {
          setLanguage(profile.language_id);
        } else {
          setLanguage(languages[0].id);
        }
      } else {
        setLanguage(languages[0].id);
      }
    }
  }, [languages, filters, editId, profile]);

  useEffect(() => {
    dispatch(getHomePage({
      'url-segment': type,
      lang: profile && profile.language_id
    }));
  }, [dispatch, profile, type]);

  useEffect(() => {
    if (homePage.id) {
      setFormFields({
        title: homePage.title || '',
        url: homePage.url || type,
        content: homePage.content,
        display_quick_stat: homePage.homeData ? homePage.homeData.display_quick_stat : 0,
        display_feature_resource: homePage.homeData ? homePage.homeData.display_feature_resource : 0
      });
      setMaterialFile(homePage.file);
      setContent(homePage.content || '');
      setPartnerContent(homePage.partner_content || '');
    }
  }, [homePage, type]);

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setDisable(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    setDisable(false);
  };

  const handleCheck = e => {
    const { name, checked } = e.target;
    setFormFields({ ...formFields, [name]: checked });
    setDisable(false);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormFields({ ...formFields, [name]: files[0] });
    setDisable(false);

    const file = files[0];
    if (file) {
      const fileName = file.name;
      const fileSize = (file.size / 1024).toFixed(2);
      const fileType = file.type;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setMaterialFile({ url: reader.result, fileName, fileSize, fileType, file });
      };
    }
  };

  const handleFileRemove = (e) => {
    setMaterialFile(null);
    setFormFields({ ...formFields, file: undefined });
    setDisable(false);
  };

  const handleEditorChange = (value, editor) => {
    setContent(value);
    setDisable(false);
  };

  const handlePartnerChange = (value, editor) => {
    setPartnerContent(value);
    setDisable(false);
  };

  const handleConfirm = () => {
    let canSave = true;

    if (formFields.title === '') {
      canSave = false;
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    if (content === '') {
      canSave = false;
      setErrorContent(true);
    } else {
      setErrorContent(false);
    }

    if (formFields.file !== undefined && toMB(formFields.file.size) > maxFileSize) {
      canSave = false;
      setFileError(true);
    } else {
      setFileError(false);
    }

    if (canSave) {
      if (homePage.id) {
        dispatch(updateStaticPage(homePage.id, { ...formFields, content, partnerContent, lang: language }));
        dispatch(updateStaticPage(homePage.id, { ...formFields, content, partnerContent, lang: language }))
          .then(result => {
            if (result) {
              dispatch(getHomePage({
                'url-segment': type,
                lang: profile && profile.language_id
              }));
            }
          });
      } else {
        dispatch(createStaticPage({ ...formFields, content, partnerContent, lang: language })).then(result => {
          if (result) {
            dispatch(getHomePage({
              'url-segment': type,
              lang: profile && profile.language_id
            }));
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

  const customSelectStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: scssColors.infoLight
      }
    })
  };

  return (
    <div className="no-gutters bg-white p-md-3">
      <Form onKeyPress={(e) => handleFormSubmit(e)}>
        <Form.Group controlId="formLanguage">
          <Form.Label>{translate('common.show_language.version')}</Form.Label>
          <Select
            isDisabled={!homePage.id}
            classNamePrefix="filter"
            value={languages.filter(option => option.id === language)}
            getOptionLabel={option => `${option.name} ${option.code === option.fallback ? translate('common.default') : ''}`}
            options={languages}
            onChange={(e) => handleLanguageChange(e.id)}
            styles={customSelectStyles}
          />
        </Form.Group>
        <Form.Group controlId="formFile">
          <Form.Label>{translate('static_page.image')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {formFields.file !== undefined
              ? translate('education_material.upload_file.max_size', { size: maxFileSize }) : ''
            }
          </Form.Control.Feedback>

          <div className="w-50">
            {materialFile && (
              <div className="mb-2 position-relative">
                <Button variant="link" onClick={() => handleFileRemove()} className="position-absolute btn-remove">
                  <BsXCircle size={20} color={scssColors.danger} />
                </Button>
                <img src={materialFile.url || `${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`} alt="..." className="w-100 img-thumbnail"/>
                <div>{materialFile.fileName} {materialFile.fileSize ? ('(' + materialFile.fileSize + 'kB )') : ''}</div>
              </div>
            )}
            <div className="btn btn-sm bg-white btn-outline-primary text-primary position-relative overflow-hidden" >
              <BsUpload size={15}/> Upload Image
              <input type="file" name="file" className="position-absolute upload-btn" onChange={handleFileChange} accept="image/*" isInvalid={fileError} />
            </div>
          </div>
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>{translate('static_page.title')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            name="title"
            onChange={handleChange}
            type="text"
            placeholder={translate('placeholder.static_page.title')}
            value={formFields.title}
            maxLength={settings.textMaxLength}
            isInvalid={errorTitle}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.static_page.title')}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>{translate('home_introduction_text')}</Form.Label>
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
              toolbar:
              'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link | help'
            }}
            onEditorChange={handleEditorChange}
          />
          {errorContent &&
            <div className="invalid-feedback d-block">{translate('error.home_introduction_text')}</div>
          }
        </Form.Group>
        <Form.Group controlId="formQuickStat">
          <Form.Check
            name="display_quick_stat"
            onChange={handleCheck}
            value={true}
            checked={formFields.display_quick_stat}
            label={translate('home_display_quick_stat')}
          />
        </Form.Group>
        <Form.Group controlId="formFeatureResource">
          <Form.Check
            name="display_feature_resource"
            onChange={handleCheck}
            value={true}
            checked={formFields.display_feature_resource}
            label={translate('home_display_feature_resource')}
          />
        </Form.Group>
        <Form.Group controlId="partner_content">
          <Form.Label>{translate('static_page_partner_content')}</Form.Label>
          <Editor
            apiKey={settings.tinymce.apiKey}
            name="partner_content"
            value={partnerContent}
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
            onEditorChange={handlePartnerChange}
          />
        </Form.Group>
        <div className="sticky-bottom d-flex justify-content-end">
          <Button
            onClick={handleConfirm}
            disabled={disabled}
          >
            {translate('common.save')}
          </Button>
          <Button
            className="ml-2"
            variant="outline-dark"
            as={Link}
            to={ROUTES.ADMIN_RESOURCES}
          >
            {translate('common.cancel')}
          </Button>
        </div>
      </Form>
    </div>
  );
};

CreateHomePage.propTypes = {
  type: PropTypes.string,
  editId: PropTypes.number
};

export default CreateHomePage;
