import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import moment from 'moment';

import settings from 'settings';
import PropTypes from 'prop-types';
import ListExerciseCard from 'views/TreatmentPlan/Activity/Exercise/listCard';
import ListEducationMaterialCard from 'views/TreatmentPlan/Activity/EducationMaterial/listCard';
import ListQuestionnaireCard from 'views/TreatmentPlan/Activity/Questionnaire/listCard';

const ActivitySection = ({ weeks, startDate, activities }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState('');
  const { profile } = useSelector((state) => state.auth);
  const [lang, setLang] = useState('');

  useEffect(() => {
    if (profile) {
      setLang(profile.language_id);
    }
  }, [profile]);

  useEffect(() => {
    if (moment(startDate, settings.date_format).isValid()) {
      const date = moment(startDate, settings.date_format).add(currentWeek - 1, 'weeks');
      setCurrentWeekStartDate(date);
    } else {
      setCurrentWeekStartDate('');
    }
  }, [startDate, currentWeek]);

  const weekElements = () => {
    const elements = [];
    for (let i = 1; i <= weeks; i++) {
      elements.push(
        <div className="position-relative mr-3" key={`week-tab-${i}`}>
          <Button
            variant={currentWeek === i ? 'primary' : 'outline-primary'}
            onClick={() => setCurrentWeek(i)}
          >
            {translate('common.week')} {i}
          </Button>
        </div>
      );
    }
    return elements;
  };

  const dayElements = () => {
    const elements = [];
    for (let i = 0; i < 7; i++) {
      let exercises = null;
      let materials = null;
      let questionnaires = null;
      const date = moment(currentWeekStartDate).add(i, 'days');
      const dayActivities = activities.filter(activity => activity.week === currentWeek && activity.day === i + 1);
      const customExercises = dayActivities ? dayActivities.customExercises || [] : [];
      exercises = dayActivities.filter(dayActivity => dayActivity.type === 'exercise');
      materials = dayActivities.filter(dayActivity => dayActivity.type === 'material');
      questionnaires = dayActivities.filter(dayActivity => dayActivity.type === 'questionnaire');

      const isEven = i % 2 === 0;
      elements.push(
        <div className={'flex-fill flex-basic-0 d-flex flex-column align-items-center w-25 ' + (isEven ? 'bg-white' : 'bg-light') } key={`day-column-${i}`}>
          <div
            className={date.weekday() === 0 || date.weekday() === 6
              ? 'font-weight-bold w-100 text-center text-uppercase py-2 activity-weekend-header-column-background'
              : 'font-weight-bold w-100 text-center text-uppercase py-2 bg-light'}
          >
            {translate('common.day')} {i + 1}
            {date.isValid() && <small>({date.format(settings.date_format)})</small>}
          </div>
          <div className="p-2 activity-card-wrapper h-100">
            <ListExerciseCard exerciseObjs={exercises} lang={lang} customExercises={customExercises}/>
            <ListEducationMaterialCard materialObjs={materials} lang={lang} />
            <ListQuestionnaireCard questionnaireObjs={questionnaires} lang={lang} />
          </div>
        </div>
      );
    }

    return elements;
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className="d-flex align-items-center my-4">
          {weekElements()}
        </div>
      </div>
      <div className="d-flex flex-column flex-lg-row mb-3">
        {dayElements()}
      </div>
    </>
  );
};

ActivitySection.propTypes = {
  weeks: PropTypes.number,
  setWeeks: PropTypes.func,
  startDate: PropTypes.string,
  day: PropTypes.number,
  activities: PropTypes.array,
  setActivities: PropTypes.func,
  readOnly: PropTypes.bool,
  isPreset: PropTypes.bool,
  isOwnCreated: PropTypes.bool,
  originData: PropTypes.array,
  treatmentPlanId: PropTypes.number
};

export default ActivitySection;
