import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getTranslations } from 'store/translation/actions';
import { getLanguages } from 'store/language/actions';
import { getProfile } from 'store/auth/actions';
import SplashScreen from './components/SplashScreen';
import { useKeycloak } from '@react-keycloak/web';
import { useIdleTimer } from 'react-idle-timer';
import settings from './settings';
import AppContext from './context/AppContext';
import { getHomeBannerImage } from './store/staticPage/actions';

const ConfigurationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      if (keycloak.authenticated) {
        dispatch(getProfile());
        dispatch(getTranslations({ portal: 'admin_portal' })).then(res => {
          if (res) {
            setLoading(false);
          }
        });
      } else {
        dispatch(getTranslations({ portal: 'public_portal' })).then(res => {
          if (res) {
            setLoading(false);
          }
        });
      }
      dispatch(getLanguages());
      dispatch(getHomeBannerImage());
    }
  }, [loading, dispatch, keycloak]);

  const { pause, reset } = useIdleTimer({
    timeout: 1000 * settings.appIdleTimeout,
    crossTab: true,
    onIdle: () => {
      if (keycloak.authenticated) {
        keycloak.logout({ redirectUri: window.location.origin });
      }
    }
  });
  const appContext = { idleTimer: { pause, reset } };

  return loading ? <SplashScreen /> : <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

ConfigurationProvider.propTypes = {
  children: PropTypes.node
};

export default ConfigurationProvider;
