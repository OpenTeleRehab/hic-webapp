import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ReviewSubmissionModal = ({ translate }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{translate('exercise.review.modal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleClose}>
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
  translate: PropTypes.func
};

export default ReviewSubmissionModal;
