import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { Accordion, AccordionContext, Button, Card, Form } from 'react-bootstrap';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router-dom';
import { getQuestionnaire } from '../../../../store/questionnaire/actions';
import { replaceRoute } from '../../../../utils/route';
import * as ROUTES from '../../../../variables/routes';

const QuestionnaireDetail = () => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();
  const history = useHistory();
  const { questionnaire } = useSelector(state => state.questionnaire);
  const { languages, activeLanguage } = useSelector((state) => state.language);
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);

  useEffect(() => {
    if (id) {
      const lang = languages.find((language) => language.code === activeLanguage);
      dispatch(getQuestionnaire(id, lang && lang.id));
    }
  }, [id, languages, activeLanguage, dispatch]);

  useEffect(() => {
    if (questionnaire && questionnaire.questions) {
      setQuestions(questionnaire.questions);
      setTotalQuestion(questionnaire.questions.length);
    }
  }, [questionnaire]);

  // set page title
  useEffect(() => {
    if (questionnaire) {
      document.title = `${questionnaire.title} - ${process.env.REACT_APP_SITE_TITLE}`;
    }
  }, [questionnaire]);

  useEffect(() => {
    history.push(replaceRoute(ROUTES.LIBRARY_QUESTIONNAIRE_DETAIL, activeLanguage).replace(':id', id));
  }, [activeLanguage, history, id]);

  return (
    <>
      <h1 className="text-primary font-weight-bold mb-3">{questionnaire && questionnaire.title}</h1>
      <div className="d-flex flex-column mb-2">
        <span className="font-weight-bold">{translate('questionnaire.description')}</span>
        <span>{questionnaire && questionnaire.description}</span>
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
      <Button className={activeLanguage === 'en' ? 'd-none' : 'mt-3 w-100'} size="sm">{translate('exercise.edit_translation')}</Button>
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
