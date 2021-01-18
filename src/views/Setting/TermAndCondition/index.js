import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import * as moment from 'moment';

import settings from 'settings';
import BasicTable from 'components/Table/basic';
import { DeleteAction, EditAction, PublishAction } from 'components/ActionIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getTermAndConditions, publishTermAndCondition } from 'store/termAndCondition/actions';
import { Badge } from 'react-bootstrap';

const TermAndCondition = ({ translate, handleRowEdit }) => {
  const dispatch = useDispatch();
  const { termAndConditions } = useSelector(state => state.termAndCondition);

  const columns = [
    { name: 'version', title: translate('term_and_condition.version') },
    { name: 'content', title: translate('term_and_condition.content') },
    { name: 'status', title: translate('common.status') },
    { name: 'published_date', title: translate('term_and_condition.published_date') },
    { name: 'action', title: translate('common.action') }
  ];

  useEffect(() => {
    dispatch(getTermAndConditions());
  }, [dispatch]);

  const handlePublish = (id) => {
    dispatch(publishTermAndCondition(id));
  };

  return (
    <div className="card">
      <BasicTable
        rows={termAndConditions.map(term => {
          const publishedDate = term.published_date;
          const action = (
            <>
              <PublishAction onClick={() => handlePublish(term.id)} disabled={publishedDate} />
              <EditAction onClick={() => handleRowEdit(term.id)} />
              <DeleteAction className="ml-1" disabled />
            </>
          );
          const status = publishedDate ? (
            <Badge pill variant="success">
              {translate('term_and_condition.status_published')}
            </Badge>
          ) : (
            <Badge pill variant="warning">
              {translate('term_and_condition.status_draft')}
            </Badge>
          );

          return {
            version: term.version,
            content: term.content,
            status: status,
            published_date: publishedDate ? moment(publishedDate).format(settings.date_format) : '',
            action
          };
        })}
        columns={columns}
      />
    </div>
  );
};

TermAndCondition.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(TermAndCondition);
