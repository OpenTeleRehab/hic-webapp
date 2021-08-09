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
import { Container } from 'react-bootstrap';

const Layout = ({ component: Component, title, defaultTemplate }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const bannerImagePath = '/images/header-banner.png';

  // set page title
  useEffect(() => {
    document.title = `${translate(title)} - ${process.env.REACT_APP_SITE_TITLE}`;
  }, [title, translate]);

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

      {defaultTemplate ? (
        <main className="main">
          <Component translate={translate} />
        </main>
      ) : (
        <main className="main main__default pt-4 pb-4 bg-white">
          <Container>
            <Component translate={translate} />
          </Container>
        </main>
      )}
      <Footer />

      <ToastNotification />
      <SpinnerOverlay />
    </>
  );
};

Layout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  title: PropTypes.string,
  defaultTemplate: PropTypes.bool
};

export default Layout;
