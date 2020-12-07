import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import {
  Row,
  Col,
  Card,
  Dropdown,
  DropdownButton,
  Form,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Dialog from 'components/Dialog';
import Pagination from 'components/Pagination';
import { deleteExercise, getExercises } from 'store/exercise/actions';
import * as ROUTES from 'variables/routes';

const Exercise = ({ translate }) => {
  const dispatch = useDispatch();
  const { exercises } = useSelector(state => state.exercise);
  const [deletedId, setDeletedId] = useState(null);
  const [show, setShow] = useState(false);
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    dispatch(getExercises({
      page_size: pageSize,
      page: currentPage
    })).then(result => {
      if (result) {
        setTotalCount(result.total_count);
      }
    });
  }, [currentPage, pageSize, dispatch]);

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
        <Col sm={5} md={4} lg={3}>
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
        <Col sm={7} md={8} lg={9}>
          { exercises.length === 0 && (
            <div className="card h-100 d-flex justify-content-center align-items-center">
              <big className="text-muted">{translate('common.no_data')}</big>
            </div>
          )}
          { exercises.length > 0 && (
            <>
              <Row>
                { exercises.map(exercise => (
                  <Col key={exercise.id} md={6} lg={3}>
                    <Card className="exercise-card shadow-sm mb-4">
                      <div className="card-img bg-light">
                        <div className="position-absolute w-100">
                          <DropdownButton className="float-right action" alignRight variant="outline-dark">
                            <Dropdown.Item as={Link} to={ROUTES.EXERCISE_EDIT.replace(':id', exercise.id)}>
                              {translate('common.edit')}
                            </Dropdown.Item>
                            <Dropdown.Item disabled={!exercise.can_delete} onClick={() => handleDelete(exercise.id)}>
                              {translate('common.delete')}
                            </Dropdown.Item>
                          </DropdownButton>
                        </div>
                        {
                          exercise.files.length > 0 && (
                            (exercise.files[0].fileType === 'audio/mpeg' &&
                              <div className="w-100">
                                <audio controls className="w-100">
                                  <source src={`${process.env.REACT_APP_API_BASE_URL}/file/${exercise.files[0].id}`} type="audio/ogg" />
                                </audio>
                              </div>
                            ) ||
                            (exercise.files[0].fileType === 'video/mp4' &&
                              <video controls className="w-100 h-100">
                                <source src={`${process.env.REACT_APP_API_BASE_URL}/file/${exercise.files[0].id}`} type="video/mp4" />
                              </video>
                            ) ||
                            ((exercise.files[0].fileType !== 'audio/mpeg' && exercise.files[0].fileType !== 'video/mp4') &&
                              <img className="card-img" src={`${process.env.REACT_APP_API_BASE_URL}/file/${exercise.files[0].id}`} alt="Exercise"
                              />
                            )
                          )
                        }
                      </div>
                      <Card.Body>
                        <Card.Title>
                          {
                            exercise.title.length <= 50
                              ? <h5 className="card-title">{ exercise.title }</h5>
                              : (
                                <OverlayTrigger
                                  overlay={<Tooltip id="button-tooltip-2">{ exercise.title }</Tooltip>}
                                >
                                  <h5 className="card-title">{ exercise.title }</h5>
                                </OverlayTrigger>
                              )
                          }
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Pagination
                totalCount={totalCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageSizes={[8, 16, 24, 32, 40]}
              />
            </>
          )}
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
