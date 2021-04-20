import React from 'react';
import Dialog from 'components/Dialog';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../../variables/routes';
import { withLocalize } from 'react-localize-redux';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UploadInfoDialog = ({ show, success, handleClose, info, translate }) => {
  const history = useHistory();

  const handleConfirm = () => {
    history.push(ROUTES.SERVICE_SETUP);
  };

  return (
    <Dialog
      show={show}
      title={translate('exercise.bulk_upload.upload_exercises')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={translate('exercise.bulk_upload.back_to_exercises')}
    >
      {success && (
        <>
          {!!info.new_records &&
            <Alert key="new-records" variant="success">
              {translate('exercise.bulk_upload.number_of_new_exercises', { number: info.new_records })}
            </Alert>
          }
          {!!info.updated_records &&
          <Alert key="updated-records" variant="success">
            {translate('exercise.bulk_upload.number_of_updated_exercises', { number: info.updated_records })}
          </Alert>
          }
        </>
      )}
      {!success && info.failures && (
        info.failures.map(item => (
          item.errors.map(error => (
            <Alert key="error" variant="danger">
              {translate(error, { row: item.row, sheet: info.sheet })}
            </Alert>
          ))
        )))}
    </Dialog>
  );
};

UploadInfoDialog.propTypes = {
  translate: PropTypes.func,
  show: PropTypes.bool,
  success: PropTypes.bool,
  handleClose: PropTypes.func,
  info: PropTypes.array
};

export default withLocalize(UploadInfoDialog);
