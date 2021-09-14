import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row, Accordion, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as ROUTES from 'variables/routes';
import { getCategoryTreeData } from 'store/category/actions';
import { LIBRARY_TYPES } from 'variables/library';
import _ from 'lodash';
import CheckboxTree from 'react-checkbox-tree';
import {
  BsCaretDownFill,
  BsCaretRightFill,
  BsSquare,
  BsDashSquare, BsPlusCircle
} from 'react-icons/bs';
import { FaRegCheckSquare } from 'react-icons/fa';
import {
  addMoreQuestionnaire,
  updateQuestionnaire,
  clearContribute
} from '../../../../store/contribute/actions';
import { replaceRoute } from '../../../../utils/route';
import { ContextAwareToggle } from 'components/Accordion/ContextAwareToggle';
import Dialog from '../../../../components/Dialog';
import { getQuestionnaire } from '../../../../store/questionnaire/actions';
import Select from 'react-select';
import scssColors from '../../../../scss/custom.scss';
import Question from './Question';
import FallbackText from '../../../../components/Form/FallbackText';

const CreateQuestionnaire = ({ translate, hash, editItem, setEditItem, showReviewModal }) => {
  const dispatch = useDispatch();
  const resetQuestionFormFields = { title: '', type: 'checkbox', answers: [{ description: '' }, { description: '' }], file: null };
  const { languages, activeLanguage } = useSelector(state => state.language);
  const { questionnaire } = useSelector(state => state.questionnaire);
  const { questionnaires } = useSelector(state => state.contribute);
  const [getQuestionnaires, setGetQuestionnaires] = useState([]);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    id: '',
    title: '',
    description: '',
    lang: '',
    edit_translation: false
  });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const [titleError, setTitleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([resetQuestionFormFields]);
  const [questionTitleError, setQuestionTitleError] = useState([]);
  const [answerFieldError, setAnswerFieldError] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  const [categoryError, setCategoryError] = useState(false);
  const [errorClass, setErrorClass] = useState('');

  useEffect(() => {
    const lang = languages.find((language) => language.code === activeLanguage);
    if (lang && language === '') {
      setLanguage(lang.id);
    }
  }, [language, languages, activeLanguage]);

  useEffect(() => {
    dispatch(getCategoryTreeData({ type: LIBRARY_TYPES.QUESTIONNAIRE, lang: language }));
  }, [dispatch, language]);

  useEffect(() => {
    if (id && language) {
      dispatch(getQuestionnaire(id, language));
    }
  }, [id, language, dispatch]);

  useEffect(() => {
    if (id && questionnaire.id) {
      setFormFields({
        id: questionnaire.id,
        title: questionnaire.title,
        description: questionnaire.description,
        lang: language,
        edit_translation: true,
        fallback: questionnaire.fallback
      });
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
  }, [id, questionnaire, categoryTreeData, language]);

  useEffect(() => {
    setGetQuestionnaires(questionnaires);
  }, [questionnaires]);

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
    if (editItem && hash.includes('#questionnaire')) {
      setFormFields({
        id: editItem.id,
        title: editItem.title,
        description: editItem.description,
        lang: '',
        edit_translation: false
      });
      setQuestions(editItem.questions);
      if (categoryTreeData.length) {
        const rootCategoryStructure = {};
        categoryTreeData.forEach(category => {
          const ids = [];
          JSON.stringify(category, (key, value) => {
            if (key === 'value') ids.push(value);
            return value;
          });
          rootCategoryStructure[category.value] = _.intersectionWith(editItem.categories, ids);
        });
        setSelectedCategories(rootCategoryStructure);
      }
    }
  }, [editItem, categoryTreeData, hash]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSetSelectedCategories = (parent, checked) => {
    setSelectedCategories({ ...selectedCategories, [parent]: checked.map(item => parseInt(item)) });
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, resetQuestionFormFields]);
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }, 300);
  };

  const handleSubmit = (e) => {
    if (getQuestionnaires.length === 0 || formFields.title !== '') {
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
      id: editItem || id ? formFields.id : questionnaires.length,
      title: formFields.title,
      description: formFields.description,
      categories: serializedSelectedCats,
      questions
    };

    if (editItem) {
      dispatch(updateQuestionnaire(payload)).then(() => {
        setEditItem(undefined);
        setIsLoading(false);
        handleResetForm();
      });
    } else if (id) {
      dispatch(clearContribute());
      dispatch(addMoreQuestionnaire(payload)).then(() => {
        setIsLoading(false);
      });
    } else {
      dispatch(addMoreQuestionnaire(payload)).then(() => {
        setIsLoading(false);
        handleResetForm();
      });
    }
  };

  const handleResetForm = () => {
    setSelectedCategories([]);
    setQuestions([resetQuestionFormFields]);
    setFormFields({
      id: '',
      title: '',
      description: '',
      lang: '',
      edit_translation: false
    });
  };

  const handleValidation = () => {
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

    return canSave;
  };

  const handleConfirmCancelModal = () => {
    dispatch(clearContribute());
    history.push(replaceRoute(ROUTES.LIBRARY, activeLanguage));
  };

  const handleCancel = () => {
    if (id) {
      history.push({
        pathname: replaceRoute(ROUTES.LIBRARY_QUESTIONNAIRE_DETAIL.replace(':id', questionnaire.slug), activeLanguage),
        state: { id: id }
      });
    } else {
      setShowCancelModal(true);
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

  return (
    <>
      <Form>
        <h5 className="text-primary">{translate('common.information')}</h5>
        <Row>
          <Col sm={12} xl={11}>
            {id &&
              <Form.Group controlId="formLanguage">
                <Form.Label>{translate('common.language')}</Form.Label>
                <Select
                  isDisabled={!id}
                  classNamePrefix="filter"
                  value={languages.filter(option => option.id === language)}
                  getOptionLabel={option => option.name}
                  options={languages.slice(1)}
                  onChange={(e) => setLanguage(e.id)}
                  styles={customSelectStyles}
                />
              </Form.Group>
            }
            <Form.Group controlId="formTitle">
              <Form.Label>{translate('questionnaire.title')}</Form.Label>
              <span className="text-dark ml-1">*</span>
              {formFields.fallback && <FallbackText translate={translate} text={formFields.fallback.title} />}
              <Form.Control
                name="title"
                onChange={handleChange}
                value={formFields.title}
                placeholder={translate('questionnaire.title.placeholder')}
                isInvalid={titleError}
                maxLength={255}
              />
              <Form.Control.Feedback type="invalid">
                {translate('questionnaire.title.required')}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} xl={11}>
            <Form.Group controlId={'formDescription'}>
              <Form.Label>{translate('questionnaire.description')}</Form.Label>
              {formFields.fallback && <FallbackText translate={translate} text={formFields.fallback.description} />}
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                placeholder={translate('questionnaire.description.placeholder')}
                value={formFields.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        {!id &&
          <Row>
            <Col sm={12} xl={11}>
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
            </Col>
          </Row>
        }
        <Row>
          <Col sm={12} xl={11} className="question-wrapper">
            <Question
              translate={translate}
              questions={questions}
              setQuestions={setQuestions}
              questionTitleError={questionTitleError}
              answerFieldError={answerFieldError}
              modifiable={!!id}
            />
          </Col>
        </Row>

        <div className="sticky-bottom d-flex justify-content-end">
          {!id &&
            <Button
              variant="link btn-lg"
              onClick={handleAddQuestion}
              className="mr-auto"
            >
              <BsPlusCircle size={20}/> {translate('questionnaire.new.question')}
            </Button>
          }
          <Button onClick={handleSubmit}>
            {translate('common.submit')}
          </Button>
          {!id &&
            <Button
              className="ml-2"
              variant="outline-primary"
              onClick={handleAddMore}
              disabled={isLoading}
            >
              {translate('common.add_more')}
            </Button>
          }
          <Button
            className="ml-2"
            variant="outline-primary"
            onClick={handleCancel}
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

CreateQuestionnaire.propTypes = {
  translate: PropTypes.func,
  hash: PropTypes.string,
  editItem: PropTypes.object,
  setEditItem: PropTypes.func,
  showReviewModal: PropTypes.func
};

export default withLocalize(CreateQuestionnaire);
