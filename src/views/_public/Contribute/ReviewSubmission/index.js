import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ContextAwareToggle } from 'components/Accordion/ContextAwareToggle';
import { useDispatch, useSelector } from 'react-redux';
import {
  contributeExercise
} from '../../../../store/exercise/actions';
import {
  contributeSubmission,
  clearContribute,
  deleteExercise,
  deleteEducationMaterial,
  deleteQuestionnaire
} from '../../../../store/contribute/actions';
import { showSpinner } from '../../../../store/spinnerOverlay/actions';
import {
  contributeEducationMaterial
} from '../../../../store/educationMaterial/actions';
import {
  contributeQuestionnaire
} from '../../../../store/questionnaire/actions';
import { toHash } from '../../../../utils/hash';
import moment from 'moment';
import * as ROUTES from '../../../../variables/routes';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { replaceRoute } from 'utils/route';
import { LIBRARY_TYPES } from '../../../../variables/library';
import validateEmail from 'utils/validateEmail';

const ReviewSubmissionModal = ({ translate, editItem, showReviewModal, showConfirmSubmissionModal, showConfirmTranslationSubmissionModal, resourceType }) => {
  const dispatch = useDispatch();
  const { hash, pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const handleClose = () => showReviewModal(false);
  const [formFields, setFormFields] = useState({
    first_name: '',
    last_name: '',
    email: '',
    hash: toHash((Math.random() + 1).toString(36).substring(7) + '-' + moment().format('DD-MM-yyyy-h:mm:ss-a'))
  });
  const { exercises, educationMaterials, questionnaires } = useSelector((state) => state.contribute);
  const { activeLanguage } = useSelector((state) => state.language);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [agreeTermsAndCondition, setAgreeTermsAndCondition] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedEducationMaterials, setSelectedEducationMaterials] = useState([]);
  const [selectedQuestionnaires, setSelectedQuestionnaires] = useState([]);
  const { profile } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    exercises.forEach((exercise, index) => {
      selectedExercises.push(index);
    });
    setSelectedExercises([...selectedExercises]);
    // eslint-disable-next-line
  }, [exercises]);

  useEffect(() => {
    if (profile !== undefined) {
      setFormFields({ ...formFields, first_name: profile.first_name, last_name: profile.last_name, email: profile.email });
      setIsAdmin(true);
      setAgreeTermsAndCondition(true);
    }
    // eslint-disable-next-line
  }, [profile])

  useEffect(() => {
    educationMaterials.forEach((educationMaterial, index) => {
      selectedEducationMaterials.push(index);
    });
    setSelectedEducationMaterials([...selectedEducationMaterials]);
    // eslint-disable-next-line
  }, [educationMaterials]);

  useEffect(() => {
    questionnaires.forEach((questionnaire, index) => {
      selectedQuestionnaires.push(index);
    });
    setSelectedQuestionnaires([...selectedQuestionnaires]);
    // eslint-disable-next-line
  }, [questionnaires]);

  const totalSelectedResourceItem = () => {
    return selectedExercises.length + selectedEducationMaterials.length + selectedQuestionnaires.length;
  };

  const handleTermsConditionCheck = (e) => {
    setAgreeTermsAndCondition(e.target.checked);
  };

  const handleIncludeCheck = (e) => {
    const { name, checked } = e.target;
    setFormFields({ ...formFields, [name]: checked });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSelectExercises = (e, selectedIndex) => {
    if (e.target.checked) {
      setSelectedExercises([...selectedExercises, selectedIndex]);
    } else {
      const exercises = selectedExercises.filter(a => a !== selectedIndex);
      setSelectedExercises(exercises);
    }
  };

  const handleSelectEducationMaterials = (e, selectedIndex) => {
    if (e.target.checked) {
      setSelectedEducationMaterials([...selectedEducationMaterials, selectedIndex]);
    } else {
      const educationMaterials = selectedEducationMaterials.filter(a => a !== selectedIndex);
      setSelectedEducationMaterials(educationMaterials);
    }
  };

  const handleSelectQuestionnaires = (e, selectedIndex) => {
    if (e.target.checked) {
      setSelectedQuestionnaires([...selectedQuestionnaires, selectedIndex]);
    } else {
      const questionnaires = selectedQuestionnaires.filter(a => a !== selectedIndex);
      setSelectedQuestionnaires(questionnaires);
    }
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

    if (formFields.email === '' || !validateEmail(formFields.email)) {
      canSubmit = false;
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (canSubmit) {
      dispatch(showSpinner(true));
      const submitExercises = exercises.filter((exercises, index) => selectedExercises.includes(index));
      const submitEducationMaterials = educationMaterials.filter((educationMaterial, index) => selectedEducationMaterials.includes(index));
      const submitQuestionnaires = questionnaires.filter((questionnaire, index) => selectedQuestionnaires.includes(index));

      if (submitExercises.length) {
        dispatch(contributeExercise(submitExercises, formFields)).then(result => {
          if (result) {
            dispatch(deleteExercise());
          }
        });
      }

      if (submitEducationMaterials.length) {
        dispatch(contributeEducationMaterial(submitEducationMaterials, formFields)).then(result => {
          if (result) {
            dispatch(deleteEducationMaterial());
          }
        });
      }

      if (submitQuestionnaires.length) {
        dispatch(contributeQuestionnaire(submitQuestionnaires, formFields)).then(result => {
          if (result) {
            dispatch(deleteQuestionnaire());
          }
        });
      }

      if (submitExercises.length || submitEducationMaterials.length || submitQuestionnaires.length) {
        if (id) {
          dispatch(clearContribute());
          dispatch(showSpinner(false));
          showReviewModal(false);
          showConfirmTranslationSubmissionModal(true);
        } else {
          dispatch(contributeSubmission(formFields)).then(result => {
            if (result) {
              dispatch(clearContribute());
              dispatch(showSpinner(false));
              showReviewModal(false);
              showConfirmSubmissionModal(true);
            }
          });
        }
      }

      if (hash.includes('#' + LIBRARY_TYPES.MATERIAL) || pathname.includes(LIBRARY_TYPES.MATERIAL)) {
        resourceType(LIBRARY_TYPES.MATERIAL);
      } else if (hash.includes('#' + LIBRARY_TYPES.QUESTIONNAIRE) || pathname.includes(LIBRARY_TYPES.QUESTIONNAIRE)) {
        resourceType(LIBRARY_TYPES.QUESTIONNAIRE);
      } else {
        resourceType(LIBRARY_TYPES.EXERCISE);
      }
    }
  };

  const handleEditResource = (item, type) => {
    editItem(item);
    showReviewModal(false);
    history.push(replaceRoute(ROUTES.CONTRIBUTE, activeLanguage) + '#' + type);
  };

  return (
    <Modal
      size="lg"
      show={true}
      onHide={handleClose}
    >
      <Modal.Body>
        {!id &&
          <>
            <h6 className="text-primary mt-2 mb-3">{translate('exercise.review.modal.title')}</h6>
            <Accordion className="mb-1">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0" className="d-flex justify-content-between align-items-center" disabled={ exercises.length === 0 }>
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
                            id={`exercise-${index}`}
                            label={exercise.title}
                            custom
                            onChange={(e) => handleSelectExercises(e, index)}
                            checked={selectedExercises.includes(index)}
                          />
                        </Col>
                        <Col className="text-right">
                          <Button
                            variant="link"
                            className="text-decoration-none p-0"
                            onClick={() => handleEditResource(exercise, 'exercise')}
                          >
                            {translate('common.edit')}
                          </Button>
                        </Col>
                      </Form.Group>
                    ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1" className="d-flex justify-content-between align-items-center" disabled={ educationMaterials.length === 0 }>
                    <span>{translate('library.education_materials')}</span>
                    <span>{educationMaterials.length} {translate('common.items')} <ContextAwareToggle eventKey="1" /></span>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    {educationMaterials.map((educationMaterial, index) => (
                      <Form.Group key={index} as={Row}>
                        <Col>
                          <Form.Check
                            key={index}
                            type={'checkbox'}
                            id={`education-${index}`}
                            label={educationMaterial.title}
                            custom
                            onChange={(e) => handleSelectEducationMaterials(e, index)}
                            checked={selectedEducationMaterials.includes(index)}
                          />
                        </Col>
                        <Col className="text-right">
                          <Button
                            variant="link"
                            className="text-decoration-none p-0"
                            onClick={() => handleEditResource(educationMaterial, 'education')}
                          >
                            {translate('common.edit')}
                          </Button>
                        </Col>
                      </Form.Group>
                    ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2" className="d-flex justify-content-between align-items-center" disabled={ questionnaires.length === 0 }>
                    <span>{translate('library.questionnaires')}</span>
                    <span>{questionnaires.length} {translate('common.items')} <ContextAwareToggle eventKey="2" /></span>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    {questionnaires.map((questionnaire, index) => (
                      <Form.Group key={index} as={Row}>
                        <Col>
                          <Form.Check
                            key={index}
                            type={'checkbox'}
                            id={`questionnaire-${index}`}
                            label={questionnaire.title}
                            custom
                            onChange={(e) => handleSelectQuestionnaires(e, index)}
                            checked={selectedQuestionnaires.includes(index)}
                          />
                        </Col>
                        <Col className="text-right">
                          <Button
                            variant="link"
                            className="text-decoration-none p-0"
                            onClick={() => handleEditResource(questionnaire, 'questionnaire')}
                          >
                            {translate('common.edit')}
                          </Button>
                        </Col>
                      </Form.Group>
                    ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <p className="mt-3"><strong>{translate('contribute.submission.total_selected_resource', { number: totalSelectedResourceItem() })}</strong></p>
          </>
        }
        <h6 className="text-primary mt-2 mb-3">{translate('contribute.submission.enter_your_detail')}</h6>
        <Form.Group controlId="formName" as={Row}>
          <Col>
            <Form.Label>{translate('common.first_name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="first_name"
              type="text"
              placeholder={translate('placeholder.first_name')}
              value={formFields.first_name}
              isInvalid={firstNameError}
              onChange={handleChange}
              disabled={isAdmin}
            />
            <Form.Control.Feedback type="invalid">
              {translate('error.first_name')}
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Label>{translate('common.last_name')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Form.Control
              name="last_name"
              type="text"
              placeholder={translate('placeholder.last_name')}
              value={formFields.last_name}
              isInvalid={lastNameError}
              onChange={handleChange}
              disabled={isAdmin}
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
              disabled={isAdmin}
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
            name="included_in_acknowledgment"
            value={formFields.included_in_acknowledgment}
            label={translate('contribute.agree_include_in_contributors_list')}
            custom
            onChange={handleIncludeCheck}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleSubmit} disabled={!agreeTermsAndCondition || totalSelectedResourceItem() === 0}>
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
  editItem: PropTypes.func,
  showReviewModal: PropTypes.func,
  showConfirmSubmissionModal: PropTypes.func,
  showConfirmTranslationSubmissionModal: PropTypes.func,
  resourceType: PropTypes.func
};

export default ReviewSubmissionModal;
