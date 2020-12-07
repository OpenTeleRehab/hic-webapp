import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsUpload, BsXCircle } from 'react-icons/bs';

import * as ROUTES from 'variables/routes';
import {
  createExercise,
  getExercise,
  updateExercise
} from 'store/exercise/actions';

const CreateExercise = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { exercise } = useSelector(state => state.exercise);
  const [formFields, setFormFields] = useState({
    title: '',
    include_feedback: true
  });
  const [titleError, setTitleError] = useState(false);
  const [mediaUploads, setMediaUploads] = useState([]);
  const [mediaUploadsError, setMediaUploadsError] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getExercise(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && exercise.id) {
      setFormFields({
        title: exercise.title,
        include_feedback: exercise.include_feedback
      });
      setMediaUploads(exercise.files);
    }
  }, [id, exercise]);

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

    if (mediaUploads.length === 0) {
      canSave = false;
      setMediaUploadsError(true);
    } else {
      setMediaUploadsError(false);
    }

    if (canSave) {
      if (id) {
        dispatch(updateExercise(id, formFields, mediaUploads))
          .then(result => {
            if (result) {
              history.push(ROUTES.SERVICE_SETUP);
            }
          });
      } else {
        dispatch(createExercise(formFields, mediaUploads))
          .then(result => {
            if (result) {
              history.push(ROUTES.SERVICE_SETUP);
            }
          });
      }
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileObj = [];
    fileObj.push(files);
    let i;
    for (i = 0; i < fileObj[0].length; i++) {
      const file = fileObj[0][i];
      const fileName = file.name;
      const fileSize = Math.round((file.size / 1024), 2);
      const fileType = file.type;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        mediaUploads.push({ url: reader.result, fileName, fileSize, fileType, file });
        setMediaUploads([...mediaUploads]);
      };
    }
  };
  const handleFileRemove = (index) => {
    const mediaFiles = mediaUploads;
    if (index !== -1) {
      mediaFiles.splice(index, 1);
      setMediaUploads([...mediaFiles]);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{id ? translate('exercise.edit') : translate('exercise.create')}</h1>
      </div>

      <Form>
        {
          !id && (
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
          )
        }

        <Row>
          <Col sm={4} xl={3}>
            <div className="exercise-media ">
              <h4>{translate('exercise.media')}</h4>
              { mediaUploads.map((mediaUpload, index) => (
                <div key={index} className="mb-2 position-relative w-75" >
                  <div className="position-absolute remove-btn-wrapper">
                    <BsXCircle size={20} onClick={() => handleFileRemove(index)}/>
                  </div>

                  { mediaUpload.fileType === 'audio/mpeg' &&
                    <div className="img-thumbnail w-100 pt-2">
                      <audio controls className="w-100">
                        <source src={mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`} type="audio/ogg" />
                      </audio>
                    </div>
                  }

                  { (mediaUpload.fileType !== 'audio/mpeg' && mediaUpload.fileType !== 'video/mp4') &&
                    <img src={mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`} alt="..." className="w-100 img-thumbnail"/>
                  }

                  { mediaUpload.fileType === 'video/mp4' &&
                    <video className="w-100 img-thumbnail" controls>
                      <source src={mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`} type="video/mp4" />
                    </video>
                  }
                  <div>{mediaUpload.fileName} {mediaUpload.fileSize ? ('(' + mediaUpload.fileSize + 'kB )') : ''}</div>
                </div>
              ))}
              <div className="btn btn-sm bg-white btn-outline-primary text-primary position-relative overflow-hidden" >
                <BsUpload size={15}/> Upload Image
                <input type="file" name="file" className="position-absolute upload-btn" onChange={handleFileChange} multiple accept=".gif, .jpeg, .png, .mp3, .mp4" />
              </div>
              { mediaUploadsError &&
                <div className="text-danger">{translate('exercise.media_upload.required')}</div>
              }
            </div>
          </Col>
          <Col sm={6} xl={4}>
            <Form.Group controlId="formLanguage">
              <Form.Label>Showing language version</Form.Label>
              <Form.Control as="select">
                <option>English (default)</option>
              </Form.Control>
            </Form.Group>
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
                checked={formFields.include_feedback}
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
