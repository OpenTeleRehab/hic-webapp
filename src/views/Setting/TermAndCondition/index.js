import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import BasicTable from '../../../components/Table/basic';
import { DeleteAction, EditAction } from '../../../components/ActionIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getTermAndConditions } from '../../../store/termAndCondition/actions';

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

  return (
    <div className="card">
      <BasicTable
        rows={termAndConditions.map(term => {
          const action = (
            <>
              <EditAction onClick={() => handleRowEdit(term.id)} />
              <DeleteAction className="ml-1" disabled />
            </>
          );
          return {
            version: term.version,
            content: term.content,
            status: '',
            published_date: term.published_date,
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
