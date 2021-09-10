import React, { useEffect, useState } from 'react';
import {
  Form,
  Button, Row, Col
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import settings from 'settings';
import {
  createStaticPage,
  updateStaticPage,
  getStaticPage
} from 'store/staticPage/actions';
import { formatFileSize, toMB } from '../../../utils/file';
import { BsUpload, BsXCircle } from 'react-icons/bs';
import { Editor } from '@tinymce/tinymce-react';

import Select from 'react-select';
import scssColors from '../../../scss/custom.scss';
import { File } from '../../../services/file';

const AboutUs = ({ type }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();
  const { maxFileSize } = settings.educationMaterial;

  const [errorContent, setErrorContent] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [aboutUsFile, setAboutUsFile] = useState(undefined);
  const [fileError, setFileError] = useState(false);
  const { languages } = useSelector(state => state.language);
  const { profile } = useSelector((state) => state.auth);

  const { staticPage } = useSelector(state => state.staticPage);

  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    url: type,
    title: '',
    file: undefined
  });
  const [content, setContent] = useState('');
  const [partnerContent, setPartnerContent] = useState('');

  useEffect(() => {
    if (languages.length) {
      if (profile && profile.language_id) {
        setLanguage(profile.language_id);
      } else {
        setLanguage(languages[0].id);
      }
    }
  }, [languages, profile]);

  const enableButtons = () => {
    const languageObj = languages.find(item => item.id === parseInt(language, 10));
    return languageObj && languageObj.code === languageObj.fallback;
  };

  useEffect(() => {
    dispatch(getStaticPage({
      'url-segment': type,
      lang: language
    }));
  }, [dispatch, language, type]);

  useEffect(() => {
    if (staticPage && staticPage.url === type) {
      setFormFields({
        title: staticPage.title || '',
        url: staticPage.url || type,
        content: staticPage.content
      });
      setAboutUsFile(staticPage.file);
      setContent(staticPage.content || '');
      setPartnerContent(staticPage.partner_content || '');
    }
  }, [staticPage, type]);

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormFields({ ...formFields, [name]: files[0] });

    const file = files[0];
    if (file) {
      const fileName = file.name;
      const fileSize = file.size;
      const fileType = file.type;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAboutUsFile({ url: reader.result, fileName, fileSize, fileType, file });
      };
    }
  };

  const handleFileRemove = (e) => {
    setAboutUsFile(null);
    setFormFields({ ...formFields, file: undefined });
  };

  const handleEditorChange = (value, editor) => {
    setContent(value);
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
      if (staticPage.id) {
        dispatch(updateStaticPage(staticPage.id, { ...formFields, content, partnerContent, lang: language }))
          .then(result => {
            if (result) {
              dispatch(getStaticPage({
                'url-segment': type,
                lang: language
              }));
            }
          });
      } else {
        dispatch(createStaticPage({ ...formFields, content, partnerContent, lang: language })).then(result => {
          if (result) {
            dispatch(getStaticPage({
              'url-segment': type,
              lang: language
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

  const handlePartnerChange = (value, editor) => {
    setPartnerContent(value);
  };

  return (
    <div className="no-gutters bg-white p-md-3">
      <Form onKeyPress={(e) => handleFormSubmit(e)}>
        <Form.Group as={Row} controlId="formLanguage">
          <Form.Label column sm={3}>{translate('common.show_language.version')}</Form.Label>
          <Col sm={9}>
            <Select
              isDisabled={!staticPage.id}
              classNamePrefix="filter"
              value={languages.filter(option => option.id === language)}
              getOptionLabel={option => `${option.name} ${option.code === option.fallback ? translate('common.default') : ''}`}
              options={languages}
              onChange={(e) => handleLanguageChange(e.id)}
              styles={customSelectStyles}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formFile">
          <Form.Label column sm={3}>{translate('static_page.image')}</Form.Label>
          <Col sm={9}>
            <Form.Control.Feedback type="invalid">
              {formFields.file !== undefined
                ? translate('education_material.upload_file.max_size', { size: maxFileSize }) : ''
              }
            </Form.Control.Feedback>
            <div className="w-50">
              {aboutUsFile && (
                <div className="mb-2 position-relative">
                  {enableButtons() && (
                    <Button variant="link" onClick={() => handleFileRemove()} className="position-absolute btn-remove">
                      <BsXCircle size={20} color={scssColors.danger} />
                    </Button>
                  )}
                  <img src={aboutUsFile.url || `${process.env.REACT_APP_API_BASE_URL}/file/${aboutUsFile.id}`} alt="..." className="w-100 img-thumbnail"/>
                  <div>{aboutUsFile.fileName} {aboutUsFile.fileSize ? ('(' + formatFileSize(aboutUsFile.fileSize) + ')') : ''}</div>
                </div>
              )}
              {enableButtons() && (
                <div className="btn btn-sm bg-white btn-outline-primary text-primary position-relative overflow-hidden" >
                  <BsUpload size={15}/> Upload Image
                  <input type="file" name="file" className="position-absolute upload-btn" onChange={handleFileChange} accept="image/*" isInvalid={fileError} />
                </div>
              )}
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="title">
          <Col sm={3}>
            <Form.Label>{translate('static_page.title')}</Form.Label>
            <span className="text-dark ml-1">*</span>
          </Col>
          <Col sm={9}>
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
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="content">
          <Col sm={3}>
            <Form.Label>{translate('about_us.content')}</Form.Label>
            <span className="text-dark ml-1">*</span>
          </Col>
          <Col sm={9}>
            <Editor
              apiKey={settings.tinymce.apiKey}
              name="content"
              isInvalid={errorContent}
              value={content}
              init={{
                image_title: true,
                automatic_uploads: true,
                file_picker_types: 'image',
                file_picker_callback: (cb, value, meta) => {
                  var input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*');
                  input.onchange = function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = async () => {
                      const base64 = reader.result;
                      const fileUpload = {
                        url: base64,
                        fileName: file.name,
                        fileSize: file.size,
                        fileType: file.type
                      };
                      const data = await File.upload(fileUpload);
                      if (data.success) {
                        const file = data.data;
                        const path = process.env.REACT_APP_API_BASE_URL + '/file/' + file.id;
                        cb(path, { title: file.filename });
                      }
                    };
                    reader.readAsDataURL(file);
                  };
                  input.click();
                },
                height: settings.tinymce.height,
                plugins: settings.tinymce.plugins,
                content_style: settings.tinymce.contentStyle,
                toolbar: settings.tinymce.toolbar
              }}
              onEditorChange={handleEditorChange}
            />
            {errorContent &&
            <div className="invalid-feedback d-block">{translate('error.about_us_content')}</div>
            }
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="partner_content">
          <Form.Label column sm="3">{translate('static_page_partner_content')}</Form.Label>
          <Col sm="9">
            <Editor
              apiKey={settings.tinymce.apiKey}
              name="partner_content"
              value={partnerContent}
              init={{
                image_title: true,
                automatic_uploads: true,
                file_picker_types: 'image',
                file_picker_callback: (cb, value, meta) => {
                  var input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*');
                  input.onchange = function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = async () => {
                      const base64 = reader.result;
                      const fileUpload = {
                        url: base64,
                        fileName: file.name,
                        fileSize: file.size,
                        fileType: file.type
                      };
                      const data = await File.upload(fileUpload);
                      if (data.success) {
                        const file = data.data;
                        const path = process.env.REACT_APP_API_BASE_URL + '/file/' + file.id;
                        cb(path, { title: file.filename });
                      }
                    };
                    reader.readAsDataURL(file);
                  };
                  input.click();
                },
                height: settings.tinymce.height,
                plugins: settings.tinymce.plugins,
                content_style: settings.tinymce.contentStyle,
                toolbar: settings.tinymce.toolbar
              }}
              onEditorChange={handlePartnerChange}
            />
          </Col>
        </Form.Group>
        <div className="sticky-bottom d-flex justify-content-end">
          <Button
            onClick={handleConfirm}
          >
            {translate('common.save')}
          </Button>
        </div>
      </Form>
    </div>
  );
};

AboutUs.propTypes = {
  type: PropTypes.string
};

export default AboutUs;
