import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as ROUTES from '../../../variables/routes';
import {
  createQuestionnaire,
  getQuestionnaire,
  updateQuestionnaire
} from '../../../store/questionnaire/actions';
import Question from './Question/question';

const CreateQuestionnaire = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { languages } = useSelector(state => state.language);
  const { questionnaire, filters } = useSelector(state => state.questionnaire);
  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    title: '',
    description: ''
  });

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([{ title: '', type: 'checkbox', answers: [{ description: '' }, { description: '' }], file: null }]);
  const [questionTitleError, setQuestionTitleError] = useState([]);
  const [answerFieldError, setAnswerFieldError] = useState([]);

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
    if (id && language) {
      dispatch(getQuestionnaire(id, language));
    }
  }, [id, language, dispatch]);

  useEffect(() => {
    if (id && questionnaire.id) {
      setFormFields({
        title: questionnaire.title,
        description: questionnaire.description
      });
      setQuestions(questionnaire.questions);
    }
  }, [id, questionnaire]);

  const handleLanguageChange = e => {
    const { value } = e.target;
    setLanguage(value);
  };

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

    if (formFields.description === '') {
      canSave = false;
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
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

    if (canSave) {
      setIsLoading(true);
      if (id) {
        dispatch(updateQuestionnaire(id, { ...formFields, lang: language, questions }))
          .then(result => {
            if (result) {
              history.push(ROUTES.SERVICE_SETUP_QUESTIONNAIRE);
            }
            setIsLoading(false);
          });
      } else {
        dispatch(createQuestionnaire({ ...formFields, lang: language, questions }))
          .then(result => {
            if (result) {
              history.push(ROUTES.SERVICE_SETUP_QUESTIONNAIRE);
            }
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{ id ? translate('questionnaire.edit') : translate('questionnaire.create')}</h1>
      </div>
      <Form>
        <Row>
          <Col sm={5} xl={4}>
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
          <Col sm={4} xl={3}>
            <Form.Group controlId="formLanguage">
              <Form.Label>{translate('common.show_language.version')}</Form.Label>
              <Form.Control as="select" value={language} onChange={handleLanguageChange} disabled={!id}>
                {languages.map((language, index) => (
                  <option key={index} value={language.id}>
                    {language.name} {language.code === language.fallback && `(${translate('common.default')})`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={9} xl={7}>
            <Form.Group controlId={'formDescription'}>
              <Form.Label>{translate('questionnaire.description')}</Form.Label>
              <span className="text-dark ml-1">*</span>
              <Form.Control
                name="description"
                as="textarea" rows={3}
                placeholder={translate('questionnaire.description.placeholder')}
                value={formFields.description}
                onChange={handleChange}
                isInvalid={descriptionError}
                maxLength={255}
              />
              <Form.Control.Feedback type="invalid">
                {translate('questionnaire.description.required')}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={10} xl={8}>
            <Question
              questions={questions}
              setQuestions={setQuestions}
              language={language}
              questionTitleError={questionTitleError}
              answerFieldError={answerFieldError}
              modifiable={!questionnaire.is_used || !id}
            />
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
                to={ROUTES.SERVICE_SETUP_QUESTIONNAIRE}
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

CreateQuestionnaire.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(CreateQuestionnaire);
