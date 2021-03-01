import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import settings from 'settings';
import { createStaticPage } from 'store/staticPage/actions';
import { formatFileSize, toMB } from '../../../utils/file';

const CreateStaticPage = ({ show, editId, handleClose }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();
  const { maxFileSize } = settings.educationMaterial;

  const [errorContent, setErrorContent] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorPlatform, setErrorPlatform] = useState(false);
  const [errorUrl, setErrorUrl] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [materialFile] = useState(undefined);
  const { languages } = useSelector(state => state.language);

  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    platform: '',
    url: '',
    private: false,
    title: '',
    content: '',
    file: undefined
  });

  useEffect(() => {
    if (languages.length) {
      setLanguage(languages[0].id);
    }
  }, [languages]);

  const handleLanguageChange = e => {
    const { value } = e.target;
    setLanguage(value);
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
  };

  const handleConfirm = () => {
    let canSave = true;

    if (formFields.title === '') {
      canSave = false;
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    if (formFields.platform === '') {
      canSave = false;
      setErrorPlatform(true);
    } else {
      setErrorPlatform(false);
    }

    if (formFields.url === '') {
      canSave = false;
      setErrorUrl(true);
    } else {
      setErrorUrl(false);
    }

    if (formFields.content === '') {
      canSave = false;
      setErrorContent(true);
    } else {
      setErrorContent(false);
    }

    if (!editId && (formFields.file === undefined || toMB(formFields.file.size) > maxFileSize)) {
      canSave = false;
      setFileError(true);
    } else {
      setFileError(false);
    }

    if (canSave) {
      dispatch(createStaticPage({ ...formFields, lang: language }))
        .then(result => {
          if (result) {
            handleClose();
          }
        });
    }
  };

  const renderUploadFileName = () => {
    const file = formFields.file;
    if (file) {
      return `${file.name} (${formatFileSize(file.size)})`;
    }
    return translate('education_material.upload_file.placeholder');
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
        <Form.Group controlId="formPrivate">
          <Form.Check
            name="private"
            onChange={handleCheck}
            value={true}
            checked={formFields.private}
            label={translate('static_page.private')}
          />
        </Form.Group>
        <Form.Group controlId="formPlateForm">
          <Form.Label>{translate('setting.translations.platform')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            name="platform"
            as="select"
            value={formFields.plateform}
            onChange={handleChange}
            isInvalid={errorPlatform}
          >
            <option value="">{translate('placeholder.platform')}</option>
            {settings.platforms.options.map((platform, index) => (
              <option key={index} value={platform.value}>{platform.text}</option>
            ))}
            <Form.Control.Feedback type="invalid">
              {translate('error.platform')}
            </Form.Control.Feedback>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>{translate('static_page.url')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            name="url"
            onChange={handleChange}
            type="text"
            placeholder={translate('placeholder.static_page.url')}
            value={formFields.url}
            maxLength={settings.textMaxLength}
            isInvalid={errorUrl}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.static_page.url')}
          </Form.Control.Feedback>
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
        <Form.Group controlId="formFile">
          <Form.Label>{translate('education_material.upload_file')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.File custom>
            <Form.File.Input
              name='file'
              onChange={handleFileChange}
              isInvalid={fileError}
            />
            <Form.File.Label>{renderUploadFileName()}</Form.File.Label>
            <Form.Control.Feedback type="invalid">
              {formFields.file === undefined
                ? translate('education_material.upload_file.required')
                : translate('education_material.upload_file.max_size', { size: maxFileSize })
              }
            </Form.Control.Feedback>

            {materialFile && (
              <Form.Text className="text-muted">
                {translate(materialFile.fileGroupType)}:
                <a
                  href={`${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`}
                  /* eslint-disable-next-line react/jsx-no-target-blank */
                  target="_blank"
                  className="pl-2"
                >
                  {materialFile.fileName}
                </a>
              </Form.Text>
            )}
          </Form.File>
        </Form.Group>
      </Form>
    </Dialog>
  );
};

CreateStaticPage.propTypes = {
  show: PropTypes.bool,
  editId: PropTypes.number,
  handleClose: PropTypes.func
};

export default CreateStaticPage;
