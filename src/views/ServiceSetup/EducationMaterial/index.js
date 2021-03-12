import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Row, Col, Card, Form } from 'react-bootstrap';

import * as ROUTES from 'variables/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Dialog from 'components/Dialog';
import CustomTable from 'components/Table';
import { DeleteAction, EditAction, ViewAction } from 'components/ActionIcons';
import SearchInput from 'components/Form/SearchInput';
import { getEducationMaterials, deleteEducationMaterial } from 'store/educationMaterial/actions';
import ViewEducationMaterial from './view';
import { getCategories } from 'store/category/actions';
import CustomTree from 'components/Tree';
import { CATEGORY_TYPES } from 'variables/category';

let timer = null;
const EducationMaterial = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formFields, setFormFields] = useState({
    search_value: ''
  });
  const { languages } = useSelector(state => state.language);
  const [language, setLanguage] = useState('');
  const { educationMaterials, filters } = useSelector(state => state.educationMaterial);
  const { profile } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.category);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryIndexes, setSelectedCategoryIndexes] = useState([]);
  const treeColumns = [
    { name: 'title', title: translate('common.category') }
  ];
  const tableColumnExtensions = [
    { columnName: 'title', width: 'auto', wordWrapEnabled: true }
  ];

  useEffect(() => {
    if (filters && filters.lang) {
      setLanguage(filters.lang);
    } else if (profile && profile.language_id) {
      setLanguage(profile.language_id);
    }
  }, [filters, profile]);

  useEffect(() => {
    if (language) {
      dispatch(getCategories({ type: CATEGORY_TYPES.MATERIAL, lang: language }));
    }
  }, [language, dispatch]);

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
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(getEducationMaterials({
        lang: language,
        filter: formFields,
        categories: selectedCategories,
        page_size: pageSize,
        page: currentPage
      }));
    }, 500);
  }, [language, formFields, selectedCategories, currentPage, pageSize, dispatch]);

  const handleClearSearch = () => {
    setFormFields({ ...formFields, search_value: '' });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleLanguageChange = e => {
    const { value } = e.target;
    setLanguage(value);
  };

  const handleEdit = (id) => {
    history.push(ROUTES.EDUCATION_MATERIAL_EDIT.replace(':id', id));
  };

  const columns = [
    { name: 'title', title: translate('education_material.title') },
    { name: 'type', title: translate('education_material.type') },
    { name: 'action', title: translate('common.action') }
  ];

  const handleDelete = (id) => {
    setId(id);
    setShow(true);
  };

  const handleClose = () => {
    setId(null);
    setShow(false);
  };

  const handleConfirm = () => {
    dispatch(deleteEducationMaterial(id)).then(result => {
      if (result) {
        handleClose();
      }
    });
  };

  const handleView = (id) => {
    setId(id);
    setShowView(true);
  };

  const handleViewClose = () => {
    setId('');
    setShowView(false);
  };

  const onSelectChange = (rowIds) => {
    const selectedCats = categories.filter((cat, index) => rowIds.indexOf(index) >= 0).map(cat => cat.id);
    setSelectedCategories(selectedCats);
  };

  return (
    <>
      <Row>
        <Col sm={5} md={4} lg={3}>
          <Card bg="info">
            <Card.Header>
              <SearchInput
                name="search_value"
                value={formFields.search_value}
                placeholder={translate('education_material.search')}
                onChange={handleChange}
                onClear={handleClearSearch}
              />
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>{translate('common.language')}</Form.Label>
                <Form.Control as="select" value={language} onChange={handleLanguageChange}>
                  {languages.map((language, index) => (
                    <option key={index} value={language.id}>
                      {language.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
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
            </Card.Body>
          </Card>
        </Col>
        <Col sm={7} md={8} lg={9}>
          <CustomTable
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            columns={columns}
            hideSearchFilter={true}
            rows={educationMaterials.map(educationMaterial => {
              const action = (
                <>
                  <ViewAction className="mr-1" onClick={() => handleView(educationMaterial.id)} />
                  <EditAction onClick={() => handleEdit(educationMaterial.id)} className="mr-1" />
                  <DeleteAction onClick={() => handleDelete(educationMaterial.id)} disabled={educationMaterial.is_used} />
                </>
              );
              return {
                title: educationMaterial.title,
                type: translate(educationMaterial.file.fileGroupType),
                action
              };
            })}
          />
        </Col>
      </Row>
      {showView && <ViewEducationMaterial showView={showView} handleViewClose={handleViewClose} id={id} />}
      <Dialog
        show={show}
        title={translate('education.delete_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handleClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handleConfirm}
      >
        <p>{translate('common.delete_confirmation_message')}</p>
      </Dialog>
    </>
  );
};

EducationMaterial.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(EducationMaterial);
