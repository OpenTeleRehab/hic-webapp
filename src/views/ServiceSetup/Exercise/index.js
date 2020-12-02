import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import {
  Row,
  Col,
  CardColumns,
  Card,
  Dropdown,
  DropdownButton,
  Form
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getExercises } from 'store/exercise/actions';

const Exercise = ({ translate }) => {
  const dispatch = useDispatch();
  const { exercises } = useSelector(state => state.exercise);

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  return (
    <Row>
      <Col sm={3}>
        <Card
          bg="info"
          text="white"
        >
          <Card.Header>
            <Form.Control placeholder="Search exercise" />
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select">
                <option>Category Item</option>
                <option>Category Item</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select">
                <option>Category Item</option>
                <option>Category Item</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select">
                <option>Category Item</option>
                <option>Category Item</option>
              </Form.Control>
            </Form.Group>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={9}>
        <CardColumns>
          { exercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </CardColumns>
      </Col>
    </Row>
  );
};

Exercise.propTypes = {
  translate: PropTypes.func
};

const ExerciseCard = ({ exercise }) => {
  return (
    <Card className="exercise-card shadow-sm">
      <div className="card-img bg-light">
        <DropdownButton className="float-right" alignRight variant="outline-dark">
          <Dropdown.Item onClick={() => console.log('click!')}>Edit</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
        </DropdownButton>
        <div className="d-none">TODO: Show image</div>
      </div>
      <Card.Body>
        <Card.Title>
          <h5>{exercise.title}</h5>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.object
};

export default withLocalize(Exercise);
