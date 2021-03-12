import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as ROUTES from '../../../variables/routes';
import {
  createEducationMaterial,
  getEducationMaterial, updateEducationMaterial
} from '../../../store/educationMaterial/actions';
import { formatFileSize, toMB } from '../../../utils/file';
import settings from '../../../settings';
import CustomTree from 'components/Tree';
import { getCategories } from 'store/category/actions';
import { CATEGORY_TYPES } from 'variables/category';

const CreateEducationMaterial = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { maxFileSize } = settings.educationMaterial;

  const { languages } = useSelector(state => state.language);
  const { educationMaterial, filters } = useSelector(state => state.educationMaterial);
  const { categories } = useSelector((state) => state.category);

  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    title: '',
    file: undefined
  });
  const [materialFile, setMaterialFile] = useState(undefined);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryIndexes, setSelectedCategoryIndexes] = useState([]);
  const treeColumns = [
    { name: 'title', title: translate('common.category') }
  ];
  const tableColumnExtensions = [
    { columnName: 'title', width: 'auto', wordWrapEnabled: true }
  ];

  const [titleError, setTitleError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (languages.length) {
      if (id && filters && filters.lang) {
        setLanguage(filters.lang);
      } else {
        setLanguage(languages[0].id);
      }
    }
  }, [languages, filters, id]);

  useEffect(() => {
    if (language) {
      dispatch(getCategories({ type: CATEGORY_TYPES.MATERIAL, lang: language }));
    }
  }, [language, dispatch]);

  useEffect(() => {
    if (id && language) {
      dispatch(getEducationMaterial(id, language));
    }
  }, [id, language, dispatch]);

  useEffect(() => {
    if (categories.length) {
      const selectedCatIndexes = [];
      categories.forEach((cat, index) => {
        if (selectedCategories.indexOf(cat.id) >= 0) {
          selectedCatIndexes.push(index);
        }
      });

      setSelectedCategoryIndexes(selectedCatIndexes);
    }
  }, [categories, selectedCategories]);

  useEffect(() => {
    if (id && educationMaterial.id) {
      setFormFields({
        title: educationMaterial.title
      });
      setMaterialFile(educationMaterial.file);
      setSelectedCategories(educationMaterial.categories);
    }
  }, [id, educationMaterial]);

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
    setFormFields({ ...formFields, [name]: files[0] });
  };

  const handleSave = () => {
    let canSave = true;

    if (formFields.title === '') {
      canSave = false;
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (!id && (formFields.file === undefined || toMB(formFields.file.size) > maxFileSize)) {
      canSave = false;
      setFileError(true);
    } else {
      setFileError(false);
    }

    if (canSave) {
      setIsLoading(true);
      if (id) {
        dispatch(updateEducationMaterial(id, { ...formFields, categories: selectedCategories, lang: language }))
          .then(result => {
            if (result) {
              history.push(ROUTES.SERVICE_SETUP_EDUCATION);
            }
            setIsLoading(false);
          });
      } else {
        dispatch(createEducationMaterial({ ...formFields, categories: selectedCategories, lang: language }))
          .then(result => {
            if (result) {
              history.push(ROUTES.SERVICE_SETUP_EDUCATION);
            }
            setIsLoading(false);
          });
      }
    }
  };

  const renderUploadFileName = () => {
    const file = formFields.file;
    if (file) {
      return `${file.name} (${formatFileSize(file.size)})`;
    }
    return translate('education_material.upload_file.placeholder');
  };

  const onSelectChange = (rowIds) => {
    const selectedCats = categories.filter((cat, index) => rowIds.indexOf(index) >= 0).map(cat => cat.id);
    setSelectedCategories(selectedCats);
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
                    {language.name}
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
                maxLength={settings.textMaxLength}
                isInvalid={titleError}
              />
              <Form.Control.Feedback type="invalid">
                {translate('education_material.title.required')}
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
                  accept="audio/*, video/*, image/*, .pdf"
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

            <div className="mb-3">
              <CustomTree
                columns={treeColumns}
                treeColumnName="title"
                tableColumnExtensions={tableColumnExtensions}
                selection={selectedCategoryIndexes}
                onSelectChange={onSelectChange}
                data={categories.map(category => {
                  return {
                    id: category.id,
                    title: category.title,
                    parentId: category.parent || null
                  };
                })}
              />
            </div>

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
