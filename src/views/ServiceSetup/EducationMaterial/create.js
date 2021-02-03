import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as ROUTES from '../../../variables/routes';

const CreateEducationMaterial = ({ translate }) => {
  const { id } = useParams();

  const { languages } = useSelector(state => state.language);

  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    title: '',
    file: undefined
  });

  const [titleError, setTitleError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = e => {
    const { value } = e.target;
    setLanguage(value);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormFields({ ...formFields, [name]: files });
  };

  const handleSave = () => {
    let canSave = true;

    if (formFields.title === '') {
      canSave = false;
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (formFields.file === undefined) {
      canSave = false;
      setFileError(true);
    } else {
      setFileError(false);
    }

    if (canSave) {
      setIsLoading(true);
    }
  };

  const renderUploadFileName = () => {
    if (formFields.file) {
      const file = formFields.file[0];
      const fileSize = (file.size / 1024).toFixed(2);
      return `${file.name} (${fileSize}kB)`;
    }
    return translate('education_material.upload_file.placeholder');
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{id ? translate('education_material.edit') : translate('education_material.create')}</h1>
      </div>

      <Form>
        <Row>
          <Col sm={{ span: 6, offset: 4 }} xl={{ span: 4, offset: 3 }}>
            <Form.Group controlId="formLanguage">
              <Form.Label>{translate('common.show_language.version')}</Form.Label>
              <Form.Control as="select" value={id ? language : ''} onChange={handleLanguageChange} disabled={!id}>
                {languages.map((language, index) => (
                  <option key={index} value={language.id}>
                    {language.name} {language.code === language.fallback && `(${translate('common.default')})`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>{translate('education_material.title')}</Form.Label>
              <span className="text-dark ml-1">*</span>
              <Form.Control
                name="title"
                onChange={handleChange}
                value={formFields.title}
                placeholder={translate('education_material.title.placeholder')}
                isInvalid={titleError}
              />
              <Form.Control.Feedback type="invalid">
                {translate('education_material.title.required')}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formFile">
              <Form.Label>{translate('education_material.upload_file')}</Form.Label>
              <Form.File custom>
                <Form.File.Input
                  name='file'
                  onChange={handleFileChange}
                  isInvalid={fileError}
                />
                <Form.File.Label>{renderUploadFileName()}</Form.File.Label>
                <Form.Control.Feedback type="invalid">
                  {translate('education_material.upload_file.required')}
                </Form.Control.Feedback>
              </Form.File>
            </Form.Group>

            <Form.Group>
              <Button
                onClick={handleSave}
                disabled={isLoading}
              >
                {translate('common.save')}
              </Button>
              <Button
                className="ml-2"
                variant="outline-dark"
                as={Link}
                to={ROUTES.SERVICE_SETUP_EDUCATION}
                disabled={isLoading}
              >
                {translate('common.cancel')}
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

CreateEducationMaterial.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(CreateEducationMaterial);
