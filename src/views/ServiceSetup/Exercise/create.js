import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as ROUTES from 'variables/routes';
import { createExercise } from 'store/exercise/actions';

const CreateExercise = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formFields, setFormFields] = useState({
    title: '',
    include_feedback: true
  });

  const [titleError, setTitleError] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleCheck = e => {
    const { name, checked } = e.target;
    setFormFields({ ...formFields, [name]: checked });
  };

  const handleSave = () => {
    let canSave = true;

    if (formFields.title === '') {
      canSave = false;
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (canSave) {
      dispatch(createExercise(formFields))
        .then(result => {
          if (result) {
            history.push(ROUTES.SERVICE_SETUP);
          }
        });
    }
  };

  console.log('===', formFields.include_feedback);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{translate('exercise.create')}</h1>
      </div>

      <Form>
        <Form.Group as={Row}>
          <Col sm={4} lg={3} xl={2}>
            <Form.Check
              name="option"
              // onChange={handleChange}
              value={1}
              defaultChecked
              type="radio"
              label={translate('exercise.single_upload')}
              id="formSingleOption"
            />
          </Col>
          <Col>
            <Form.Check
              name="option"
              // onChange={handleChange}
              value={2}
              type="radio"
              label={translate('exercise.bulk_upload')}
              id="formBulkOption"
            />
          </Col>
        </Form.Group>

        <Row>
          <Col sm={4} xl={3}>
            <h4>{translate('exercise.media')}</h4>
          </Col>
          <Col sm={6} xl={4}>
            <h4>{translate('exercise.information')}</h4>
            <Form.Group controlId="formTitle">
              <Form.Label>{translate('exercise.title')}</Form.Label>
              <span className="text-dark ml-1">*</span>
              <Form.Control
                name="title"
                onChange={handleChange}
                value={formFields.title}
                placeholder={translate('exercise.title.placeholder')}
                isInvalid={titleError}
              />
              <Form.Control.Feedback type="invalid">
                {translate('exercise.title.required')}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formIncludeFeedback">
              <Form.Check
                name="include_feedback"
                onChange={handleCheck}
                value={true}
                defaultChecked
                label={translate('exercise.include_collecting_feedback')}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Aim</Form.Label>
              <Form.Control as="textarea" rows={3} disabled />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Instruction</Form.Label>
              <Form.Control as="textarea" rows={3} disabled />
            </Form.Group>

            <Form.Group>
              <Button
                onClick={handleSave}
              >
                {translate('common.save')}
              </Button>
              <Button
                className="ml-2"
                variant="outline-dark"
                as={Link}
                to={ROUTES.SERVICE_SETUP}
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

CreateExercise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(CreateExercise);
