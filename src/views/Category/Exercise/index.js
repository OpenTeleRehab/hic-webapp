import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button } from 'react-bootstrap';
import Create from '../_Patials/Create';
import { CATEGORY_TYPES } from 'variables/category';

const Exercise = ({ translate }) => {
  const [editId, setEditId] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setEditId('');
    setShow(false);
  };
  return (
    <>
      {translate('exercise')}
      <Button onClick={() => setShow(true)}>
        Create
      </Button>
      {show && <Create show={show} editId={editId} handleClose={handleClose} type={CATEGORY_TYPES.EXERCISE} />}
    </>
  );
};

Exercise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Exercise);
