import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withLocalize } from 'react-localize-redux';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as moment from 'moment';

import settings from 'settings';
import BasicTable from 'components/Table/basic';
import { DeleteAction, EditAction, PublishAction } from 'components/ActionIcons';
import { getPrivacyPolicies, publishPrivacyPolicy } from 'store/privacyPolicy/actions';
import { STATUS_VARIANTS } from 'variables/privacyPolicy';
import Dialog from 'components/Dialog';

const PrivacyPolicy = ({ translate, handleRowEdit }) => {
  const dispatch = useDispatch();
  const { privacyPolicies } = useSelector(state => state.privacyPolicy);

  const [showPublishedDialog, setShowPublishedDialog] = useState(false);
  const [publishedId, setPublishedId] = useState(null);

  const columns = [
    { name: 'version', title: translate('privacy_policy.version') },
    { name: 'content', title: translate('privacy_policy.content') },
    { name: 'status', title: translate('common.status') },
    { name: 'published_date', title: translate('privacy_policy.published_date') },
    { name: 'action', title: translate('common.action') }
  ];

  useEffect(() => {
    dispatch(getPrivacyPolicies());
  }, [dispatch]);

  const handlePublish = (id) => {
    setPublishedId(id);
    setShowPublishedDialog(true);
  };

  const handlePublishedDialogConfirm = () => {
    dispatch(publishPrivacyPolicy(publishedId)).then(result => {
      if (result) {
        handlePublishedDialogClose();
      }
    });
  };

  const handlePublishedDialogClose = () => {
    setPublishedId(null);
    setShowPublishedDialog(false);
  };

  return (
    <div className="card">
      <BasicTable
        rows={privacyPolicies.map(privacyPolicy => {
          const publishedDate = privacyPolicy.published_date;
          const action = (
            <>
              <PublishAction onClick={() => handlePublish(privacyPolicy.id)} disabled={publishedDate} />
              <EditAction className="ml-1" onClick={() => handleRowEdit(privacyPolicy.id)} disabled={publishedDate} />
              <DeleteAction className="ml-1" disabled />
            </>
          );
          const status = privacyPolicy.status && (
            <Badge pill variant={STATUS_VARIANTS[privacyPolicy.status]}>
              {translate('term_and_condition.status_' + privacyPolicy.status)}
            </Badge>
          );
          return {
            version: privacyPolicy.version,
            content: <div dangerouslySetInnerHTML={{ __html: privacyPolicy.content }} />,
            status: status,
            published_date: publishedDate ? moment(publishedDate).format(settings.date_format) : '',
            action
          };
        })}
        columns={columns}
      />

      <Dialog
        show={showPublishedDialog}
        title={translate('privacy_policy.publish_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handlePublishedDialogClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handlePublishedDialogConfirm}
      >
        <p>{translate('privacy_policy.publish_confirmation_message')}</p>
      </Dialog>
    </div>
  );
};

PrivacyPolicy.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(PrivacyPolicy);