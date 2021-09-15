import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { Accordion, AccordionContext, Button, Card, Form } from 'react-bootstrap';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router-dom';
import {
  getQuestionnaireBySlug
} from '../../../../store/questionnaire/actions';
import { replaceRoute } from '../../../../utils/route';
import * as ROUTES from '../../../../variables/routes';

const QuestionnaireDetail = () => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();
  const { questionnaireBySlug } = useSelector(state => state.questionnaire);
  const { languages, activeLanguage } = useSelector((state) => state.language);
  const [questions, setQuestions] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);

  useEffect(() => {
    if (slug) {
      const lang = languages.find((language) => language.code === activeLanguage);
      dispatch(getQuestionnaireBySlug({ slug: slug }, lang && lang.id));
    }
  }, [slug, languages, activeLanguage, dispatch]);

  useEffect(() => {
    if (questionnaireBySlug && questionnaireBySlug.questions) {
      setQuestions(questionnaireBySlug.questions);
      setTotalQuestion(questionnaireBySlug.questions.length);
    }
  }, [questionnaireBySlug]);

  // set page title
  useEffect(() => {
    if (questionnaireBySlug) {
      document.title = `${questionnaireBySlug.title} - ${process.env.REACT_APP_SITE_TITLE}`;
    }
  }, [questionnaireBySlug]);

  return (
    <>
      <h1 className="text-primary font-weight-bold mb-3">{questionnaireBySlug && questionnaireBySlug.title}</h1>
      <div className="d-flex flex-column mb-2">
        <span className="font-weight-bold">{translate('questionnaire.description')}</span>
        <span>{questionnaireBySlug && questionnaireBySlug.description}</span>
      </div>
      <div className="d-flex flex-column mb-3">
        <span className="font-weight-bold">{translate('questionnaire.number_of_question')}</span>
        <span>{totalQuestion}</span>
      </div>
      {questions.map((question, index) => (
        <Accordion key={index}>
          <Card className="mb-3 question-card">
            <Accordion.Toggle as={Card.Header} eventKey={index + 1} className="card-header view-question-card-header d-flex justify-content-between">
              <h6>{translate('questionnaire.question_number', { number: index + 1 })}</h6>
              <ContextAwareToggle eventKey={index + 1} />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index + 1}>
              <Card.Body>
                { question.file &&
                  <img src={`${process.env.REACT_APP_API_BASE_URL}/file/${question.file.id}`} alt="..." className="img-thumbnail"/>
                }
                <div className="mb-2 mt-2">
                  {question.title}
                </div>
                <div>
                  {
                    question.type === 'checkbox' && (
                      question.answers.map((answer, index) => (
                        <div key={index}>
                          <Form.Check
                            inline label={answer.description}
                            type='checkbox'
                            disabled
                          />
                        </div>
                      ))
                    )
                  }
                  {
                    question.type === 'multiple' && (
                      question.answers.map((answer, index) => (
                        <div key={index}>
                          <Form.Check
                            inline label={answer.description}
                            type='radio'
                            disabled
                          />
                        </div>
                      ))
                    )
                  }
                  {
                    question.type === 'open-text' && (
                      <div className="ml-1">
                        <Form.Group controlId='formValue'>
                          <Form.Control
                            disabled
                            type="text"
                          />
                        </Form.Group>
                      </div>
                    )
                  }
                  {
                    question.type === 'open-number' && (
                      <div className="ml-1">
                        <Form.Group controlId='formValue'>
                          <Form.Control
                            disabled
                            type="number"
                          />
                        </Form.Group>
                      </div>
                    )
                  }
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))
      }
      {activeLanguage !== 'en' &&
        <Button
          className="btn-block"
          size="sm"
          onClick={() => history.push(replaceRoute(ROUTES.QUESTIONNAIRE_EDIT_TRANSLATION.replace(':id', questionnaireBySlug.id), activeLanguage))}
        >
          {translate('exercise.edit_translation')}
        </Button>
      }
    </>
  );
};

export default QuestionnaireDetail;

const ContextAwareToggle = ({ eventKey }) => {
  const currentEventKey = useContext(AccordionContext);

  if (currentEventKey === eventKey) {
    return <BsChevronDown className="ml-auto" />;
  }

  return <BsChevronRight className="ml-auto" />;
};

ContextAwareToggle.propTypes = {
  eventKey: PropTypes.string
};
