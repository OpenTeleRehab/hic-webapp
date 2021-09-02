import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import settings from 'settings';
import {
  createStaticPage,
  updateStaticPage,
  getStaticPage,
  getFeaturedResources
} from 'store/staticPage/actions';
import { toMB } from '../../../utils/file';
import { BsUpload, BsXCircle } from 'react-icons/bs/index';
import { Editor } from '@tinymce/tinymce-react';

import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
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
  const [featureResources, setFeatureResources] = useState('');
  const [errorFeaturedResource, setErrorFeaturedResource] = useState(false);

  const { staticPage, resources } = useSelector(state => state.staticPage);
  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    url: type,
    title: '',
    file: undefined,
    display_quick_stat: '',
    display_feature_resource: '',
    resources: ''
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

  useEffect(() => {
    dispatch(getStaticPage({
      'url-segment': type,
      lang: language
    }));
  }, [dispatch, language, type]);

  useEffect(() => {
    dispatch(getFeaturedResources());
  }, [dispatch]);

  useEffect(() => {
    if (staticPage && staticPage.url === type) {
      setFormFields({
        title: staticPage.title || '',
        url: staticPage.url || type,
        content: staticPage.content,
        display_quick_stat: staticPage.homeData ? staticPage.homeData.display_quick_stat : 0,
        display_feature_resource: staticPage.homeData ? staticPage.homeData.display_feature_resource : 0,
        resources: staticPage.homeData ? JSON.parse(staticPage.homeData.resources.resources) : ''
      });
      setMaterialFile(staticPage.file);
      setContent(staticPage.content || '');
      setPartnerContent(staticPage.partner_content || '');
    }
  }, [staticPage, type]);

  const enableButtons = () => {
    const languageObj = languages.find(item => item.id === parseInt(language, 10));
    return languageObj && languageObj.code === languageObj.fallback;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleCheck = e => {
    const { name, checked } = e.target;
    setFormFields({ ...formFields, [name]: checked });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormFields({ ...formFields, [name]: files[0] });

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
  };

  const handleEditorChange = (value, editor) => {
    setContent(value);
  };

  const handlePartnerChange = (value, editor) => {
    setPartnerContent(value);
  };

  let selectedArray = [];
  if (formFields.resources) {
    if (formFields.resources.exercises) {
      selectedArray = formFields.resources.exercises;
    }
    if (formFields.resources.education_materials) {
      selectedArray = selectedArray.concat(formFields.resources.education_materials);
    }
    if (formFields.resources.questionnaires) {
      selectedArray = selectedArray.concat(formFields.resources.questionnaires);
    }
  }

  useEffect(() => {
    if (selectedArray.length && !featureResources) {
      setFeatureResources(JSON.stringify([...selectedArray]));
    }
  }, [selectedArray, featureResources]);

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

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  let options = [];
  if (resources.education_materials) {
    options = resources.education_materials;
  }
  if (resources.exercises) {
    options = options.concat(resources.exercises);
  }
  if (resources.questionnaires) {
    options = options.concat(resources.questionnaires);
  }

  const handleMultipleSelectChange = (selectedList, selectedItem) => {
    setFeatureResources(JSON.stringify([...selectedList]));
    if (selectedList.length > 0) {
      setErrorFeaturedResource(false);
    } else {
      setErrorFeaturedResource(true);
    }
  };

  const handleMultipleRemove = (selectedList, selectedItem) => {
    setFeatureResources(JSON.stringify([...selectedList]));
    if (selectedList.length > 0) {
      setErrorFeaturedResource(false);
    } else {
      setErrorFeaturedResource(true);
    }
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

    if (formFields.display_feature_resource && (featureResources === '' || errorFeaturedResource)) {
      setErrorFeaturedResource(true);
      canSave = false;
    } else {
      setErrorFeaturedResource(false);
      canSave = true;
    }

    if (formFields.file !== undefined && toMB(formFields.file.size) > maxFileSize) {
      canSave = false;
      setFileError(true);
    } else {
      setFileError(false);
    }

    if (canSave) {
      if (staticPage.id) {
        dispatch(updateStaticPage(staticPage.id, { ...formFields, content, partnerContent, featureResources, lang: language }))
          .then(result => {
            if (result) {
              dispatch(getStaticPage({
                'url-segment': type,
                lang: profile && profile.language_id
              }));
            }
          });
      } else {
        dispatch(createStaticPage({ ...formFields, content, partnerContent, featureResources, lang: language })).then(result => {
          if (result) {
            dispatch(getStaticPage({
              'url-segment': type,
              lang: profile && profile.language_id
            }));
          }
        });
      }
    }
  };
  return (
    <div className="no-gutters bg-white p-md-3 static-home">
      <Form onKeyPress={(e) => handleFormSubmit(e)}>
        <Form.Group as={Row} controlId="formLanguage">
          <Form.Label column sm="3">{translate('common.show_language.version')}</Form.Label>
          <Col sm="9">
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
          <Form.Label column sm="3">{translate('static_page.image')}</Form.Label>
          <Col sm="9">
            <Form.Control.Feedback type="invalid">
              {formFields.file !== undefined
                ? translate('education_material.upload_file.max_size', { size: maxFileSize }) : ''
              }
            </Form.Control.Feedback>

            <div className="w-50">
              {materialFile && (
                <div className="mb-2 position-relative">
                  {enableButtons() && (
                    <Button variant="link" onClick={() => handleFileRemove()} className="position-absolute btn-remove">
                      <BsXCircle size={20} color={scssColors.danger} />
                    </Button>
                  )}
                  <img src={materialFile.url || `${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`} alt="..." className="w-100 img-thumbnail"/>
                  <div>{materialFile.fileName} {materialFile.fileSize ? ('(' + materialFile.fileSize + 'kB )') : ''}</div>
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
          <Form.Label column sm="3">
            {translate('static_page.title')}
            <span className="text-dark ml-1">*</span>
          </Form.Label>
          <Col sm="9">
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
          <Form.Label column sm="3">
            {translate('home_introduction_text')}
            <span className="text-dark ml-1">*</span>
          </Form.Label>
          <Col sm="9">
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
          </Col>
        </Form.Group>
        <Form.Group as={Row} acontrolId="formQuickStat">
          <Form.Label column sm="3">{translate('home_display_quick_stat')}</Form.Label>
          <Col sm="9">
            <Form.Check
              custom
              name="display_quick_stat"
              onChange={handleCheck}
              value={true}
              checked={formFields.display_quick_stat}
              disabled={!enableButtons()}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="isFeatureResource">
          <Form.Label column sm="3">{translate('home_display_feature_resource')}</Form.Label>
          <Col sm="9">
            <Form.Check
              custom
              name="display_feature_resource"
              onChange={handleCheck}
              value={true}
              checked={formFields.display_feature_resource}
              disabled={!enableButtons()}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formFeatureResource">
          <Form.Label column sm="3">{translate('home_feature_resource')}</Form.Label>
          <Col sm="9">
            <Multiselect
              displayValue="key"
              groupBy="type"
              selectedValues={selectedArray}
              onSelect={handleMultipleSelectChange}
              onRemove={handleMultipleRemove}
              options={options}
              showCheckbox
              selectionLimit={settings.featuredResourcesLimit}
              disable={!enableButtons()}
            />
            {errorFeaturedResource &&
            <div className="invalid-feedback d-block">{translate('error.home_featured_resources')}</div>
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

CreateHomePage.propTypes = {
  type: PropTypes.string,
  editId: PropTypes.number
};

export default CreateHomePage;
