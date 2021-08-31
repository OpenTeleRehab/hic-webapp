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
import { replaceRoute } from '../utils/route';

const Layout = ({ component: Component, title, defaultTemplate }) => {
  const localize = useSelector((state) => state.localize);
  const { activeLanguage } = useSelector((state) => state.language);
  const { publishTermAndConditionPage, termConditionBanner } = useSelector((state) => state.termAndCondition);
  const translate = getTranslate(localize);
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [bannerTitle, SetBannerTitle] = useState('');
  const [filePath, setFilePath] = useState('');
  const bannerImagePath = '/images/header-banner.png';

  // set page title
  useEffect(() => {
    document.title = `${translate(title)} - ${process.env.REACT_APP_SITE_TITLE}`;
  }, [title, translate]);

  useEffect(() => {
    if (location.pathname === replaceRoute(ROUTES.HOME, activeLanguage)) {
      setShowBanner(true);
      setIsHome(true);
    } else if (location.pathname === replaceRoute(ROUTES.TERM_CONDITION, activeLanguage)) {
      setShowBanner(true);
      setIsHome(false);
      SetBannerTitle(publishTermAndConditionPage.title);
      setFilePath(termConditionBanner.url || `${process.env.REACT_APP_API_BASE_URL}/file/${termConditionBanner.id}`);
    }
  }, [location, activeLanguage, termConditionBanner, publishTermAndConditionPage]);

  return (
    <>
      <header className="header">
        <Navigation translate={translate} />
        {showBanner && <Banner bannerImagePath={ isHome ? bannerImagePath : filePath} isHome={isHome} title = {bannerTitle} />}
      </header>

      {defaultTemplate ? (
        <main className="main">
          <Component translate={translate} />
        </main>
      ) : (
        <main className="main main-public-area pt-4 pb-4 bg-white">
          <Container>
            <Component translate={translate} />
          </Container>
        </main>
      )}
      <Footer fixedBottom={false} />

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
