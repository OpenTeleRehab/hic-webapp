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
  const { staticPage } = useSelector((state) => state.staticPage);
  const translate = getTranslate(localize);
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [bannerTitle, setBannerTitle] = useState('');
  const [introductionText, setIntroductionText] = useState('');
  const [isAcknowledgment, setIsAcknowledgment] = useState(false);
  const [filePath, setFilePath] = useState('');

  // set page title
  useEffect(() => {
    document.title = `${translate(title)} - ${process.env.REACT_APP_SITE_TITLE}`;
  }, [title, translate]);

  useEffect(() => {
    if (location.pathname === replaceRoute(ROUTES.HOME, activeLanguage)) {
      setShowBanner(true);
      setIsHome(true);
      setBannerTitle(staticPage.title);
      staticPage ? setIntroductionText(staticPage.content) : setIntroductionText('');
      if (staticPage && staticPage.file) {
        setFilePath(`${process.env.REACT_APP_API_BASE_URL}/file/${staticPage.file.id}`);
      }
    } else if (location.pathname === replaceRoute(ROUTES.TERM_CONDITION, activeLanguage)) {
      setShowBanner(true);
      publishTermAndConditionPage ? setBannerTitle(publishTermAndConditionPage.title) : setBannerTitle('');
      if (termConditionBanner && termConditionBanner.id) {
        setFilePath(`${process.env.REACT_APP_API_BASE_URL}/file/${termConditionBanner.id}`);
      }
    } else if (location.pathname === replaceRoute(ROUTES.ABOUT_US, activeLanguage)) {
      setShowBanner(true);
      setBannerTitle(staticPage.title);
      if (staticPage && staticPage.file) {
        setFilePath(`${process.env.REACT_APP_API_BASE_URL}/file/${staticPage.file.id}`);
      }
    } else if (location.pathname === replaceRoute(ROUTES.ACKNOWLEDGMENT, activeLanguage)) {
      setShowBanner(true);
      setIsAcknowledgment(true);
      setBannerTitle(staticPage.title);
      setIntroductionText(staticPage.content);
      if (staticPage.file) {
        setFilePath(`${process.env.REACT_APP_API_BASE_URL}/file/${staticPage.file.id}`);
      }
    }
  }, [location, activeLanguage, termConditionBanner, publishTermAndConditionPage, staticPage]);

  return (
    <>
      <header className="header">
        <Navigation translate={translate} />
        {showBanner && <Banner bannerImagePath={ filePath} isHome={isHome} title = {bannerTitle} introductionText={introductionText} isAcknowledgment={isAcknowledgment} />}
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
