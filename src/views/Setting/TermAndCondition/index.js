import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withLocalize } from 'react-localize-redux';
import { Badge, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as moment from 'moment';

import settings from 'settings';
import BasicTable from 'components/Table/basic';
import { DeleteAction, EditAction, PublishAction, ViewAction } from 'components/ActionIcons';
import {
  getTermAndCondition,
  getTermAndConditions,
  publishTermAndCondition
} from 'store/termAndCondition/actions';
import { STATUS_VARIANTS } from 'variables/termAndCondition';
import Dialog from 'components/Dialog';

const TermAndCondition = ({ translate, handleRowEdit }) => {
  const dispatch = useDispatch();
  const { termAndConditions, termAndCondition } = useSelector(state => state.termAndCondition);
  const { languages } = useSelector(state => state.language);
  const { profile } = useSelector(state => state.auth);

  const [showPublishedDialog, setShowPublishedDialog] = useState(false);
  const [publishedId, setPublishedId] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [language, setLanguage] = useState();

  const columns = [
    { name: 'version', title: translate('term_and_condition.version') },
    { name: 'status', title: translate('common.status') },
    { name: 'published_date', title: translate('term_and_condition.published_date') },
    { name: 'action', title: translate('common.action') }
  ];

  useEffect(() => {
    if (profile) {
      setLanguage(profile.language_id);
    }
  }, [profile]);

  useEffect(() => {
    if (viewId && language) {
      dispatch(getTermAndCondition(viewId, language));
    }
  }, [viewId, language, dispatch]);

  useEffect(() => {
    dispatch(getTermAndConditions());
  }, [dispatch]);

  const handlePublish = (id) => {
    setPublishedId(id);
    setShowPublishedDialog(true);
  };

  const handlePublishedDialogConfirm = () => {
    dispatch(publishTermAndCondition(publishedId)).then(result => {
      if (result) {
        handlePublishedDialogClose();
      }
    });
  };

  const handlePublishedDialogClose = () => {
    setPublishedId(null);
    setShowPublishedDialog(false);
  };

  const handleViewContent = (id) => {
    setShowViewDialog(true);
    setViewId(id);
  };

  const handleViewContentClose = () => {
    setShowViewDialog(false);
  };

  const handleLanguageChange = e => {
    const { value } = e.target;
    setLanguage(value);
  };

  return (
    <div className="card">
      <BasicTable
        rows={termAndConditions.map(term => {
          const publishedDate = term.published_date;
          const action = (
            <>
              <ViewAction onClick={() => handleViewContent(term.id)} />
              <PublishAction className="ml-1" onClick={() => handlePublish(term.id)} disabled={publishedDate} />
              <EditAction className="ml-1" onClick={() => handleRowEdit(term.id)} disabled={publishedDate} />
              <DeleteAction className="ml-1" disabled />
            </>
          );
          const status = term.status && (
            <Badge pill variant={STATUS_VARIANTS[term.status]}>
              {translate('term_and_condition.status_' + term.status)}
            </Badge>
          );
          return {
            version: term.version,
            status: status,
            published_date: publishedDate ? moment(publishedDate).format(settings.date_format) : '',
            action
          };
        })}
        columns={columns}
      />

      <Dialog
        show={showPublishedDialog}
        title={translate('term_and_condition.publish_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handlePublishedDialogClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handlePublishedDialogConfirm}
      >
        <p>{translate('term_and_condition.publish_confirmation_message')}</p>
      </Dialog>

      <Dialog
        show={showViewDialog}
        title={translate('term_and_condition.view_title')}
        cancelLabel={translate('common.close')}
        onCancel={handleViewContentClose}
      >
        <Form.Group controlId="formLanguage">
          <Form.Label>{translate('common.language')}</Form.Label>
          <Form.Control as="select" value={language} onChange={handleLanguageChange}>
            {languages.map((language, index) => (
              <option key={index} value={language.id}>
                {language.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <div dangerouslySetInnerHTML={{ __html: termAndCondition.content }} />
      </Dialog>
    </div>
  );
};

TermAndCondition.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(TermAndCondition);
