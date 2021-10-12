import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from 'variables/routes';
import { Button, Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { replaceRoute } from '../../utils/route';
import { getStatistics } from '../../store/dashboard/actions';
import { getStaticPage } from '../../store/staticPage/actions';
import { PAGE_TYPES } from '../../variables/staticPage';
import { MATERIAL_TYPE } from '../../variables/activity';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const { activeLanguage, languages } = useSelector((state) => state.language);
  const { statistics } = useSelector((state) => state.dashboard);
  const { staticPage } = useSelector(state => state.staticPage);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  useEffect(() => {
    const lang = languages.find(language => language.code === activeLanguage);
    dispatch(getStaticPage({
      'url-segment': PAGE_TYPES.HOMEPAGE,
      lang: lang && lang.id
    }));
  }, [dispatch, activeLanguage, languages]);

  const handleViewDetail = (slug) => {
    history.push(replaceRoute(ROUTES.LIBRARY_EXERCISE_DETAIL, activeLanguage).replace(':slug', slug));
  };

  const handleViewQuestionnaireDetail = (slug) => {
    history.push(replaceRoute(ROUTES.LIBRARY_QUESTIONNAIRE_DETAIL, activeLanguage).replace(':slug', slug));
  };

  const handleViewMaterialDetail = (slug) => {
    history.push(replaceRoute(ROUTES.LIBRARY_EDUCATION_MATERIAL_DETAIL, activeLanguage).replace(':slug', slug));
  };

  const handleContributeResources = () => {
    history.push(replaceRoute(ROUTES.CONTRIBUTE, activeLanguage));
  };

  const handleViewLibrary = () => {
    history.push(replaceRoute(ROUTES.LIBRARY, activeLanguage));
  };

  return (
    <>
      <section className="section__wrapper">
        <Container>
          <h2 className="text-primary section__heading">{translate('dashboard.title')}</h2>
          { staticPage.homeData && staticPage.homeData.display_quick_stat === 1 && (
            <Row>
              <Col sm={12} md={4}>
                <Card bg={'primary'} text={'white'} className="stats-card">
                  <Card.Body>
                    <Card.Link href={replaceRoute(ROUTES.LIBRARY, activeLanguage)} className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                      <div className="icon">
                        <img src={'/images/stats-exercise-icon.svg'} alt={translate('resource.exercises')} width="58" />
                      </div>

                      <div className="total">
                        <h3>{translate('dashboard.total_exercises')}</h3>
                        <strong>{statistics.exercise && statistics.exercise.total}</strong>
                      </div>
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={12} md={4}>
                <Card bg={'primary'} text={'white'} className="stats-card">
                  <Card.Body>
                    <Card.Link href={replaceRoute(ROUTES.LIBRARY_EDUCATION, activeLanguage)} className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                      <div className="icon">
                        <img src={'/images/stats-education-material-icon.svg'} alt={translate('resource.education_materials')} width="58" />
                      </div>

                      <div className="total">
                        <h3>{translate('dashboard.total_education_materials')}</h3>
                        <strong>{statistics.education && statistics.education.total}</strong>
                      </div>
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={12} md={4}>
                <Card bg={'primary'} text={'white'} className="stats-card">
                  <Card.Body>
                    <Card.Link href={replaceRoute(ROUTES.LIBRARY_QUESTIONNAIRE, activeLanguage)} className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                      <div className="icon">
                        <img src={'/images/stats-questionnaire-icon.svg'} alt={translate('resource.questionnaires')} width="58" />
                      </div>

                      <div className="total">
                        <h3>{translate('dashboard.total_questionnaires')}</h3>
                        <strong>{statistics.questionnaire && statistics.questionnaire.total}</strong>
                      </div>
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          <Row className="mt-5 justify-content-center home-resource-wrapper">
            { staticPage.homeData && staticPage.homeData.display_feature_resource === 1 && staticPage.homeData.featured_resources.exercises !== undefined && staticPage.homeData.featured_resources.exercises.map(exercise => (
              <Col key={exercise.id} md={6} lg={4} xl={window.screen.width >= 2020 && 2} className="card-wrapper">
                <Card className="exercise-card shadow-sm mb-4" onClick={() => handleViewDetail(exercise.slug)}>
                  <div className="card-img bg-light">
                    {
                      exercise.files.length > 0 && (
                        (exercise.files[0].fileType === 'audio/mpeg' &&
                          <div className="w-100 pt-5 pl-3 pr-3" onContextMenu={(e) => e.preventDefault()}>
                            <audio controls className="w-100">
                              <source src={`${process.env.REACT_APP_API_BASE_URL}/file/${exercise.files[0].id}`} type="audio/ogg" />
                            </audio>
                          </div>
                        ) ||
                        (exercise.files[0].fileType === 'video/mp4' &&
                          <img onContextMenu={(e) => e.preventDefault()} className="img-fluid mx-auto d-block" src={`${process.env.REACT_APP_API_BASE_URL}/file/${exercise.files[0].id}?thumbnail=1`} alt="Exercise"
                          />
                        ) ||
                        ((exercise.files[0].fileType !== 'audio/mpeg' && exercise.files[0].fileType !== 'video/mp4') &&
                          <img onContextMenu={(e) => e.preventDefault()} className="img-fluid mx-auto d-block" src={`${process.env.REACT_APP_API_BASE_URL}/file/${exercise.files[0].id}`} alt="Exercise"
                          />
                        )
                      )
                    }
                    {
                      exercise.files.length === 0 && (
                        <div onContextMenu={(e) => e.preventDefault()} className="w-100 h-100 px-2 py-4 text-center d-flex justify-content-center exercise-header">
                          <img src={'/images/exercise.svg'} alt='exercise' />
                        </div>
                      )
                    }
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
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
                    {exercise.sets > 0 && (
                      <Card.Text>
                        {translate('exercise.number_of_sets_and_reps', { sets: exercise.sets, reps: exercise.reps })}
                      </Card.Text>
                    )}
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="link" className="text-decoration-none">{translate('exercise.learn_more')}</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
            { staticPage.homeData && staticPage.homeData.display_feature_resource === 1 && staticPage.homeData.featured_resources.education_materials !== undefined && staticPage.homeData.featured_resources.education_materials.map(material => (
              <Col key={material.id} md={6} lg={4} xl={window.screen.width >= 2020 && 2} className="card-wrapper">
                <Card className="exercise-card shadow-sm mb-4" onClick={() => handleViewMaterialDetail(material.slug)}>
                  <div className="card-img bg-light">
                    {(material.file && (material.file.hasThumbnail || material.file.fileGroupType === MATERIAL_TYPE.image)) ? (
                      <img
                        className="img-fluid mx-auto d-block"
                        src={`${process.env.REACT_APP_API_BASE_URL}/file/${material.file.id}?thumbnail=${material.file.hasThumbnail}`}
                        alt="Material"
                      />
                    ) : (
                      <div className="w-100 h-100 px-2 py-4 text-white bg-primary text-center">
                        <img src={'/images/education-material-icon.svg'} alt="Education Material" height={64} />
                        <p className="mt-2">{translate('library.material').toUpperCase()}</p>
                      </div>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title>
                      {
                        material.title.length <= 50
                          ? <h5 className="card-title">
                            { material.title }
                          </h5>
                          : (
                            <OverlayTrigger
                              overlay={<Tooltip id="button-tooltip-2">{ material.title }</Tooltip>}
                            >
                              <h5 className="card-title">
                                { material.title }
                              </h5>
                            </OverlayTrigger>
                          )
                      }
                    </Card.Title>
                    <Card.Text>
                      {material.file ? translate(material.file.fileGroupType) : ''}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="link" className="text-decoration-none">{translate('exercise.learn_more')}</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
            { staticPage.homeData && staticPage.homeData.display_feature_resource === 1 && staticPage.homeData.featured_resources.questionnaires !== undefined && staticPage.homeData.featured_resources.questionnaires.map(questionnaire => (
              <Col key={questionnaire.id} md={6} lg={4} xl={window.screen.width >= 2020 && 2} className="card-wrapper">
                <Card className="exercise-card shadow-sm mb-4" onClick={() => handleViewQuestionnaireDetail(questionnaire.slug)}>
                  <div className="card-img bg-light">
                    <div className="w-100 h-100 px-2 py-4 text-center questionnaire-header">
                      <img src={'/images/questionnaire-icon.svg'} alt="Questionnaire" />
                      <p>{translate('library.questionnaire').toUpperCase()}</p>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title>
                      {
                        questionnaire.title.length <= 50
                          ? <h5 className="card-title">
                            { questionnaire.title }
                          </h5>
                          : (
                            <OverlayTrigger
                              overlay={<Tooltip id="button-tooltip-2">{ questionnaire.title }</Tooltip>}
                            >
                              <h5 className="card-title">
                                { questionnaire.title }
                              </h5>
                            </OverlayTrigger>
                          )
                      }
                    </Card.Title>
                    <Card.Text>
                      <b>{questionnaire.questions.length}</b> {translate('questionnaire.questions')}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="link" className="text-decoration-none">{translate('exercise.learn_more')}</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="mt-4 d-flex justify-content-around">
            <Button className="btn-xlarge" onClick={handleViewLibrary}>
              {translate('homepage_view_resources')}
            </Button>
            <Button className="btn-xlarge btn-custom" variant="link" onClick={handleContributeResources}>
              {translate('homepage_contribute_library')}
            </Button>
          </div>
        </Container>
      </section>
      <section className="section__wrapper bg-white">
        <Container>
          <h2 className="text-primary section__heading">{translate('static_page.partner').toUpperCase()}</h2>
          <div className="flex-grow-1" dangerouslySetInnerHTML={{ __html: staticPage.partner_content }} />
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
