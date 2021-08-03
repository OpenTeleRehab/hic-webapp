import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ContextAwareToggle } from '../../../../components/Accordion/ContextAwareToggle';

const ReviewSubmissionModal = ({ translate, showReviewModal }) => {
  const handleClose = () => showReviewModal(false);
  const [formFields, setFormFields] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [agreeTermsAndCondition, setAgreeTermsAndCondition] = useState(false);
  const [agreeToInclude, setAgreeToInclude] = useState(false);
  const exercises = [{ id: 1, title: 'hello 1' }, { id: 2, title: 'hello' }];

  const handleTermsConditionCheck = (e) => {
    setAgreeTermsAndCondition(e.target.checked);
  };

  const handleIncludeCheck = (e) => {
    setAgreeToInclude(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = () => {
    let canSubmit = true;

    if (formFields.first_name === '') {
      canSubmit = false;
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }

    if (formFields.last_name === '') {
      canSubmit = false;
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }

    if (formFields.email === '') {
      canSubmit = false;
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (canSubmit) {
      // TODO: call the action
    }
  };

  return (
    <Modal
      size="lg"
      show={true}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate('exercise.review.modal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0" className="d-flex justify-content-between align-items-center">
                <span>{translate('library.exercises')}</span>
                <span>{exercises.length} {translate('common.items')} <ContextAwareToggle eventKey="0" /></span>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {exercises.map((exercise, index) => (
                  <Form.Group key={index} as={Row}>
                    <Col>
                      <Form.Check
                        key={index}
                        type={'checkbox'}
                        id={`exercise-${exercise.id}`}
                        label={exercise.title}
                        custom
                      />
                    </Col>
                    <Col className="text-right">
                      <Button variant="link" className="text-decoration-none">{translate('common.edit')}</Button>
                    </Col>
                  </Form.Group>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <h6 className="mt-3 font-weight-bold">{translate('contribute.submission.total_selected_resource', { number: 2 })}</h6>
        <h6 className="text-primary mt-2">{translate('contribute.submission.enter_your_detail')}</h6>
        <Form.Group controlId="formName" as={Row}>
          <Col>
            <Form.Label>{translate('common.first_name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="firstName"
              type="text"
              placeholder={translate('placeholder.first_name')}
              value={formFields.first_name}
              isInvalid={firstNameError}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.first_name')}
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Label>{translate('common.last_name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="lastName"
              type="text"
              placeholder={translate('placeholder.last_name')}
              value={formFields.last_name}
              isInvalid={lastNameError}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.last_name')}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group controlId="formEmail" as={Row}>
          <Col xs={6} md={6}>
            <Form.Label>{translate('common.email')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="email"
              type="email"
              placeholder={translate('placeholder.email')}
              value={formFields.email}
              isInvalid={emailError}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.email')}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group controlId="formTermsCondition">
          <Form.Check
            type="checkbox"
            value={agreeTermsAndCondition}
            checked={agreeTermsAndCondition}
            label={translate('contribute.agree_term_condition')}
            custom
            onChange={handleTermsConditionCheck}
          />
        </Form.Group>
        <Form.Group controlId="formIncludeInContributorsList">
          <Form.Check
            type="checkbox"
            value={agreeToInclude}
            label={translate('contribute.agree_include_in_contributors_list')}
            custom
            onChange={handleIncludeCheck}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleSubmit} disabled={!agreeTermsAndCondition}>
          {translate('common.submit')}
        </Button>
        <Button variant="outline-primary" onClick={handleClose}>
          {translate('common.cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ReviewSubmissionModal.propTypes = {
  translate: PropTypes.func,
  showReviewModal: PropTypes.func
};

export default ReviewSubmissionModal;
