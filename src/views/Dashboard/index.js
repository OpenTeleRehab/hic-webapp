import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import * as ROUTES from 'variables/routes';
import { getStatistics } from '../../store/dashboard/actions';
import { Card, Col, Row } from 'react-bootstrap';

const Dashboard = () => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const { statistics } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1 className="text-primary">{translate('dashboard.quick_stats')}</h1>
      </div>

      <Row>
        <Col md={8} lg={7}>
          <Card bg={'primary'} text={'white'} className="stats-card">
            <Card.Body>
              <Card.Link href={ROUTES.ADMIN_RESOURCES} className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                <div className="icon">
                  <img src={'/images/stats-exercise-icon.svg'} alt={translate('resource.exercises')} width="58" />
                </div>

                <ul className="amount">
                  <li className="d-flex justify-content-between"><span>{translate('dashboard.total_exercises')}</span> <span>{statistics.exercise && statistics.exercise.total}</span></li>
                  <li className="d-flex justify-content-between"><span>{translate('dashboard.new_submissions')}</span> <span>{statistics.exercise && statistics.exercise.submission}</span></li>
                  <li className="d-flex justify-content-between"><span>{translate('dashboard.new_translations')}</span> <span>{statistics.exercise && statistics.exercise.translation}</span></li>
                </ul>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} lg={7}>
          <Card bg={'primary'} text={'white'} className="stats-card">
            <Card.Body>
              <Card.Link href={ROUTES.ADMIN_RESOURCES_EDUCATION_MATERIAL} className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                <div className="icon">
                  <img src={'/images/stats-education-material-icon.svg'} alt={translate('resource.education_materials')} width="58" />
                </div>

                <ul className="amount">
                  <li className="d-flex justify-content-between"><span>{translate('dashboard.total_education_materials')}</span> <span>{statistics.education && statistics.education.total}</span></li>
                  <li className="d-flex justify-content-between"><span>{translate('dashboard.new_submissions')}</span> <span>{statistics.education && statistics.education.submission}</span></li>
                  <li className="d-flex justify-content-between"><span>{translate('dashboard.new_translations')}</span> <span>{statistics.education && statistics.education.translation}</span></li>
                </ul>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} lg={7}>
          <Card bg={'primary'} text={'white'} className="stats-card">
            <Card.Body>
              <Card.Link href={ROUTES.ADMIN_RESOURCES_QUESTIONNAIRE} className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                <div className="icon">
                  <img src={'/images/stats-questionnaire-icon.svg'} alt={translate('resource.questionnaires')} width="58" />
                </div>

                <ul className="amount">
                  <li className="d-flex justify-content-between"><span>{translate('dashboard.total_questionnaires')}</span> <span>{statistics.questionnaire && statistics.questionnaire.total}</span></li>
                  <li className="d-flex justify-content-between"><span>{translate('dashboard.new_submissions')}</span> <span>{statistics.questionnaire && statistics.questionnaire.submission}</span></li>
                  <li className="d-flex justify-content-between"><span>{translate('dashboard.new_translations')}</span> <span>{statistics.questionnaire && statistics.questionnaire.translation}</span></li>
                </ul>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
