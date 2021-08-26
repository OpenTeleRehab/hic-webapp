import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getTranslations } from 'store/translation/actions';
import { getLanguages } from 'store/language/actions';
import { getProfile } from 'store/auth/actions';
import SplashScreen from './components/SplashScreen';
import { useKeycloak } from '@react-keycloak/web';

const ConfigurationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      dispatch(getProfile());
      dispatch(getTranslations(keycloak.authenticated ? { portal: 'admin_portal' } : { portal: 'public_portal' })).then(res => {
        if (res) {
          setLoading(false);
        }
      });
      dispatch(getLanguages());
    }
  }, [loading, dispatch, keycloak]);

  return loading ? <SplashScreen /> : children;
};

ConfigurationProvider.propTypes = {
  children: PropTypes.node
};

export default ConfigurationProvider;
