import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import {
  FaEdit,
  FaLanguage,
  FaUserCircle
} from 'react-icons/fa';
import { getContributorStatistics } from 'store/contributor/actions';
import _ from 'lodash';
import { RiShieldUserFill } from 'react-icons/all';

const ContributorCard = ({ hideContributors }) => {
  const dispatch = useDispatch();
  const { contributorStatistics } = useSelector((state) => state.contributor);
  const { contributors } = useSelector((state) => state.contributor);
  const [exercise, setExercise] = useState([]);
  const [education, setEducation] = useState([]);
  const [questionnaire, setQuestionnaire] = useState([]);

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
    <Row>
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
          return (
            <Col sm={4}>
              <div className="mb-2 pr-2 d-flex border border-light contributor-card" key={index}>
                <div className="p-2 text-white icon-wrapper">
                  {contributor.isModerator ? (
                    <RiShieldUserFill size={45} />
                  ) : (
                    <FaUserCircle size={45} />
                  )}
                </div>
                <div className="p-1">
                  <div className="ml-2 mt-1 contributor-name">{contributor.name}</div>
                  <div className="mt-2 statistic-text ml-2">
                    <span className="ml-1"><FaEdit size={17} className="mb-1"/></span>
                    <span>{'- '}{totalUpload}</span>
                    <span className="ml-2"><FaLanguage size={20} className="mb-1"/></span>
                    <span>{' - '}{totalTranslation}</span>
                  </div>
                </div>
              </div>
            </Col>
          );
        }
      })}
    </Row>
  );
};

ContributorCard.propTypes = {
  hideContributors: PropTypes.array
};

export default ContributorCard;
