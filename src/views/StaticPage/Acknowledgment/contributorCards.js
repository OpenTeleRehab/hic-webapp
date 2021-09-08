import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import {
  FaEdit,
  FaLanguage,
  FaUserCircle
} from 'react-icons/fa';
import {
  getContributors,
  getContributorStatistics
} from 'store/contributor/actions';
import _ from 'lodash';
import { RiShieldUserFill } from 'react-icons/all';
import { getTranslate } from 'react-localize-redux';

const ContributorCard = ({ hideContributors, isAdmin }) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const { contributorStatistics } = useSelector((state) => state.contributor);
  const { contributors } = useSelector((state) => state.contributor);
  const [exercise, setExercise] = useState([]);
  const [education, setEducation] = useState([]);
  const [questionnaire, setQuestionnaire] = useState([]);

  useEffect(() => {
    dispatch(getContributors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContributorStatistics());
  }, [dispatch]);

  useEffect(() => {
    if (!_.isEmpty(contributorStatistics)) {
      setExercise(contributorStatistics.exercise);
      setEducation(contributorStatistics.education);
      setQuestionnaire(contributorStatistics.questionnaire);
    }
  }, [contributorStatistics]);

  return (
    <Row className="justify-content-center">
      {contributors.map((contributor, index) => {
        if (!hideContributors.includes(contributor.id)) {
          let totalUpload = 0;
          let totalTranslation = 0;

          const totalExercise = exercise.totalUpload && exercise.totalUpload.find(exerciseUpload => exerciseUpload.uploaded_by === contributor.id);
          const totalEducation = education.totalUpload && education.totalUpload.find(educationUpload => educationUpload.uploaded_by === contributor.id);
          const totalQuestionnaire = questionnaire.totalUpload && questionnaire.totalUpload.find(questionnaireUpload => questionnaireUpload.uploaded_by === contributor.id);
          const totalExerciseTranslation = exercise.totalTranslation && exercise.totalTranslation.find(exerciseTranslation => exerciseTranslation.uploaded_by === contributor.id);
          const totalEducationTranslation = education.totalTranslation && education.totalTranslation.find(educationTranslation => educationTranslation.uploaded_by === contributor.id);
          const totalQuestionnaireTranslation = questionnaire.totalTranslation && questionnaire.totalTranslation.find(questionnaireTranslation => questionnaireTranslation.uploaded_by === contributor.id);
          totalUpload += (totalExercise ? totalExercise.total_upload : 0) + (totalEducation ? totalEducation.total_upload : 0) + (totalQuestionnaire ? totalQuestionnaire.total_upload : 0);
          totalTranslation += (totalExerciseTranslation ? totalExerciseTranslation.total_translation : 0) + (totalEducationTranslation ? totalEducationTranslation.total_translation : 0) + (totalQuestionnaireTranslation ? totalQuestionnaireTranslation.total_translation : 0);
          const style = {
            backgroundColor: contributor.background_colors
          };

          return (
            <Col sm={4}>
              <div className="mb-2 pr-2 d-flex border border-light contributor-card bg-white w-100" key={index}>
                <div className={`${isAdmin ? 'p-2' : 'p-4'} text-white icon-wrapper`} style={style}>
                  {contributor.isModerator ? (
                    <RiShieldUserFill size={ isAdmin ? 45 : 55} />
                  ) : (
                    <FaUserCircle size={isAdmin ? 45 : 55} />
                  )}
                </div>
                <div className={isAdmin ? 'p-1' : 'pl-3 pt-2'}>
                  <div className="ml-2 mt-1 contributor-name">{contributor.name}</div>
                  {isAdmin ? (
                    <div className="mt-2 statistic-text ml-2">
                      <span className="ml-1"><FaEdit size={17} className="mb-1"/></span>
                      <span>{'- '}{totalUpload}</span>
                      <span className="ml-2"><FaLanguage size={20} className="mb-1"/></span>
                      <span>{' - '}{totalTranslation}</span>
                    </div>
                  ) : (
                    <ul className="pl-2 mt-2">
                      <li className="d-flex justify-content-between align-content-center"><span>{translate('contributor.resources_contributed')}</span> <span className="ml-5">{totalUpload}</span></li>
                      <li className="d-flex justify-content-between"><span>{translate('contributor.translations_approved')}</span> <span className="ml-5">{totalTranslation}</span></li>
                    </ul>
                  )}
                </div>
              </div>
            </Col>
          );
        } else {
          return null;
        }
      })}
    </Row>
  );
};

ContributorCard.propTypes = {
  hideContributors: PropTypes.array,
  isAdmin: PropTypes.bool
};

export default ContributorCard;
