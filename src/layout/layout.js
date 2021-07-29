import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { useLocation } from 'react-router-dom';

import Navigation from 'layout/navigation';
import ToastNotification from 'components/ToastNotification';
import SpinnerOverlay from 'components/SpinnerOverlay';
import Footer from './footer';
import Banner from '../components/Banner/banner';
import * as ROUTES from '../variables/routes';

const Layout = ({ component: Component, title }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const bannerImagePath = '/images/header-banner.png';

  // set page title
  useEffect(() => {
    document.title = `${translate(title)} - ${process.env.REACT_APP_SITE_TITLE}`;
  });

  useEffect(() => {
    if (location.pathname === ROUTES.HOME) {
      setShowBanner(true);
      setIsHome(true);
    }
  }, [location]);

  return (
    <>
      <header className="header">
        <Navigation translate={translate} />
        {showBanner && <Banner bannerImagePath={bannerImagePath} isHome={isHome} />}
      </header>
      <main className="mt-3 mb-3">
        <Component translate={translate} />
      </main>
      <Footer />

      <ToastNotification />
      <SpinnerOverlay />
    </>
  );
};

Layout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  title: PropTypes.string
};

export default Layout;
