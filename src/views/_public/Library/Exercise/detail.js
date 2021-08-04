import React, { useEffect, useState } from 'react';
import { getTranslate } from 'react-localize-redux';
import { Button, Col, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getExercise } from 'store/exercise/actions';

const ExerciseDetail = () => {
  const localize = useSelector((state) => state.localize);
  const dispatch = useDispatch();
  const translate = getTranslate(localize);
  const { exercise } = useSelector(state => state.exercise);
  const { languages } = useSelector(state => state.language);
  const [mediaUploads, setMediaUploads] = useState([]);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [index, setIndex] = useState(0);
  const { id } = useParams();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const language = languages[0] && languages[0].id;
    if (id) {
      dispatch(getExercise(id, language));
    }
  }, [id, languages, dispatch]);

  useEffect(() => {
    if (id && exercise.id) {
      setMediaUploads(exercise.files);
      setAdditionalFields(exercise.additional_fields);
    }
  }, [id, exercise]);

  const handleDownload = async (event, fileName, fileUrl) => {
    event.preventDefault();
    const response = await fetch(fileUrl);
    if (response.status === 200) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { success: true };
    }
  };

  return (
    <>
      <div className="mb-2 d-flex justify-content-center">
        <h3 className="text-primary font-weight-bold">{exercise.title}</h3>
      </div>
      <Row>
        <Col sm={7} md={8}>
          <Carousel activeIndex={index} onSelect={handleSelect} controls={mediaUploads.length > 1} indicators={mediaUploads.length > 1} className="view-exercise-carousel">
            { mediaUploads.map((mediaUpload, index) => (
              <Carousel.Item key={index}>
                { mediaUpload.fileType === 'audio/mpeg' &&
                  <div className="img-thumbnail w-100 pt-2 pl-5 pr-5 bg-light audio-wrapper">
                    <audio controls className="w-100 mt-4">
                      <source src={mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`} type="audio/ogg" />
                    </audio>
                  </div>
                }
                { (mediaUpload.fileType !== 'audio/mpeg' && mediaUpload.fileType !== 'video/mp4') &&
                  <img
                    className="d-block w-100"
                    src={mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`} alt="..."
                  />
                }

                { mediaUpload.fileType === 'video/mp4' &&
                  <video className="w-100 img-thumbnail" controls>
                    <source src={mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`} type="video/mp4" />
                  </video>
                }
              </Carousel.Item>
            ))}
          </Carousel>

          {exercise.sets > 0 && (
            <p className="mt-2">
              {translate('exercise.number_of_sets_and_reps', { sets: exercise.sets, reps: exercise.reps })}
            </p>
          )}

          <div className="mt-4">
            { additionalFields && additionalFields.map((additionalField, index) => (
              <div key={index}>
                <strong>{additionalField.field}</strong>
                <p style={{ whiteSpace: 'pre-wrap' }}>{additionalField.value}</p>
              </div>
            ))}
          </div>
        </Col>
        <Col sm={5} md={4}>
          <h5 className="text-primary">{translate('exercise.attachments')}</h5>
          { mediaUploads.map((mediaUpload, index) => (
            <>
              <Row key={index}>
                <Col sm={6} md={6}>
                  { mediaUpload.fileType === 'audio/mpeg' &&
                    <div className="img-thumbnail w-100 pt-2 pl-5 pr-5 bg-light audio-wrapper">
                      <audio controls className="w-100 mt-4">
                        <source src={mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`} type="audio/ogg" />
                      </audio>
                    </div>
                  }
                  { (mediaUpload.fileType !== 'audio/mpeg' && mediaUpload.fileType !== 'video/mp4') &&
                    <img
                      className="d-block w-100"
                      src={mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`} alt="..."
                    />
                  }
                  { mediaUpload.fileType === 'video/mp4' &&
                    <video className="w-100 img-thumbnail" controls>
                      <source src={mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`} type="video/mp4" />
                    </video>
                  }
                </Col>
                <Col sm={6} md={6}>
                  <Row>
                    <Col sm={6} md={6} className="p-0"><strong>{translate('exercise.file_name')}:</strong></Col>
                    <Col sm={6} md={6} className="p-0" style={{ wordWrap: 'break-word' }}>{mediaUpload.fileName.replace(/\.[^/.]+$/, '')}</Col>
                  </Row>
                  <Row>
                    <Col sm={6} md={6} className="p-0"><strong>{translate('exercise.file_size')}:</strong></Col>
                    <Col sm={6} md={6} className="p-0">{mediaUpload.fileSize || 0}</Col>
                  </Row>
                  <Row>
                    <Col sm={6} md={6} className="p-0"><strong>{translate('exercise.file_type')}:</strong></Col>
                    <Col sm={6} md={6} className="p-0">{mediaUpload.fileType}</Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mb-3 mt-3">
                <Col>
                  <Button className="w-100" size="sm" onClick={(event) => handleDownload(event, mediaUpload.fileName, mediaUpload.url || `${process.env.REACT_APP_API_BASE_URL}/file/${mediaUpload.id}`)}>{translate('exercise.attachment.download')}</Button>
                </Col>
              </Row>
            </>
          ))}
        </Col>
      </Row>
      <Row className="mt-3 d-none">
        <Col>
          <Button className="w-100" size="sm">{translate('exercise.edit_translation')}</Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h3 className="text-primary">{translate('exercise.related_resources')}</h3>
        </Col>
      </Row>
    </>
  );
};

export default ExerciseDetail;
