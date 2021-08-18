import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CATEGORY_TYPES } from '../../../variables/category';
import CreateExercise from './Exercises/create';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import CreateEducationMaterial from './EducationMaterial/create';
import CreateQuestionnaire from './Questionnaire/create';
import { CONTRIBUTE } from '../../../variables/routes';
import ReviewSubmissionModal from './ReviewSubmission';
import Dialog from '../../../components/Dialog';
import * as ROUTES from '../../../variables/routes';
import { replaceRoute } from '../../../utils/route';

const Contribute = () => {
  const { hash } = useLocation();
  const localize = useSelector((state) => state.localize);
  const { languages, activeLanguage } = useSelector((state) => state.language);
  const translate = getTranslate(localize);
  const [view, setView] = useState(undefined);
  const [editItem, setEditItem] = useState(undefined);
  const [isShowReviewModal, setIsShowReviewModal] = useState(false);
  const [isShowConfirmSubmissionModal, setIsShowConfirmSubmissionModal] = useState(false);
  const history = useHistory();
  const [lang, setLang] = useState('');

  useEffect(() => {
    const lang = languages.find((language) => language.code === activeLanguage);
    if (lang) {
      setLang(lang.id);
    }
  }, [languages, activeLanguage]);

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

  useEffect(() => {
    if (hash.includes('#' + CATEGORY_TYPES.MATERIAL)) {
      history.push(`${replaceRoute(CONTRIBUTE, activeLanguage)}#${CATEGORY_TYPES.MATERIAL}`);
    } else if (hash.includes('#' + CATEGORY_TYPES.QUESTIONNAIRE)) {
      history.push(`${replaceRoute(CONTRIBUTE, activeLanguage)}#${CATEGORY_TYPES.QUESTIONNAIRE}`);
    } else {
      history.push(replaceRoute(CONTRIBUTE, activeLanguage));
    }
  }, [activeLanguage, history, hash]);

  const handleChange = (e) => {
    const { value } = e.target;
    history.push(`${replaceRoute(CONTRIBUTE, activeLanguage)}#${value}`);
  };

  const handleCancelConfirmSubmission = () => {
    setIsShowConfirmSubmissionModal(false);
    history.push(replaceRoute(ROUTES.LIBRARY, activeLanguage));
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
                disabled={editItem}
                type="radio"
                label={type.label}
                custom
                onChange={handleChange}
              />
            ))}
          </Form.Group>
        </Form>

        { view === CATEGORY_TYPES.EXERCISE && <CreateExercise translate={translate} hash={hash} editItem={editItem} setEditItem={setEditItem} showReviewModal={setIsShowReviewModal} lang={lang} /> }
        { view === CATEGORY_TYPES.MATERIAL && <CreateEducationMaterial translate={translate} hash={hash} editItem={editItem} setEditItem={setEditItem} showReviewModal={setIsShowReviewModal} lang={lang} /> }
        { view === CATEGORY_TYPES.QUESTIONNAIRE && <CreateQuestionnaire translate={translate} hash={hash} editItem={editItem} setEditItem={setEditItem} showReviewModal={setIsShowReviewModal} lang={lang} /> }
        { isShowReviewModal && <ReviewSubmissionModal translate={translate} editItem={setEditItem} showReviewModal={setIsShowReviewModal} showConfirmSubmissionModal={setIsShowConfirmSubmissionModal} /> }

        <Dialog
          show={isShowConfirmSubmissionModal}
          title={translate('contribute.confirm_submission.title')}
          onCancel={handleCancelConfirmSubmission}
          cancelLabel={translate('common.close')}
        >
          {translate('contribute.confirm_submission.text')}
        </Dialog>
      </div>
    </>
  );
};

export default Contribute;
