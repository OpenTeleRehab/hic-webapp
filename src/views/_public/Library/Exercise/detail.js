import React, { useEffect, useState } from 'react';
import { getTranslate } from 'react-localize-redux';
import { Button, Col, Image, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getExercise } from 'store/exercise/actions';
import { formatFileSize } from '../../../../utils/file';
import { replaceRoute } from '../../../../utils/route';
import * as ROUTES from '../../../../variables/routes';

const ExerciseDetail = () => {
  const localize = useSelector((state) => state.localize);
  const dispatch = useDispatch();
  const history = useHistory();
  const translate = getTranslate(localize);
  const { exercise } = useSelector(state => state.exercise);
  const { languages, activeLanguage } = useSelector((state) => state.language);
  const [mediaUploads, setMediaUploads] = useState([]);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [index, setIndex] = useState(0);
  const { id } = useParams();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (id) {
      const lang = languages.find((language) => language.code === activeLanguage);
      dispatch(getExercise(id, lang && lang.id));
    }
  }, [id, activeLanguage, dispatch, languages]);

  useEffect(() => {
    if (id && exercise.id) {
      setMediaUploads(exercise.files);
      setAdditionalFields(exercise.additional_fields);
    }
  }, [id, exercise]);

  // set page title
  useEffect(() => {
    if (exercise) {
      document.title = `${exercise.title} - ${process.env.REACT_APP_SITE_TITLE}`;
    }
  }, [exercise]);

  useEffect(() => {
    history.push(replaceRoute(ROUTES.LIBRARY_EXERCISE_DETAIL, activeLanguage).replace(':id', id));
  }, [activeLanguage, history, id]);

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
      <h1 className="text-primary font-weight-bold mb-3">{exercise.title}</h1>
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

            {
              mediaUploads.length === 0 && (
                <div className="exercise-img">
                  <div className="w-100 h-100 px-2 py-4 text-center d-flex justify-content-center exercise-header">
                    <img className="d-block w-50" src={'/images/exercise.svg'} alt='exercise' />
                  </div>
                </div>
              )
            }
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

          {exercise.auto_translated === true && (
            <div className="d-flex justify-content-end">
              <Image src="/images/google-translation.png" alt="text attribution" />
            </div>
          )}
        </Col>
        <Col sm={5} md={4}>
          <h5 className="text-primary mb-3">{translate('exercise.attachments')}</h5>
          { mediaUploads.map((mediaUpload, index) => (
            <>
              <Row key={index}>
                <Col sm={5}>
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
                <Col sm={7} className="pl-sm-0 mt-3 mt-sm-0">
                  <dl className="row no-gutters">
                    <dt className="col-6 pr-1">{translate('exercise.file_name')}:</dt>
                    <dd className="col-6 text-break">{mediaUpload.fileName.replace(/\.[^/.]+$/, '')}</dd>

                    <dt className="col-6 pr-1">{translate('exercise.file_size')}:</dt>
                    <dd className="col-6 text-break">{formatFileSize(mediaUpload.size)}</dd>

                    <dt className="col-6 pr-1">{translate('exercise.file_type')}:</dt>
                    <dd className="col-6 text-break">{translate(mediaUpload.fileGroupType)}</dd>
                  </dl>
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
      <Row className={activeLanguage === 'en' ? 'd-none' : 'mt-3'}>
        <Col>
          <Button className="w-100" size="sm">{translate('exercise.edit_translation')}</Button>
        </Col>
      </Row>
    </>
  );
};

export default ExerciseDetail;
