import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { getStaticPages } from 'store/staticPage/actions';
import { useDispatch, useSelector } from 'react-redux';

import BasicTable from 'components/Table/basic';
import { EditAction } from 'components/ActionIcons';

const StaticPage = ({ translate }) => {
  const dispatch = useDispatch();
  const { staticPages } = useSelector(state => state.staticPages);
  const columns = [
    { name: 'title', title: translate('static_page.title') },
    { name: 'content', title: translate('term_and_condition.content') },
    { name: 'action', title: translate('common.action') }
  ];

  useEffect(() => {
    dispatch(getStaticPages());
  }, [dispatch]);

  return (
    <div className="card">
      <BasicTable
        rows={staticPages.map(staticPage => {
          const action = (
            <>
              <EditAction className="ml-1" />
            </>
          );
          return {
            title: staticPage.title,
            content: staticPage.content,
            action
          };
        })}
        columns={columns}
      />
    </div>
  );
};

StaticPage.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(StaticPage);
