import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row, Accordion, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { formatFileSize, toMB } from 'utils/file';
import settings from 'settings';
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
import { useHistory } from 'react-router-dom';
import {
  addMoreEducationMaterial, clearContribute, updateEducationMaterial
} from '../../../../store/contribute/actions';
import Dialog from '../../../../components/Dialog';
import * as ROUTES from '../../../../variables/routes';
import { replaceRoute } from '../../../../utils/route';

const CreateEducationMaterial = ({ translate, hash, editItem, setEditItem, showReviewModal, lang }) => {
  const dispatch = useDispatch();
  const { maxFileSize } = settings.educationMaterial;
  const { educationMaterials } = useSelector(state => state.contribute);
  const { activeLanguage } = useSelector(state => state.language);
  const [getEducationMaterials, setGetEducationMaterials] = useState([]);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [formFields, setFormFields] = useState({
    id: '',
    title: '',
    file: undefined,
    categories: ''
  });
  const [materialFile, setMaterialFile] = useState(undefined);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const history = useHistory();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editItem && hash.includes('#education')) {
      setFormFields({
        id: editItem.id,
        title: editItem.title,
        file: editItem.file
      });
      if (categoryTreeData.length) {
        const rootCategoryStructure = {};
        categoryTreeData.forEach(category => {
          const ids = [];
          JSON.stringify(category, (key, value) => {
            if (key === 'value') ids.push(value);
            return value;
          });
          rootCategoryStructure[category.value] = _.intersectionWith(editItem.categories.split(',').map(x => +x), ids);
        });
        setSelectedCategories(rootCategoryStructure);
      }
    }
  }, [editItem, categoryTreeData, hash]);

  useEffect(() => {
    dispatch(getCategoryTreeData({ type: CATEGORY_TYPES.MATERIAL, lang: lang }));
  }, [dispatch, lang]);

  useEffect(() => {
    setGetEducationMaterials(educationMaterials);
  }, [educationMaterials]);

  useEffect(() => {
    if (categoryTreeData.length) {
      const rootCategoryStructure = {};
      categoryTreeData.forEach(category => {
        rootCategoryStructure[category.value] = [];
      });
      setSelectedCategories(rootCategoryStructure);
    }
  }, [categoryTreeData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const fileName = files[0].name;
    const fileSize = files[0].size;
    const fileType = files[0].type;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      const file = { url: reader.result, fileName, fileSize, fileType };
      setFormFields({ ...formFields, [name]: file });
    };
  };

  const renderUploadFileName = () => {
    const file = formFields.file;
    if (file) {
      return `${file.fileName} (${formatFileSize(file.fileSize)})`;
    }
    return translate('education_material.upload_file.placeholder');
  };

  const handleSetSelectedCategories = (parent, checked) => {
    setSelectedCategories({ ...selectedCategories, [parent]: checked.map(item => parseInt(item)) });
  };

  const handleSubmit = () => {
    if (getEducationMaterials.length === 0 || formFields.title !== '' || formFields.file !== undefined) {
      if (handleValidation()) {
        submitHandler();
        showReviewModal(true);
      }
    } else {
      showReviewModal(true);
    }
  };

  const handleAddMore = () => {
    handleValidation() && submitHandler();
  };

  const submitHandler = () => {
    setIsLoading(true);

    let serializedSelectedCats = [];

    Object.keys(selectedCategories).forEach(function (key) {
      serializedSelectedCats = _.union(serializedSelectedCats, selectedCategories[key]);
    });

    const payload = {
      ...formFields,
      id: editItem ? formFields.id : getEducationMaterials.length,
      title: formFields.title,
      categories: serializedSelectedCats.join(),
      file: formFields.file
    };

    if (editItem) {
      dispatch(updateEducationMaterial(payload)).then(() => {
        setEditItem(undefined);
        setIsLoading(false);
        handleResetForm();
      });
    } else {
      dispatch(addMoreEducationMaterial(payload)).then(() => {
        setIsLoading(false);
        handleResetForm();
      });
    }
  };

  const handleResetForm = () => {
    setMaterialFile('');
    setSelectedCategories([]);
    setFormFields({
      id: '',
      title: '',
      file: undefined,
      categories: ''
    });
  };

  const handleValidation = () => {
    let canSave = true;

    if (formFields.title === '') {
      canSave = false;
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (!materialFile && (formFields.file === undefined || toMB(formFields.file.size) > maxFileSize)) {
      canSave = false;
      setFileError(true);
    } else {
      setFileError(false);
    }

    let serializedSelectedCats = [];
    Object.keys(selectedCategories).forEach(function (key) {
      serializedSelectedCats = _.union(serializedSelectedCats, selectedCategories[key]);
    });

    return canSave;
  };

  const handleConfirmCancelModal = () => {
    dispatch(clearContribute());
    history.push(replaceRoute(ROUTES.LIBRARY, activeLanguage));
  };

  return (
    <>
      <Form className="pt-5">
        <Row>
          <Col sm={12} xl={11}>
            <h5 className="text-primary">{translate('common.information')}</h5>

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
            </Accordion>
          </Col>
        </Row>

        <div className="sticky-bottom d-flex justify-content-end">
          <Button onClick={handleSubmit}>
            {translate('common.submit')}
          </Button>
          <Button
            className="ml-2"
            variant="outline-primary"
            onClick={handleAddMore}
            disabled={isLoading}
          >
            {translate('common.add_more')}
          </Button>
          <Button
            className="ml-2"
            variant="outline-primary"
            onClick={() => setShowCancelModal(true)}
            disabled={isLoading}
          >
            {translate('common.cancel')}
          </Button>
        </div>
      </Form>

      <Dialog
        show={showCancelModal}
        title={translate('common.cancel_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={() => setShowCancelModal(false)}
        confirmLabel={translate('common.yes')}
        onConfirm={handleConfirmCancelModal}
      >
        <p>{translate('common.cancel_confirmation_message')}</p>
      </Dialog>
    </>
  );
};

CreateEducationMaterial.propTypes = {
  translate: PropTypes.func,
  hash: PropTypes.string,
  editItem: PropTypes.object,
  setEditItem: PropTypes.func,
  showReviewModal: PropTypes.func,
  lang: PropTypes.number
};

export default withLocalize(CreateEducationMaterial);
