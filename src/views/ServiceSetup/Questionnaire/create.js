import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import {
  Button,
  Col,
  Form,
  Row,
  Accordion,
  Card,
  Alert
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as ROUTES from '../../../variables/routes';
import {
  createQuestionnaire,
  getQuestionnaire,
  updateQuestionnaire,
  rejectQuestionnaire,
  deleteQuestionnaire,
  getEditTranslation,
  clearEditTranslation,
  rejectEditTranslation,
  approveEditTranslation
} from '../../../store/questionnaire/actions';
import Question from './Question/question';
import { getCategoryTreeData } from 'store/category/actions';
import { LIBRARY_TYPES } from 'variables/library';
import _ from 'lodash';
import CheckboxTree from 'react-checkbox-tree';
import {
  BsCaretDownFill,
  BsCaretRightFill,
  BsSquare,
  BsDashSquare,
  BsPlusCircle
} from 'react-icons/bs';
import { FaRegCheckSquare } from 'react-icons/fa';
import { ContextAwareToggle } from 'components/Accordion/ContextAwareToggle';
import { STATUS } from '../../../variables/resourceStatus';
import Dialog from '../../../components/Dialog';
import FallbackText from '../../../components/Form/FallbackText';
import SelectLanguage from '../_Partials/SelectLanguage';
import useInterval from 'hook/useInterval';
import { Questionnaire } from 'services/questionnaire';
import settings from '../../../settings';

const CreateQuestionnaire = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { questionnaire, editTranslation } = useSelector(state => state.questionnaire);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [language, setLanguage] = useState({});
  const [formFields, setFormFields] = useState({
    id: '',
    title: '',
    description: ''
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const [titleError, setTitleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([{ title: '', type: 'checkbox', answers: [{ description: '' }, { description: '' }], file: null }]);
  const [questionTitleError, setQuestionTitleError] = useState([]);
  const [answerFieldError, setAnswerFieldError] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [errorClass, setErrorClass] = useState('');
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [isEditingTranslation, setIsEditingTranslation] = useState(false);
  const [editTranslations, setEditTranslations] = useState([]);
  const [editTranslationIndex, setEditTranslationIndex] = useState(1);
  const [showFallbackText, setShowFallbackText] = useState(false);

  useEffect(() => {
    dispatch(getCategoryTreeData({ type: LIBRARY_TYPES.QUESTIONNAIRE, lang: language.id }));
  }, [language, dispatch]);

  useEffect(() => {
    if (id && language) {
      dispatch(getQuestionnaire(id, language.id));
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
    if (id && questionnaire.id && questionnaire.status === STATUS.approved) {
      setIsEditingItem(false);
      setIsEditingTranslation(true);
    }

    if (id && questionnaire.id && (questionnaire.status === STATUS.pending || questionnaire.status === STATUS.rejected)) {
      setIsEditingItem(true);
      setIsEditingTranslation(false);
    }
  }, [id, questionnaire]);

  useEffect(() => {
    if (isEditingTranslation && questionnaire) {
      if (_.isEmpty(editTranslation)) {
        setFormFields({
          id: questionnaire.id,
          title: questionnaire.title,
          description: questionnaire.description,
          fallback: questionnaire.fallback
        });
        if (questionnaire.questions) {
          questionnaire.questions.forEach((question) => {
            if (question.file) {
              delete question.file.size;
            }
          });
        }
        setQuestions(questionnaire.questions);
        setShowFallbackText(false);
      } else {
        setFormFields({
          id: editTranslation.id,
          title: editTranslation.title,
          description: editTranslation.description,
          fallback: questionnaire.fallback
        });
        if (editTranslation.questions) {
          editTranslation.questions.forEach((question) => {
            if (question.file) {
              delete question.file.size;
            }
          });
        }
        setQuestions(editTranslation.questions);
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
          rootCategoryStructure[category.value] = _.intersectionWith(questionnaire.categories, ids);
        });
        setSelectedCategories(rootCategoryStructure);
      }
    }
  }, [isEditingTranslation, editTranslation, categoryTreeData, questionnaire]);

  useEffect(() => {
    if (isEditingItem) {
      setFormFields({
        title: questionnaire.title,
        description: questionnaire.description
      });
      if (questionnaire.questions) {
        questionnaire.questions.forEach(function (question) {
          if (question.file) {
            delete question.file.size;
          }
        });
      }
      setQuestions(questionnaire.questions);
      if (categoryTreeData.length) {
        const rootCategoryStructure = {};
        categoryTreeData.forEach(category => {
          const ids = [];
          JSON.stringify(category, (key, value) => {
            if (key === 'value') ids.push(value);
            return value;
          });
          rootCategoryStructure[category.value] = _.intersectionWith(questionnaire.categories, ids);
        });
        setSelectedCategories(rootCategoryStructure);
      }
    }
  }, [isEditingItem, categoryTreeData, questionnaire]);

  useInterval(() => {
    if (id && !questionnaire.blocked_editing) {
      Questionnaire.continueEditing(id);
    }
  }, 30000);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSave = () => {
    let canSave = true;
    const errorQuestionTitle = [];
    const errorAnswerField = [];

    if (formFields.title === '') {
      canSave = false;
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].title === '') {
        canSave = false;
        errorQuestionTitle.push(true);
      } else {
        errorQuestionTitle.push(false);
      }
    }

    for (let i = 0; i < questions.length; i++) {
      errorAnswerField.push([]);
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (questions[i].answers[j].description === '') {
          canSave = false;
          errorAnswerField[i].push(true);
        } else {
          errorAnswerField[i].push(false);
        }
      }
    }
    setQuestionTitleError(errorQuestionTitle);
    setAnswerFieldError(errorAnswerField);

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
          dispatch(approveEditTranslation(id, { ...formFields, categories: serializedSelectedCats, lang: language.id, questions }))
            .then(result => {
              if (result) {
                setIsLoading(false);
                dispatch(getQuestionnaire(id, language.id));
              }
              setIsLoading(false);
            });
        } else {
          dispatch(updateQuestionnaire(id, { ...formFields, categories: serializedSelectedCats, lang: language.id, questions }))
            .then(result => {
              if (result) {
                history.push(ROUTES.SERVICE_SETUP_QUESTIONNAIRE);
              }
              setIsLoading(false);
            });
        }
      } else {
        dispatch(createQuestionnaire({ ...formFields, categories: serializedSelectedCats, lang: language.id, questions }))
          .then(result => {
            if (result) {
              history.push(ROUTES.SERVICE_SETUP_QUESTIONNAIRE);
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
          dispatch(getQuestionnaire(id, language.id));
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(true);
      dispatch(rejectQuestionnaire(id)).then(result => {
        if (result) {
          dispatch(getQuestionnaire(id, language.id));
        }
        setIsLoading(false);
      });
    }
  };

  const handleDeleteDialogConfirm = () => {
    dispatch(deleteQuestionnaire(questionnaire.id)).then(result => {
      if (result) {
        history.push(ROUTES.ADMIN_RESOURCES_QUESTIONNAIRE);
      }
    });
  };

  const handleSetSelectedCategories = (parent, checked) => {
    setSelectedCategories({ ...selectedCategories, [parent]: checked.map(item => parseInt(item)) });
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: '', type: 'checkbox', answers: [{ description: '' }, { description: '' }], file: null }]);
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }, 300);
  };

  const handleFormSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  const disabledEditing = () => {
    return questionnaire.blocked_editing;
  };

  const cancelEditing = () => {
    if (id && !questionnaire.blocked_editing) {
      return Questionnaire.cancelEditing(id);
    }
  };

  const enableSave = () => {
    return questionnaire.status === STATUS.approved && _.isEmpty(editTranslations);
  };

  const enableReject = () => {
    if (questionnaire.status === STATUS.pending || questionnaire.status === STATUS.approved) {
      return !(language.code !== settings.locale && _.isEmpty(editTranslations));
    }
    return false;
  };

  const enableDelete = () => {
    return questionnaire.status === STATUS.rejected;
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1 className="text-primary">{ id ? translate('questionnaire.edit') : translate('questionnaire.create')}</h1>
      </div>

      { disabledEditing() && (
        <Alert variant="warning" className="mb-0">
          {translate('resources.block_editing_message', { editing_by: questionnaire.editing_by })}
        </Alert>
      )}

      <Form onKeyPress={(e) => handleFormSubmit(e)} className="no-gutters bg-white p-4">
        <Row>
          <Col sm={12} xl={11}>
            <Form.Group controlId="formLanguage">
              <Form.Label>{translate('common.language')}</Form.Label>
              <SelectLanguage
                translate={translate}
                resource={questionnaire}
                setLanguage={setLanguage}
                setEditTranslationIndex={setEditTranslationIndex}
                setEditTranslations={setEditTranslations}
                isDisabled={!isEditingTranslation}
              />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>{translate('questionnaire.title')}</Form.Label>
              <span className="text-dark ml-1">*</span>
              {showFallbackText && questionnaire.fallback &&
                <FallbackText translate={translate} text={questionnaire.fallback.title} />
              }
              <Form.Control
                name="title"
                onChange={handleChange}
                value={formFields.title}
                placeholder={translate('questionnaire.title.placeholder')}
                isInvalid={titleError}
                maxLength={255}
                disabled={disabledEditing()}
              />
              <Form.Control.Feedback type="invalid">
                {translate('questionnaire.title.required')}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId={'formDescription'}>
              <Form.Label>{translate('questionnaire.description')}</Form.Label>
              {showFallbackText && questionnaire.fallback &&
                <FallbackText translate={translate} text={questionnaire.fallback.description} />
              }
              <Form.Control
                name="description"
                as="textarea" rows={3}
                placeholder={translate('questionnaire.description.placeholder')}
                value={formFields.description}
                onChange={handleChange}
                disabled={disabledEditing()}
              />
            </Form.Group>

            {!isEditingTranslation &&
              <Accordion className="mb-3" defaultActiveKey={1}>
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
        <Row>
          <Col sm={12} xl={11} className="question-wrapper">
            <Question
              questionnaire={questionnaire}
              questions={questions}
              setQuestions={setQuestions}
              questionTitleError={questionTitleError}
              answerFieldError={answerFieldError}
              modifiable={!isEditingTranslation || disabledEditing()}
              showFallbackText={showFallbackText}
              isEditingTranslation={isEditingTranslation}
            />
            {!isEditingTranslation &&
              <div className="sticky-bottom d-flex justify-content-between">
                <div className="py-1 px-1">
                  <Button
                    variant="link btn-lg"
                    onClick={handleAddQuestion}
                    className="py-1"
                    disabled={disabledEditing()}
                  >
                    <BsPlusCircle size={20} /> {translate('questionnaire.new.question')}
                  </Button>
                </div>
                <div className="py-2 questionnaire-save-cancel-wrapper px-3">
                  { !id && (
                    <Button onClick={handleSave} disabled={isLoading || disabledEditing()}>
                      {translate('common.save')}
                    </Button>
                  )}
                  { id && (
                    <>
                      {questionnaire.status === STATUS.approved
                        ? <Button onClick={handleSave} disabled={isLoading || disabledEditing()}>{translate('common.save')}</Button>
                        : <Button onClick={handleSave} disabled={isLoading || disabledEditing()}>{translate('common.approve')}</Button>
                      }

                      {questionnaire.status === STATUS.rejected &&
                        <Button
                          onClick={() => setShowDeleteDialog(true)}
                          className="ml-2"
                          variant="outline-danger"
                          disabled={isLoading || disabledEditing()}
                        >
                          {translate('common.delete')}
                        </Button>
                      }

                      {(questionnaire.status === STATUS.pending || questionnaire.status === STATUS.approved) &&
                        <Button
                          onClick={handleReject}
                          className="ml-2"
                          variant="outline-primary"
                          disabled={isLoading || disabledEditing()}
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
                    to={ROUTES.SERVICE_SETUP_QUESTIONNAIRE}
                    disabled={isLoading}
                    onClick={cancelEditing}
                  >
                    {translate('common.cancel')}
                  </Button>
                </div>
              </div>
            }

            {isEditingTranslation &&
              <div className="sticky-bottom d-flex justify-content-end">
                <div className="py-2 questionnaire-save-cancel-wrapper px-3">
                  { !id && (
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                    >
                      {translate('common.save')}
                    </Button>
                  )}

                  { id && (
                    <>
                      {enableSave()
                        ? <Button onClick={handleSave} disabled={isLoading || disabledEditing()}>{translate('common.save')}</Button>
                        : <Button onClick={handleSave} disabled={isLoading || disabledEditing()}>{translate('common.approve')}</Button>
                      }

                      {enableDelete() &&
                        <Button
                          onClick={() => setShowDeleteDialog(true)}
                          className="ml-2"
                          variant="outline-danger"
                          disabled={isLoading || disabledEditing()}
                        >
                          {translate('common.delete')}
                        </Button>
                      }

                      {enableReject() &&
                        <Button
                          onClick={handleReject}
                          className="ml-2"
                          variant="outline-primary"
                          disabled={isLoading || disabledEditing()}
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
                    to={ROUTES.SERVICE_SETUP_QUESTIONNAIRE}
                    disabled={isLoading || disabledEditing()}
                  >
                    {translate('common.cancel')}
                  </Button>
                </div>
              </div>
            }
          </Col>
        </Row>
      </Form>

      <Dialog
        show={showDeleteDialog}
        title={translate('questionnaire.delete_confirmation_title')}
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

CreateQuestionnaire.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(CreateQuestionnaire);
