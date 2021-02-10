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
import { BsPlus, BsUpload, BsX, BsPlusCircle } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { FaCopy, FaTrashAlt } from 'react-icons/fa';
import settings from '../../../../settings';

const Question = ({ translate, questions, setQuestions, language, questionTitleError, answerFieldError }) => {
  const { languages } = useSelector(state => state.language);

  const handleFileChange = (e, index) => {
    const { name, files } = e.target;
    const values = [...questions];
    values[index][name] = files[0];
    setQuestions(values);
  };

  const readImage = (file) => {
    if (file) {
      if (file.id) {
        return `${process.env.REACT_APP_API_BASE_URL}/file/${file.id}`;
      }

      return window.URL.createObjectURL(file);
    }

    return '';
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
    const updatedQuestion = { ...questionData[index], answers: newAnswer };
    questionData[index] = updatedQuestion;
    setQuestions(questionData);
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const answers = questions[questionIndex].answers;
    answers[answerIndex].description = e.target.value;
    const questionData = [...questions];
    const updatedQuestion = { ...questionData[questionIndex], answer: answers };
    questionData[questionIndex] = updatedQuestion;
    setQuestions(questionData);
  };

  const handleAnswerRemove = (questionIndex, answerIndex) => {
    const answers = questions[questionIndex].answers;
    if (answerIndex !== -1) {
      answers.splice(answerIndex, 1);
    }
    const questionData = [...questions];
    const updatedQuestion = { ...questionData[questionIndex], answer: answers };
    questionData[questionIndex] = updatedQuestion;
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
    const updatedQuestion = { ...values[index], answers: values[index].type === 'checkbox' || values[index].type === 'multiple' ? [{ description: '' }] : [] };
    values[index] = updatedQuestion;
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: '', type: 'checkbox', answers: [{ description: '' }], file: null }]);
  };

  const handleRemoveQuestion = (index) => {
    questions.splice(index, 1);
    setQuestions([...questions]);
  };

  const enableButtons = () => {
    const languageObj = languages.find(item => item.id === parseInt(language, 10));
    return languageObj && languageObj.code === languageObj.fallback;
  };

  const handleCloneQuestion = (index) => {
    const { title, type, answers } = questions[index];
    setQuestions([...questions, { title, type, answers }]);
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {
        questions.map((question, index) => (
          <Card key={index} className="question-card mb-3">
            <Card.Header className="card-header">
              <Card.Title className="d-flex justify-content-between">
                <h5>{translate('questionnaire.question_number', { number: index + 1 })}</h5>
                {enableButtons() &&
                  <div>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-primary p-0 mr-1"
                      onClick={() => handleCloneQuestion(index)}
                    >
                      <FaCopy size={20} />
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-danger p-0"
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      <FaTrashAlt size={20} />
                    </Button>
                  </div>
                }
              </Card.Title>
              <Row>
                <Col sm={8} xl={7}>
                  <Form.Group controlId={`formTitle${index}`}>
                    <Form.Control
                      name="title"
                      onChange={e => handleQuestionTitleChange(index, e)}
                      value={question.title}
                      placeholder={translate('questionnaire.title.placeholder')}
                      isInvalid={questionTitleError[index]}
                      maxLength={settings.textMaxLength}
                    />
                    <Form.Control.Feedback type="invalid">
                      {translate('question.title.required')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  { question.file &&
                    <div className="mb-2 w-50 d-flex justify-content-between">
                      <img src={readImage(question.file)} alt="..." className="img-thumbnail"/>
                      {enableButtons() &&
                        <div className="ml-3">
                          <Button
                            variant="outline-danger"
                            className="remove-btn"
                            onClick={() => handleFileRemove(index)}
                          >
                            <BsX size={15} />
                          </Button>
                        </div>
                      }
                    </div>
                  }
                  {enableButtons() &&
                    <div className="btn btn-sm text-primary position-relative overflow-hidden" >
                      <BsUpload size={15}/> Upload Image
                      <input type="file" name="file" className="position-absolute upload-btn" onChange={e => handleFileChange(e, index)} accept="image/*"/>
                    </div>
                  }
                </Col>
                <Col sm={5} xl={4}>
                  <Form.Group controlId={`formType${index}`}>
                    <Form.Control name ="type" as="select" value={question.type} onChange={e => handleSelectChange(index, e)} disabled={!enableButtons()}>
                      <option value='checkbox'>{translate('question.type.checkbox')}</option>
                      <option value='multiple'>{translate('question.type.multiple_choice')}</option>
                      <option value='open-text'>{translate('question.type.open_ended_free_text')}</option>
                      <option value='open-number'>{translate('question.type.open_ended_numbers_only')}</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                {
                  question.type === 'checkbox' && (
                    question.answers.map((answer, answerIndex) => (
                      <Row key={answerIndex}>
                        <Col sm={8} xs={7}>
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
                        {enableButtons() &&
                          <Col sm={4} xl={3} className="mt-1">
                            <Button
                              variant="outline-danger"
                              className="remove-btn"
                              onClick={() => handleAnswerRemove(index, answerIndex)}
                            >
                              <BsX size={15} />
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
                        {enableButtons() &&
                          <Col sm={4} xl={3} className="mt-1">
                            <Button
                              variant="outline-danger"
                              className="remove-btn"
                              onClick={() => handleAnswerRemove(index, answerIndex)}
                            >
                              <BsX size={15} />
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
                {
                  (enableButtons() && (question.type === 'checkbox' || question.type === 'multiple')) &&
                    <Form.Group className="ml-3">
                      <Button
                        variant="link"
                        onClick={() => handleAddAnswer(index)}
                        className="p-0"
                      >
                        <BsPlus size={15} /> {translate('question.add.more.answer')}
                      </Button>
                    </Form.Group>
                }
              </div>
            </Card.Body>
          </Card>
        ))
      }
      {enableButtons() &&
        <Form.Group className={'my-4'}>
          <Button
            variant="link"
            onClick={handleAddQuestion}
            className="p-0"
          >
            <BsPlusCircle size={20} /> {translate('questionnaire.new.question')}
          </Button>
        </Form.Group>
      }
    </>
  );
};

Question.propTypes = {
  translate: PropTypes.func,
  questions: PropTypes.array,
  setQuestions: PropTypes.func,
  language: PropTypes.string,
  questionTitleError: PropTypes.array,
  answerFieldError: PropTypes.array
};

export default withLocalize(Question);
