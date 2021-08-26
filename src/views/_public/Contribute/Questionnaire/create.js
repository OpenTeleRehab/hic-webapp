import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row, Accordion, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as ROUTES from 'variables/routes';
import { getCategoryTreeData } from 'store/category/actions';
import { CATEGORY_TYPES } from 'variables/category';
import _ from 'lodash';
import CheckboxTree from 'react-checkbox-tree';
import {
  BsCaretDownFill,
  BsCaretRightFill,
  BsSquare,
  BsDashSquare, BsPlusCircle
} from 'react-icons/bs';
import { FaRegCheckSquare } from 'react-icons/fa';
import { addMoreQuestionnaire, updateQuestionnaire, clearContribute } from '../../../../store/contribute/actions';
import { replaceRoute } from '../../../../utils/route';
import { ContextAwareToggle } from 'components/Accordion/ContextAwareToggle';
import Dialog from '../../../../components/Dialog';
import Question from './Question/index';

const CreateQuestionnaire = ({ translate, hash, editItem, setEditItem, showReviewModal, lang }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const resetQuestionFormFields = { title: '', type: 'checkbox', answers: [{ description: '' }, { description: '' }], file: null };

  const { activeLanguage } = useSelector((state) => state.language);
  const { questionnaires } = useSelector(state => state.contribute);
  const [getQuestionnaires, setGetQuestionnaires] = useState([]);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [formFields, setFormFields] = useState({
    title: '',
    description: ''
  });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const [titleError, setTitleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([resetQuestionFormFields]);
  const [questionTitleError, setQuestionTitleError] = useState([]);
  const [answerFieldError, setAnswerFieldError] = useState([]);

  useEffect(() => {
    dispatch(getCategoryTreeData({ type: CATEGORY_TYPES.QUESTIONNAIRE, lang: lang }));
  }, [lang, dispatch]);

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
        description: editItem.description
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
      id: editItem ? formFields.id : questionnaires.length,
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
      description: ''
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

    return canSave;
  };

  const handleConfirmCancelModal = () => {
    dispatch(clearContribute());
    history.push(replaceRoute(ROUTES.LIBRARY, activeLanguage));
  };

  return (
    <>
      <Form>
        <h5 className="text-primary">{translate('common.information')}</h5>
        <Row>
          <Col sm={12} xl={11}>
            <Form.Group controlId="formTitle">
              <Form.Label>{translate('questionnaire.title')}</Form.Label>
              <span className="text-dark ml-1">*</span>
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
            </Accordion>
          </Col>
        </Row>
        <Row>
          <Col sm={12} xl={11} className="question-wrapper">
            <Question
              questions={questions}
              setQuestions={setQuestions}
              questionTitleError={questionTitleError}
              answerFieldError={answerFieldError}
              modifiable={!editItem}
            />
          </Col>
        </Row>

        <div className="sticky-bottom d-flex justify-content-end">
          <Button
            variant="link btn-lg"
            onClick={handleAddQuestion}
            className="mr-auto"
          >
            <BsPlusCircle size={20} /> {translate('questionnaire.new.question')}
          </Button>

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

CreateQuestionnaire.propTypes = {
  translate: PropTypes.func,
  hash: PropTypes.string,
  editItem: PropTypes.object,
  setEditItem: PropTypes.func,
  showReviewModal: PropTypes.func,
  lang: PropTypes.number
};

export default withLocalize(CreateQuestionnaire);
