import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import {
  Button,
  Card,
  Col,
  Form,
  Row
} from 'react-bootstrap';
import {
  BsPlus,
  BsUpload,
  BsX,
  BsArrowsMove,
  BsXCircle
} from 'react-icons/bs';
import {
  FaCopy,
  FaTrashAlt
} from 'react-icons/fa';
import settings from '../../../../../settings';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import scssColors from '../../../../../scss/custom.scss';
import FallbackText from '../../../../../components/Form/FallbackText';

const reorderQuestion = (questions, startIndex, endIndex) => {
  const result = Array.from(questions);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Question = ({ translate, questions, setQuestions, questionTitleError, answerFieldError, modifiable }) => {
  const handleFileChange = (e, index) => {
    const { name, files } = e.target;
    const values = [...questions];
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      const file = { url: reader.result, fileName: files[0].name, fileSize: files[0].size, fileType: files[0].type };
      values[index][name] = file;
      setQuestions(values);
    };
  };

  const handleFileRemove = (index) => {
    const values = [...questions];
    values[index].file = null;
    setQuestions(values);
  };

  const handleAddAnswer = (index) => {
    const newAnswer = questions[index].answers;
    newAnswer.push({ description: '' });
    const questionData = [...questions];
    questionData[index] = { ...questionData[index], answers: newAnswer };
    setQuestions(questionData);
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const answers = questions[questionIndex].answers;
    answers[answerIndex].description = e.target.value;
    const questionData = [...questions];
    questionData[questionIndex] = { ...questionData[questionIndex] };
    setQuestions(questionData);
  };

  const handleAnswerRemove = (questionIndex, answerIndex) => {
    const answers = questions[questionIndex].answers;
    if (answerIndex !== -1) {
      answers.splice(answerIndex, 1);
    }
    const questionData = [...questions];
    questionData[questionIndex] = { ...questionData[questionIndex], answer: answers };
    setQuestions(questionData);
  };

  const handleQuestionTitleChange = (index, e) => {
    const values = [...questions];
    values[index][e.target.name] = e.target.value;
    setQuestions(values);
  };

  const handleSelectChange = (index, e) => {
    const values = [...questions];
    values[index].type = e.target.value;
    values[index] = { ...values[index], answers: values[index].type === 'checkbox' || values[index].type === 'multiple' ? [{ description: '' }, { description: '' }] : [] };
    setQuestions(values);
  };

  const handleRemoveQuestion = (index) => {
    questions.splice(index, 1);
    setQuestions([...questions]);
  };

  const handleCloneQuestion = (index) => {
    const { title, type } = questions[index];
    const answers = _.cloneDeep(questions[index].answers);
    setQuestions([...questions, { title, type, answers }]);
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }, 300);
  };

  const onDragEnd = (e) => {
    // dropped outside the list
    if (!e.destination) {
      return;
    }

    const updatedQuestions = reorderQuestion(
      questions,
      e.source.index,
      e.destination.index
    );

    setQuestions(updatedQuestions);
  };

  return (
    <>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable key={index} draggableId={`question${index}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <Card className="question-card mb-3">
                        <Card.Header className="card-header">
                          <Card.Title className="d-flex justify-content-between">
                            <h5>{translate('questionnaire.question_number', { number: index + 1 })}</h5>
                            {!modifiable &&
                              <>
                                <div {...provided.dragHandleProps}>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="text-dark p-0 mr-5 mb-3 drag-button"
                                  >
                                    <BsArrowsMove size={20}/>
                                  </Button>
                                </div>
                                <div>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="text-primary p-0 mr-1"
                                    onClick={() => handleCloneQuestion(index)}
                                  >
                                    <FaCopy size={20}/>
                                  </Button>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="text-danger p-0"
                                    onClick={() => handleRemoveQuestion(index)}
                                    disabled={questions.length === 1}
                                  >
                                    <FaTrashAlt size={20}/>
                                  </Button>
                                </div>
                              </>
                            }
                          </Card.Title>
                          <Row>
                            <Col sm={8} xl={7}>
                              <Form.Group controlId={`formTitle${index}`}>
                                {modifiable && question.fallback && <FallbackText translate={translate} text={question.fallback.title} />}
                                <Form.Control
                                  name="title"
                                  onChange={e => handleQuestionTitleChange(index, e)}
                                  value={question.title}
                                  placeholder={translate('question.title.placeholder')}
                                  isInvalid={questionTitleError[index]}
                                  maxLength={settings.textMaxLength}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {translate('question.title.required')}
                                </Form.Control.Feedback>
                              </Form.Group>
                              { question.file &&
                                <div className={`form-group w-50 position-relative ${modifiable && question.file.id && 'opacity-50'}`}>
                                  <img src={question.file.url || `${process.env.REACT_APP_API_BASE_URL}/file/${question.file.id}`} alt={question.name} className="w-100 img-thumbnail border-danger" />
                                  <Button
                                    disabled={modifiable && question.file.id}
                                    variant="link"
                                    className="position-absolute btn-remove"
                                    onClick={() => handleFileRemove(index)}
                                  >
                                    <BsXCircle size={20} color={scssColors.danger} /> <span className="sr-only">{translate('common.remove')}</span>
                                  </Button>
                                </div>
                              }
                              {!modifiable &&
                                <div className="btn btn-sm text-primary position-relative overflow-hidden" >
                                  <BsUpload size={15}/> Upload Image
                                  <input type="file" name="file" className="position-absolute upload-btn" onChange={e => handleFileChange(e, index)} accept="image/*"/>
                                </div>
                              }
                            </Col>
                            <Col sm={3} xl={4}>
                              {!modifiable &&
                                <Form.Group controlId={`formType${index}`}>
                                  <Form.Control
                                    name ="type"
                                    as="select"
                                    value={question.type}
                                    onChange={e => handleSelectChange(index, e)}
                                  >
                                    <option value='checkbox'>{translate('question.type.checkbox')}</option>
                                    <option value='multiple'>{translate('question.type.multiple_choice')}</option>
                                    <option value='open-text'>{translate('question.type.open_ended_free_text')}</option>
                                    <option value='open-number'>{translate('question.type.open_ended_numbers_only')}</option>
                                  </Form.Control>
                                </Form.Group>
                              }
                            </Col>
                          </Row>
                        </Card.Header>
                        <Card.Body>
                          <div className="mb-3">
                            {
                              question.type === 'checkbox' && (
                                question.answers.map((answer, answerIndex) => (
                                  <Row key={answerIndex}>
                                    <Col sm={8} xl={7}>
                                      {modifiable && answer.fallback && <FallbackText translate={translate} text={answer.fallback.description} />}
                                      <Form.Check type='checkbox'>
                                        <Form.Check.Input type='checkbox' isValid className="mt-3" disabled />
                                        <Form.Check.Label className="w-100">
                                          <Form.Group controlId={`formValue${answerIndex}`}>
                                            <Form.Control
                                              name="value"
                                              value={answer.description}
                                              placeholder={translate('question.answer.description.placeholder')}
                                              onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                                              isInvalid={answerFieldError[index] ? answerFieldError[index][answerIndex] : false}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              {translate('question.answer.description.required')}
                                            </Form.Control.Feedback>
                                          </Form.Group>
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </Col>
                                    {!modifiable &&
                                      <Col sm={4} xl={5} className="mt-1">
                                        <Button
                                          variant="outline-danger"
                                          className="remove-btn"
                                          onClick={() => handleAnswerRemove(index, answerIndex)}
                                          disabled={question.answers.length <= 2}
                                        >
                                          <BsX size={16} />
                                        </Button>
                                      </Col>
                                    }
                                  </Row>
                                ))
                              )
                            }
                            {
                              question.type === 'multiple' && (
                                question.answers.map((answer, answerIndex) => (
                                  <Row key={answerIndex}>
                                    <Col sm={8} xl={7}>
                                      {modifiable && answer.fallback && <FallbackText translate={translate} text={answer.fallback.description} />}
                                      <Form.Check type='radio'>
                                        <Form.Check.Input type='radio' isValid className="mt-3" disabled />
                                        <Form.Check.Label className="w-100">
                                          <Form.Group controlId={`formValue${answerIndex}`}>
                                            <Form.Control
                                              name="value"
                                              value={answer.description}
                                              placeholder={translate('question.answer.description.placeholder')}
                                              onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                                              isInvalid={answerFieldError[index] ? answerFieldError[index][answerIndex] : false}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              {translate('question.answer.description.required')}
                                            </Form.Control.Feedback>
                                          </Form.Group>
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </Col>
                                    {!modifiable &&
                                      <Col sm={4} xl={5} className="mt-1">
                                        <Button
                                          variant="outline-danger"
                                          className="remove-btn"
                                          onClick={() => handleAnswerRemove(index, answerIndex)}
                                          disabled={question.answers.length <= 2}
                                        >
                                          <BsX size={16} />
                                        </Button>
                                      </Col>
                                    }
                                  </Row>
                                ))
                              )
                            }
                            {
                              question.type === 'open-text' && (
                                <Form.Group controlId='formValue'>
                                  <Form.Control
                                    disabled
                                    name="value"
                                  />
                                </Form.Group>
                              )
                            }
                            {
                              question.type === 'open-number' && (
                                <Form.Group controlId='formValue'>
                                  <Form.Control
                                    disabled
                                    type="number"
                                    name="value"
                                  />
                                </Form.Group>
                              )
                            }
                            {(question.type === 'checkbox' || question.type === 'multiple') && !modifiable &&
                              <Form.Group className="ml-3">
                                <Button
                                  variant="link"
                                  onClick={() => handleAddAnswer(index)}
                                  className="p-0"
                                >
                                  <BsPlus size={16} /> {translate('question.add.more.answer')}
                                </Button>
                              </Form.Group>
                            }
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

Question.propTypes = {
  translate: PropTypes.func,
  questions: PropTypes.array,
  setQuestions: PropTypes.func,
  questionTitleError: PropTypes.array,
  answerFieldError: PropTypes.array,
  modifiable: PropTypes.bool
};

export default withLocalize(Question);
