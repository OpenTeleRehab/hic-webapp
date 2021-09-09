import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row, Accordion, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as ROUTES from '../../../variables/routes';
import {
  createEducationMaterial,
  getEducationMaterial,
  approveEducationMaterial,
  rejectEducationMaterial,
  deleteEducationMaterial,
  clearEditTranslation,
  getEditTranslation,
  rejectEditTranslation,
  approveEditTranslation
} from '../../../store/educationMaterial/actions';
import { formatFileSize, toMB } from '../../../utils/file';
import settings from '../../../settings';
import { getCategoryTreeData } from 'store/category/actions';
import { CATEGORY_TYPES } from 'variables/category';
import {
  BsCaretDownFill,
  BsCaretRightFill,
  BsSquare,
  BsDashSquare
} from 'react-icons/bs';
import { FaRegCheckSquare } from 'react-icons/fa';
import CheckboxTree from 'react-checkbox-tree';
import _ from 'lodash';
import { ContextAwareToggle } from 'components/Accordion/ContextAwareToggle';
import { STATUS } from '../../../variables/resourceStatus';
import Dialog from '../../../components/Dialog';
import FallbackText from '../../../components/Form/FallbackText';
import SelectLanguage from '../_Partials/SelectLanguage';

const CreateEducationMaterial = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { maxFileSize } = settings.educationMaterial;
  const { educationMaterial, editTranslation } = useSelector(state => state.educationMaterial);
  const { categoryTreeData } = useSelector((state) => state.category);
  const { profile } = useSelector((state) => state.auth);
  const [language, setLanguage] = useState({});
  const [formFields, setFormFields] = useState({
    title: '',
    file: undefined
  });
  const [materialFile, setMaterialFile] = useState(undefined);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const [titleError, setTitleError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [fileMaxSizeError, setFileMaxSizeError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [errorClass, setErrorClass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [isEditingTranslation, setIsEditingTranslation] = useState(false);
  const [editTranslations, setEditTranslations] = useState([]);
  const [editTranslationIndex, setEditTranslationIndex] = useState(1);
  const [showFallbackText, setShowFallbackText] = useState(false);

  useEffect(() => {
    dispatch(getCategoryTreeData({ type: CATEGORY_TYPES.MATERIAL, lang: language.id }));
  }, [language, dispatch]);

  useEffect(() => {
    if (categoryTreeData.length) {
      const rootCategoryStructure = {};
      categoryTreeData.forEach(category => {
        rootCategoryStructure[category.value] = [];
      });
      setSelectedCategories(rootCategoryStructure);
    }
  }, [categoryTreeData]);

  useEffect(() => {
    if (id && language) {
      dispatch(getEducationMaterial(id, language.id));
    }
  }, [id, language, dispatch]);

  useEffect(() => {
    if (!_.isEmpty(editTranslations)) {
      dispatch(getEditTranslation(editTranslations[editTranslationIndex - 1].id, language.id));
    } else {
      dispatch(clearEditTranslation());
    }
    // eslint-disable-next-line
  }, [editTranslations, editTranslationIndex]);

  useEffect(() => {
    if (id && educationMaterial.id && educationMaterial.status === STATUS.approved) {
      setIsEditingItem(false);
      setIsEditingTranslation(true);
    }
    if (id && educationMaterial.id && (educationMaterial.status === STATUS.pending || educationMaterial.status === STATUS.rejected)) {
      setIsEditingItem(true);
      setIsEditingTranslation(false);
    }
  }, [id, educationMaterial]);

  useEffect(() => {
    if (isEditingTranslation && educationMaterial) {
      if (_.isEmpty(editTranslation)) {
        setFormFields({
          title: educationMaterial.title,
          fallback: educationMaterial.fallback
        });
        setMaterialFile(educationMaterial.file);
        setShowFallbackText(false);
      } else {
        setFormFields({
          title: editTranslation.title,
          file: editTranslation.file,
          fallback: educationMaterial.fallback
        });
        setMaterialFile(editTranslation.file);
        setShowFallbackText(true);
      }
      if (categoryTreeData.length) {
        const rootCategoryStructure = {};
        categoryTreeData.forEach(category => {
          const ids = [];
          JSON.stringify(category, (key, value) => {
            if (key === 'value') ids.push(value);
            return value;
          });
          rootCategoryStructure[category.value] = _.intersectionWith(educationMaterial.categories, ids);
        });
        setSelectedCategories(rootCategoryStructure);
      }
    }
  }, [isEditingTranslation, editTranslation, categoryTreeData, educationMaterial]);

  useEffect(() => {
    if (isEditingItem) {
      setFormFields({
        title: educationMaterial.title
      });
      setMaterialFile(educationMaterial.file);
      if (categoryTreeData.length) {
        const rootCategoryStructure = {};
        categoryTreeData.forEach(category => {
          const ids = [];
          JSON.stringify(category, (key, value) => {
            if (key === 'value') ids.push(value);
            return value;
          });
          rootCategoryStructure[category.value] = _.intersectionWith(educationMaterial.categories, ids);
        });
        setSelectedCategories(rootCategoryStructure);
      }
    }
  }, [isEditingItem, educationMaterial, categoryTreeData]);

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

    if (!materialFile && (formFields.file === undefined)) {
      canSave = false;
      setFileError(true);
    } else {
      setFileError(false);
      if (formFields.file && toMB(formFields.file.size) > maxFileSize) {
        canSave = false;
        setFileMaxSizeError(true);
      } else {
        setFileMaxSizeError(false);
      }
    }

    let serializedSelectedCats = [];
    Object.keys(selectedCategories).forEach(function (key) {
      serializedSelectedCats = _.union(serializedSelectedCats, selectedCategories[key]);
    });

    if (serializedSelectedCats.length === 0) {
      canSave = false;
      setErrorClass('error-feedback');
      setCategoryError(true);
    } else {
      setErrorClass('');
      setCategoryError(false);
    }

    if (canSave) {
      setIsLoading(true);
      if (id) {
        if (!_.isEmpty(editTranslation)) {
          dispatch(approveEditTranslation(id, { ...formFields, categories: serializedSelectedCats, lang: language.id })).then(result => {
            if (result) {
              setIsLoading(false);
            }
          });
        } else {
          dispatch(approveEducationMaterial(id, { ...formFields, categories: serializedSelectedCats, lang: language.id }))
            .then(result => {
              if (result) {
                history.push(ROUTES.SERVICE_SETUP_EDUCATION);
              }
              setIsLoading(false);
            });
        }
      } else {
        const contributor = {
          email: profile.email,
          last_name: profile.last_name,
          first_name: profile.first_name,
          included_in_acknowledgment: true
        };
        dispatch(createEducationMaterial({ ...formFields, ...contributor, categories: serializedSelectedCats, lang: language.id }))
          .then(result => {
            if (result) {
              history.push(ROUTES.SERVICE_SETUP_EDUCATION);
            }
            setIsLoading(false);
          });
      }
    }
  };

  const handleReject = () => {
    if (isEditingTranslation && !_.isEmpty(editTranslation)) {
      setIsLoading(true);
      dispatch(rejectEditTranslation(editTranslation.id)).then(result => {
        if (result) {
          dispatch(getEducationMaterial(id, language.id));
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(true);
      dispatch(rejectEducationMaterial(id)).then(result => {
        if (result) {
          if (result) {
            dispatch(getEducationMaterial(id, language.id));
          }
        }
        setIsLoading(false);
      });
    }
  };

  const handleDeleteDialogConfirm = () => {
    dispatch(deleteEducationMaterial(educationMaterial.id)).then(result => {
      if (result) {
        history.push(ROUTES.ADMIN_RESOURCES_EDUCATION_MATERIAL);
      }
    });
  };

  const renderUploadFileName = () => {
    const file = formFields.file;
    if (file) {
      if (isEditingTranslation && !_.isEmpty(editTranslations)) {
        return `${file.fileName} (${formatFileSize(file.size)})`;
      } else {
        return `${file.name} (${formatFileSize(file.size)})`;
      }
    }
    return translate('education_material.upload_file.placeholder');
  };

  const handleSetSelectedCategories = (parent, checked) => {
    setSelectedCategories({ ...selectedCategories, [parent]: checked.map(item => parseInt(item)) });
  };

  const handleFormSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1 className="text-primary">{id ? translate('education_material.edit') : translate('education_material.create')}</h1>
      </div>

      <Form onKeyPress={(e) => handleFormSubmit(e)}>
        <Row className="no-gutters bg-white">
          <Col sm={12} xl={11} className="p-4">
            <Form.Group controlId="formLanguage">
              <Form.Label>{translate('common.language')}</Form.Label>
              <SelectLanguage
                translate={translate}
                resource={educationMaterial}
                setLanguage={setLanguage}
                setEditTranslationIndex={setEditTranslationIndex}
                setEditTranslations={setEditTranslations}
                isDisabled={!isEditingTranslation}
              />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>{translate('education_material.title')}</Form.Label>
              <span className="text-dark ml-1">*</span>
              {showFallbackText && educationMaterial.fallback &&
                <FallbackText translate={translate} text={educationMaterial.fallback.title} />
              }
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
                  isInvalid={fileError || fileMaxSizeError}
                  accept="audio/*, video/*, image/*, .pdf"
                  disabled={isEditingTranslation && !_.isEmpty(editTranslations)}
                />
                <Form.File.Label>{renderUploadFileName()}</Form.File.Label>
                <Form.Control.Feedback type="invalid">
                  {fileError && translate('education_material.upload_file.required')}
                  {fileMaxSizeError && translate('education_material.upload_file.max_size', { size: maxFileSize })}
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

            {!isEditingTranslation &&
              <Accordion className="material-category-wrapper" defaultActiveKey={1}>
                {
                  categoryTreeData.map((category, index) => (
                    <Card key={index}>
                      <Accordion.Toggle as={Card.Header} eventKey={index + 1} className="d-flex align-items-center">
                        {category.label}
                        <div className="ml-auto">
                          <span className="mr-3">
                            {selectedCategories[category.value] ? selectedCategories[category.value].length : 0} {translate('category.selected')}
                          </span>
                          <ContextAwareToggle eventKey={index + 1} />
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={index + 1}>
                        <Card.Body>
                          <CheckboxTree
                            nodes={category.children || []}
                            checked={selectedCategories[category.value] ? selectedCategories[category.value] : []}
                            expanded={expanded}
                            onCheck={(checked) => handleSetSelectedCategories(category.value, checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                              check: <FaRegCheckSquare size={40} color="black" />,
                              uncheck: <BsSquare size={40} color="black" />,
                              halfCheck: <BsDashSquare size={40} color="black" />,
                              expandClose: <BsCaretRightFill size={40} color="black" />,
                              expandOpen: <BsCaretDownFill size={40} color="black" />
                            }}
                            showNodeIcon={false}
                          />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  ))
                }
                <span className={errorClass}>
                  {categoryError && translate('resources.category.required')}
                </span>
              </Accordion>
            }
          </Col>
        </Row>
        <div className="sticky-bottom d-flex justify-content-end">
          { !id && (
            <Button onClick={handleSave} disabled={isLoading}>
              {translate('common.save')}
            </Button>
          )}

          { id && (
            <>
              {educationMaterial.status === STATUS.approved && _.isEmpty(editTranslations)
                ? <Button onClick={handleSave} disabled={isLoading}>{translate('common.save')}</Button>
                : <Button onClick={handleSave} disabled={isLoading}>{translate('common.approve')}</Button>
              }

              {educationMaterial.status === STATUS.rejected &&
                <Button
                  onClick={() => setShowDeleteDialog(true)}
                  className="ml-2"
                  variant="outline-danger"
                  disabled={isLoading}
                >
                  {translate('common.delete')}
                </Button>
              }

              {(educationMaterial.status === STATUS.pending || educationMaterial.status === STATUS.approved) &&
                <Button
                  onClick={handleReject}
                  className="ml-2"
                  variant="outline-primary"
                  disabled={isLoading}
                >
                  {translate('common.reject')}
                </Button>
              }
            </>
          )}

          <Button
            className="ml-2"
            variant="outline-dark"
            as={Link}
            to={ROUTES.SERVICE_SETUP_EDUCATION}
            disabled={isLoading}
          >
            {translate('common.cancel')}
          </Button>
        </div>
      </Form>

      <Dialog
        show={showDeleteDialog}
        title={translate('education_material.delete_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={() => setShowDeleteDialog(false)}
        confirmLabel={translate('common.yes')}
        onConfirm={handleDeleteDialogConfirm}
      >
        <p>{translate('common.delete_confirmation_message')}</p>
      </Dialog>
    </>
  );
};

CreateEducationMaterial.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(CreateEducationMaterial);
