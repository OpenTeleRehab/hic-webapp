import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { LIBRARY_TYPES } from '../../../variables/library';
import CreateExercise from './Exercises/create';
import { Form } from 'react-bootstrap';
import { getTranslate } from 'react-localize-redux';
import CreateEducationMaterial from './EducationMaterial/create';
import CreateQuestionnaire from './Questionnaire/create';
import ReviewSubmissionModal from './ReviewSubmission';
import Dialog from '../../../components/Dialog';
import * as ROUTES from '../../../variables/routes';
import { replaceRoute } from '../../../utils/route';
import settings from '../../../settings';

const Contribute = () => {
  const { hash, pathname } = useLocation();
  const { id } = useParams();
  const localize = useSelector((state) => state.localize);
  const { activeLanguage } = useSelector((state) => state.language);
  const translate = getTranslate(localize);
  const [view, setView] = useState(undefined);
  const [editItem, setEditItem] = useState(undefined);
  const [isShowReviewModal, setIsShowReviewModal] = useState(false);
  const [isShowConfirmSubmissionModal, setIsShowConfirmSubmissionModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (hash.includes('#' + LIBRARY_TYPES.MATERIAL) || pathname.includes(LIBRARY_TYPES.MATERIAL)) {
      setView(LIBRARY_TYPES.MATERIAL);
    } else if (hash.includes('#' + LIBRARY_TYPES.QUESTIONNAIRE) || pathname.includes(LIBRARY_TYPES.QUESTIONNAIRE)) {
      setView(LIBRARY_TYPES.QUESTIONNAIRE);
    } else {
      setView(LIBRARY_TYPES.EXERCISE);
    }
  }, [hash, pathname]);

  const handleChange = (e) => {
    const { value } = e.target;
    history.push(`${replaceRoute(ROUTES.CONTRIBUTE, activeLanguage)}#${value}`);
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
        <p className="lead text-center">You can contribute to the library by clicking on the <a href={replaceRoute(ROUTES.CONTRIBUTE, activeLanguage)}>Contribute</a> menu above.</p>

        <Form className="pt-5">
          <h2 className="text-primary mb-5">Choose content to upload</h2>

          <Form.Group className="d-flex justify-content-center">
            {settings.libraryTypes.options.map((type) => (
              <Form.Check
                name="type"
                id={type.text}
                key={type.text}
                className="ml-3 mr-3"
                value={type.value}
                checked={view === type.value}
                disabled={editItem || id}
                type="radio"
                label={translate(type.text)}
                custom
                onChange={handleChange}
              />
            ))}
          </Form.Group>
        </Form>

        { view === LIBRARY_TYPES.EXERCISE && <CreateExercise translate={translate} hash={hash} editItem={editItem} setEditItem={setEditItem} showReviewModal={setIsShowReviewModal} /> }
        { view === LIBRARY_TYPES.MATERIAL && <CreateEducationMaterial translate={translate} hash={hash} editItem={editItem} setEditItem={setEditItem} showReviewModal={setIsShowReviewModal} /> }
        { view === LIBRARY_TYPES.QUESTIONNAIRE && <CreateQuestionnaire translate={translate} hash={hash} editItem={editItem} setEditItem={setEditItem} showReviewModal={setIsShowReviewModal} /> }
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
