import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { getStaticPages } from 'store/staticPage/actions';
import { useDispatch, useSelector } from 'react-redux';

import BasicTable from 'components/Table/basic';
import { EditAction } from 'components/ActionIcons';

let timer = null;
const StaticPage = ({ translate, handleRowEdit }) => {
  const dispatch = useDispatch();
  const { staticPages, filters, partnerLogoFile } = useSelector(state => state.staticPage);
  const [language, setLanguage] = useState('');
  const { profile } = useSelector((state) => state.auth);
  const columns = [
    { name: 'title', title: translate('static_page.title') },
    { name: 'platform', title: translate('setting.translations.platform') },
    { name: 'action', title: translate('common.action') }
  ];

  useEffect(() => {
    if (profile && profile.language_id) {
      setLanguage(profile.language_id);
    }
  }, [filters, profile, partnerLogoFile]);

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(getStaticPages());
    }, 500);
  }, [language, dispatch]);

  return (
    <div className="card">
      <BasicTable
        rows={staticPages.map(staticPage => {
          const action = (
            <>
              <EditAction className="ml-1" onClick={() => handleRowEdit(staticPage.id)} />
            </>
          );
          return {
            title: staticPage.title,
            platform: staticPage.platform,
            action
          };
        })}
        columns={columns}
      />
    </div>
  );
};

StaticPage.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(StaticPage);
