import React, { useEffect, useState } from 'react';
import { withLocalize } from 'react-localize-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import {
  getEducationMaterialBySlug
} from '../../../../store/educationMaterial/actions';
import { replaceRoute } from '../../../../utils/route';
import * as ROUTES from '../../../../variables/routes';

const EducationMaterialDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { educationMaterialBySlug } = useSelector(state => state.educationMaterial);
  const localize = useSelector((state) => state.localize);
  const { languages, activeLanguage } = useSelector(state => state.language);
  const translate = getTranslate(localize);
  const [materialFile, setMaterialFile] = useState(undefined);
  const { slug } = useParams();
  const [filePath, setFilePath] = useState('');

  useEffect(() => {
    if (slug) {
      const language = languages.find((language) => language.code === activeLanguage);
      dispatch(getEducationMaterialBySlug({ slug: slug }, language && language.id));
    }
  }, [languages, activeLanguage, dispatch, slug]);

  useEffect(() => {
    if (educationMaterialBySlug.id) {
      setMaterialFile(educationMaterialBySlug.file);
    }
  }, [educationMaterialBySlug]);

  // set page title
  useEffect(() => {
    if (educationMaterialBySlug) {
      document.title = `${educationMaterialBySlug.title} - ${process.env.REACT_APP_SITE_TITLE}`;
    }
  }, [educationMaterialBySlug]);

  useEffect(() => {
    if (materialFile !== undefined) {
      setFilePath(`${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`);
    }
  }, [materialFile]);

  const getMeta = (url) => {
    const img = new Image();
    img.src = url;
    return img;
  };

  return (
    <>
      <Helmet>
        <meta property="og:image" content={filePath} />
        <meta property="og:image:width" content={getMeta(filePath).width} />
        <meta property="og:image:height" content={getMeta(filePath).height} />
      </Helmet>
      <h1 className="text-primary font-weight-bold mb-3">{educationMaterialBySlug.title}</h1>
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
                <img src={materialFile.url || `${process.env.REACT_APP_API_BASE_URL}/file/${materialFile.id}`} alt="..." className="img-thumbnail"/>
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

          {educationMaterialBySlug.auto_translated === true && (
            <div className="d-flex justify-content-end">
              <img src="/images/google-translation.png" alt="text attribution" />
            </div>
          )}
        </Col>
      </Row>
      {activeLanguage !== 'en' &&
        <Row className="mt-3">
          <Col>
            <Button
              className="btn-block"
              size="sm"
              onClick={() => history.push(replaceRoute(ROUTES.EDUCATION_MATERIAL_EDIT_TRANSLATION.replace(':id', educationMaterialBySlug.id), activeLanguage))}
            >
              {translate('exercise.edit_translation')}
            </Button>
          </Col>
        </Row>
      }
    </>
  );
};

export default withLocalize(EducationMaterialDetail);
