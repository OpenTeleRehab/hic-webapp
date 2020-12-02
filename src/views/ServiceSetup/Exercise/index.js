import React, { useEffect, useState } from 'react';
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

import Dialog from 'components/Dialog';
import { deleteExercise, getExercises } from 'store/exercise/actions';

const Exercise = ({ translate }) => {
  const dispatch = useDispatch();
  const { exercises } = useSelector(state => state.exercise);
  const [deletedId, setDeletedId] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeletedId(id);
    setShow(true);
  };

  const handleClose = () => {
    setDeletedId(null);
    setShow(false);
  };

  const handleConfirm = () => {
    dispatch(deleteExercise(deletedId)).then(result => {
      if (result) {
        handleClose();
      }
    });
  };

  return (
    <>
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
              <Card key={exercise.id} className="exercise-card shadow-sm">
                <div className="card-img bg-light">
                  <DropdownButton className="float-right" alignRight variant="outline-dark">
                    <Dropdown.Item onClick={() => console.log('click!')}>Edit</Dropdown.Item>
                    <Dropdown.Item disabled={!exercise.can_delete} onClick={() => handleDelete(exercise.id)}>Delete</Dropdown.Item>
                  </DropdownButton>
                  <div className="d-none">TODO: Show image</div>
                </div>
                <Card.Body>
                  <Card.Title>
                    <h5>{exercise.title}</h5>
                  </Card.Title>
                </Card.Body>
              </Card>
            ))}
          </CardColumns>
        </Col>
      </Row>

      <Dialog
        show={show}
        title={translate('exercise.delete_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handleClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handleConfirm}
      >
        <p>{translate('common.delete_confirmation_message')}</p>
      </Dialog>
    </>
  );
};

Exercise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Exercise);
