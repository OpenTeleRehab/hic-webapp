import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CATEGORY_TYPES } from '../../../variables/category';
import CreateExercise from './Exercises/create';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import CreateEducationMaterial from './EducationMaterial/create';
import CreateQuestionnaire from './Questionnaire/create';
import { CONTRIBUTE } from '../../../variables/routes';
import ReviewSubmissionModal from './ReviewSubmission';

const Contribute = () => {
  const { hash } = useLocation();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const [view, setView] = useState(undefined);
  const [isShowReviewModal, setIsShowReviewModal] = useState(false);

  const types = [
    {
      label: translate('library.exercises'),
      value: CATEGORY_TYPES.EXERCISE,
      defaultChecked: true
    },
    {
      label: translate('library.education_materials'),
      value: CATEGORY_TYPES.MATERIAL,
      defaultChecked: false
    },
    {
      label: translate('library.questionnaires'),
      value: CATEGORY_TYPES.QUESTIONNAIRE,
      defaultChecked: false
    }
  ];

  useEffect(() => {
    if (hash.includes('#' + CATEGORY_TYPES.MATERIAL)) {
      setView(CATEGORY_TYPES.MATERIAL);
    } else if (hash.includes('#' + CATEGORY_TYPES.QUESTIONNAIRE)) {
      setView(CATEGORY_TYPES.QUESTIONNAIRE);
    } else {
      setView(CATEGORY_TYPES.EXERCISE);
    }
  }, [hash]);

  const handleChange = (e) => {
    const { value } = e.target;
    window.open(`${CONTRIBUTE}#${value}`, '_self');
  };

  return (
    <>
      <div className="main-entry__header text-center">
        <h1>Contribute to the Library</h1>
      </div>

      <div className="main-entry__content">
        <p className="lead text-center">The Open Library is a center of free and accessible resources for rehabilitation and physiotherapy. The library collects these materials in various forms and made available for public use.</p>
        <p className="lead text-center">You can contribute to the library by clicking on the <a href="/contribute">Contribute</a> menu above.</p>

        <Form className="pt-5">
          <h2 className="text-primary mb-5">Choose content to upload</h2>

          <Form.Group className="d-flex justify-content-center">
            {types.map((type) => (
              <Form.Check
                name="type"
                id={type.label}
                key={type.label}
                className="ml-3 mr-3"
                value={type.value}
                defaultChecked={type.defaultChecked}
                checked={view === type.value}
                type="radio"
                label={type.label}
                custom
                onChange={handleChange}
              />
            ))}
          </Form.Group>
        </Form>

        { view === CATEGORY_TYPES.EXERCISE && <CreateExercise translate={translate} showReviewModal={setIsShowReviewModal} /> }
        { view === CATEGORY_TYPES.MATERIAL && <CreateEducationMaterial translate={translate} showReviewModal={setIsShowReviewModal} /> }
        { view === CATEGORY_TYPES.QUESTIONNAIRE && <CreateQuestionnaire translate={translate} showReviewModal={setIsShowReviewModal} /> }

        {isShowReviewModal && <ReviewSubmissionModal translate={translate} />}
      </div>
    </>
  );
};

export default Contribute;