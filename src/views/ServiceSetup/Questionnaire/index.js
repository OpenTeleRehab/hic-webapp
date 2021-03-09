import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Dialog from 'components/Dialog';
import * as ROUTES from 'variables/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomTable from 'components/Table';
import { EditAction, DeleteAction, ViewAction } from 'components/ActionIcons';
import SearchInput from 'components/Form/SearchInput';
import { getQuestionnaires, deleteQuestionnaire } from 'store/questionnaire/actions';
import ViewQuestionnaire from './viewQuestionnaire';

let timer = null;
const Questionnaire = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formFields, setFormFields] = useState({
    search_value: ''
  });
  const { languages } = useSelector(state => state.language);
  const [language, setLanguage] = useState('');
  const { questionnaires, filters } = useSelector(state => state.questionnaire);
  const { profile } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [viewQuestionnaire, setViewQuestionnaire] = useState(false);

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
      dispatch(getQuestionnaires({
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
    history.push(ROUTES.QUESTIONNAIRE_EDIT.replace(':id', id));
  };

  const columns = [
    { name: 'title', title: translate('questionnaire.title') + '/' + translate('questionnaire.description') },
    { name: 'number_of_question', title: translate('questionnaire.number_of_question') },
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
    dispatch(deleteQuestionnaire(id)).then(result => {
      if (result) {
        handleClose();
      }
    });
  };

  const handleView = (questionnaire) => {
    setQuestionnaire(questionnaire);
    setViewQuestionnaire(true);
  };

  const handleQuestionnaireViewClose = () => {
    setViewQuestionnaire(false);
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
            rows={questionnaires.map(questionnaire => {
              const action = (
                <>
                  <ViewAction onClick={() => handleView(questionnaire)} />
                  <EditAction className="ml-1" onClick={() => handleEdit(questionnaire.id)} />
                  <DeleteAction className="ml-1" onClick={() => handleDelete(questionnaire.id)} disabled={questionnaire.is_used} />
                </>
              );
              return {
                title: <span
                  className="questionnaire-title"
                  dangerouslySetInnerHTML={{
                    __html: `<strong>${questionnaire.title}</strong><div class="description">${questionnaire.description}</div>`
                  }}
                />,
                number_of_question: questionnaire.questions.length,
                action
              };
            })}
          />
        </Col>
      </Row>
      <Dialog
        show={show}
        title={translate('questionnaire.delete_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handleClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handleConfirm}
      >
        <p>{translate('common.delete_confirmation_message')}</p>
      </Dialog>
      {viewQuestionnaire && <ViewQuestionnaire questionnaire={questionnaire} show={viewQuestionnaire} handleClose={handleQuestionnaireViewClose}/>}
    </>
  );
};

Questionnaire.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Questionnaire);
