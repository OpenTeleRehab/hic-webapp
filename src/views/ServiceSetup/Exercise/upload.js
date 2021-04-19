import React, { useState } from 'react';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { formatFileSize, toMB } from '../../../utils/file';
import settings from '../../../settings';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../../../variables/routes';
import { BsDownload } from 'react-icons/bs';
import { TEMPLATE_URL } from 'variables/exercises';
import { uploadExercises } from 'store/exercise/actions';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const UploadExercise = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { maxFileSize } = settings.educationMaterial;
  const [file, setFile] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState(false);

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFile(files[0]);
  };

  const renderUploadFileName = () => {
    if (file) {
      return `${file.name} (${formatFileSize(file.size)})`;
    }
    return translate('exercise.bulk_upload.file.placeholder');
  };

  const handleUpload = () => {
    let canSave = true;

    if ((file === undefined || toMB(file.size) > maxFileSize)) {
      canSave = false;
      setFileError(true);
    } else {
      setFileError(false);
    }

    if (canSave) {
      dispatch(uploadExercises({
        file
      }))
        .then(result => {
          if (result) {
            history.push(ROUTES.SERVICE_SETUP);
          }
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Group controlId="formFile">
            <Form.Label>{translate('exercise.bulk_upload.instruction')}</Form.Label>
            <span className="text-dark ml-1">*</span>
            <Row>
              <Col sm={6} xl={5}>
                <Form.File custom>
                  <Form.File.Input
                    name='file'
                    onChange={handleFileChange}
                    isInvalid={fileError}
                    accept=".csv"
                  />
                  <Form.File.Label>{renderUploadFileName()}</Form.File.Label>
                  <Form.Control.Feedback type="invalid">
                    {file === undefined
                      ? translate('exercise.bulk_upload.file.required')
                      : translate('exercise.bulk_upload.file.max_size', { size: maxFileSize })
                    }
                  </Form.Control.Feedback>
                </Form.File>
              </Col>
              <Col sm={6} xl={5}>
                <Button
                  variant="link"
                  download
                  href={TEMPLATE_URL.EXERCISE}
                >
                  <BsDownload className="mr-3" size={30} />
                  {translate('exercise.bulk_upload.download_template')}
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={5}>
          <Form.Group>
            <Button
              onClick={handleUpload}
              disabled={isLoading}
            >
              {translate('common.save')}
            </Button>
            <Button
              className="ml-2"
              variant="outline-dark"
              as={Link}
              to={ROUTES.SERVICE_SETUP}
              disabled={isLoading}
            >
              {translate('common.cancel')}
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

UploadExercise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(UploadExercise);
