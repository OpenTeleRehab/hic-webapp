import React, { useEffect, useState } from 'react';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';
import { useParams } from 'react-router-dom';
import { getEducationMaterial } from '../../../../store/educationMaterial/actions';

const EducationMaterialDetail = () => {
  const dispatch = useDispatch();
  const { educationMaterial } = useSelector(state => state.educationMaterial);
  const localize = useSelector((state) => state.localize);
  const { languages } = useSelector(state => state.language);
  const translate = getTranslate(localize);
  const [materialFile, setMaterialFile] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    const language = languages[0] && languages[0].id;
    if (id) {
      dispatch(getEducationMaterial(id, language));
    }
  }, [id, languages, dispatch]);

  useEffect(() => {
    if (id && educationMaterial.id) {
      setMaterialFile(educationMaterial.file);
    }
  }, [id, educationMaterial]);

  return (
    <>
      <h1 className="text-primary font-weight-bold mb-3">{educationMaterial.title}</h1>
      <Row>
        <Col sm={12} xl={12}>
          { materialFile ? (
            <div>
              { materialFile.fileType === 'audio/mpeg' &&
                <div className="img-thumbnail w-100 h-100 pt-2">
                  <audio controls className="w-100">
                    <source src={materialFile.url || `${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`} type="audio/ogg" />
                  </audio>
                </div>
              }

              { (materialFile.fileType !== 'audio/mpeg' && materialFile.fileType !== 'video/mp4' && materialFile.fileType !== 'application/pdf') &&
                <img src={materialFile.url || `${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`} alt="..." className="w-100 img-thumbnail"/>
              }

              { materialFile.fileType === 'video/mp4' &&
                <video className="w-100 img-thumbnail" controls>
                  <source src={materialFile.url || `${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`} type="video/mp4" />
                </video>
              }

              { materialFile.fileType === 'application/pdf' &&
                <object
                  data={materialFile.url || `${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`}
                  type="application/pdf"
                  height="678"
                  className="w-100"
                >
                  <iframe
                    src={materialFile.url || `${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`}
                    width="480"
                    height="678"
                    title={materialFile.fileName}
                  >
                    <p>This browser does not support PDF!</p>
                  </iframe>
                </object>
              }

              <Form.Text className="text-muted font-weight-bold mt-3">
                {translate(materialFile.fileGroupType)}:
                <a
                  href={`${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`}
                  /* eslint-disable-next-line react/jsx-no-target-blank */
                  target="_blank"
                  className="pl-2"
                >
                  {materialFile.fileName}
                </a>
              </Form.Text>
            </div>
          ) : (
            <div className="material-detail-file-wrapper">{translate('common.no_file_translate')}</div>
          )}
        </Col>
      </Row>
      <Row className="mt-4 d-none">
        <Col>
          <Button className="w-100" size="sm">{translate('exercise.edit_translation')}</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3 className="text-primary">{translate('exercise.related_resources')}</h3>
        </Col>
      </Row>
    </>
  );
};

export default withLocalize(EducationMaterialDetail);
