import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';
import * as ROUTES from 'variables/routes';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { replaceRoute } from '../../utils/route';
import { getStatistics } from '../../store/dashboard/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const history = useHistory();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const { activeLanguage } = useSelector((state) => state.language);
  const { statistics } = useSelector((state) => state.dashboard);
  const { staticPage } = useSelector(state => state.staticPage);

  useEffect(() => {
    if (keycloak.authenticated) {
      history.push(ROUTES.ADMIN_DASHBOARD);
    }
  }, [keycloak, history]);

  useEffect(() => {
    history.push(replaceRoute(ROUTES.HOME, activeLanguage));
  }, [activeLanguage, history]);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  return (
    <>
      <section className="section__wrapper">
        <Container>
          <h2 className="text-primary section__heading">{translate('dashboard.title')}</h2>
          <Row>
            <Col lg={4}>
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

            <Col lg={4}>
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

            <Col lg={4}>
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
        </Container>
      </section>
      <section className="section__wrapper bg-white">
        <Container>
          <h2 className="text-primary section__heading">{translate('static_page.partner').toUpperCase()}</h2>
          <div className="p-3 flex-grow-1" dangerouslySetInnerHTML={{ __html: staticPage.partner_content }} />
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
