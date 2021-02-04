import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import {
  Row,
  Col,
  Card,
  Form,
  Button
} from 'react-bootstrap';

import * as ROUTES from 'variables/routes';
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch, BsX } from 'react-icons/bs/index';
import { useHistory } from 'react-router-dom';

import Dialog from 'components/Dialog';
import CustomTable from 'components/Table';
import { DeleteAction, EditAction } from 'components/ActionIcons';
import { getEducationMaterials, deleteEducationMaterial } from 'store/educationMaterial/actions';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (filters && filters.lang) {
      setLanguage(filters.lang);
    } else if (profile && profile.language_id) {
      setLanguage(profile.language_id);
    }
  }, [filters, profile]);

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(getEducationMaterials({
        lang: language,
        filter: formFields,
        page_size: pageSize,
        page: currentPage
      }));
    }, 500);
  }, [language, formFields, currentPage, pageSize, dispatch]);

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

  return (
    <>
      <Row>
        <Col sm={5} md={4} lg={3}>
          <Card bg="info">
            <Card.Header>
              <Form.Group className="search-box-with-icon">
                <BsSearch className="search-icon" />
                <Button
                  variant="light"
                  className="clear-btn"
                  onClick={handleClearSearch}
                >
                  <BsX size={18} />
                </Button>
                <Form.Control
                  name="search_value"
                  value={formFields.search_value}
                  onChange={handleChange}
                  placeholder={translate('exercise.search')}
                />
              </Form.Group>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>{translate('common.category')}</Form.Label>
                <Form.Control as="select" disabled>
                  <option>{translate('placeholder.category_item')}</option>
                  <option>{translate('placeholder.category_item')}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>{translate('common.category')}</Form.Label>
                <Form.Control as="select" disabled>
                  <option>{translate('placeholder.category_item')}</option>
                  <option>{translate('placeholder.category_item')}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>{translate('common.category')}</Form.Label>
                <Form.Control as="select" disabled>
                  <option>{translate('placeholder.category_item')}</option>
                  <option>{translate('placeholder.category_item')}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>{translate('common.language')}</Form.Label>
                <Form.Control as="select" value={language} onChange={handleLanguageChange}>
                  {languages.map((language, index) => (
                    <option key={index} value={language.id}>
                      {language.name} {language.code === language.fallback && `(${translate('common.default')})`}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
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
                  <EditAction onClick={() => handleEdit(educationMaterial.id)} />
                  <DeleteAction className="ml-1" onClick={() => handleDelete(educationMaterial.id)} disabled={educationMaterial.is_used} />
                </>
              );
              return {
                title: educationMaterial.title,
                type: educationMaterial.file.fileExtension,
                action
              };
            })}
          />
        </Col>
      </Row>
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
