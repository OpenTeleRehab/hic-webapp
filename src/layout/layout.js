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
import { Helmet } from 'react-helmet';

const Layout = ({ component: Component, title, defaultTemplate }) => {
  const localize = useSelector((state) => state.localize);
  const { activeLanguage } = useSelector((state) => state.language);
  const { publishTermAndConditionPage, termConditionBanner } = useSelector((state) => state.termAndCondition);
  const { staticPage, homeBannerImage } = useSelector((state) => state.staticPage);
  const translate = getTranslate(localize);
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [bannerTitle, setBannerTitle] = useState('');
  const [introductionText, setIntroductionText] = useState('');
  const [isAcknowledgment, setIsAcknowledgment] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [homeImagePath, setHomeImagePath] = useState('');

  useEffect(() => {
    // Reset scroll position on change of routes
    window.scrollTo({ left: 0, top: 0 });
  }, []);

  // set page title
  useEffect(() => {
    if (bannerTitle) {
      setSiteTitle(bannerTitle);
    } else {
      setSiteTitle(translate(title));
    }
  }, [title, translate, bannerTitle]);

  useEffect(() => {
    if (location.pathname === replaceRoute(ROUTES.HOME, activeLanguage) || location.pathname + '/' === replaceRoute(ROUTES.HOME, activeLanguage)) {
      setShowBanner(true);
      setIsHome(true);
      setBannerTitle(staticPage.title);
      staticPage ? setIntroductionText(staticPage.content) : setIntroductionText('');
      if (staticPage && staticPage.file) {
        setFilePath(`${process.env.REACT_APP_API_BASE_URL}/file/${staticPage.file.id}`);
      }
    }

    if (location.pathname === replaceRoute(ROUTES.TERM_CONDITION, activeLanguage) || location.pathname + '/' === replaceRoute(ROUTES.TERM_CONDITION, activeLanguage)) {
      setShowBanner(true);
      publishTermAndConditionPage ? setBannerTitle(publishTermAndConditionPage.title) : setBannerTitle('');
      if (termConditionBanner && termConditionBanner.id) {
        setFilePath(`${process.env.REACT_APP_API_BASE_URL}/file/${termConditionBanner.id}`);
      } else {
        setFilePath('');
      }
    }

    if (location.pathname === replaceRoute(ROUTES.ABOUT_US, activeLanguage) || location.pathname + '/' === replaceRoute(ROUTES.ABOUT_US, activeLanguage)) {
      setShowBanner(true);
      setBannerTitle(staticPage.title);
      if (staticPage && staticPage.file) {
        setFilePath(`${process.env.REACT_APP_API_BASE_URL}/file/${staticPage.file.id}`);
      } else {
        setFilePath('');
      }
    }

    if (location.pathname === replaceRoute(ROUTES.ACKNOWLEDGMENT, activeLanguage) || location.pathname + '/' === replaceRoute(ROUTES.ACKNOWLEDGMENT, activeLanguage)) {
      setShowBanner(true);
      setIsAcknowledgment(true);
      setBannerTitle(staticPage.title);
      setIntroductionText(staticPage.content);
      if (staticPage && staticPage.file) {
        setFilePath(`${process.env.REACT_APP_API_BASE_URL}/file/${staticPage.file.id}`);
      } else {
        setFilePath('');
      }
    }
  }, [location, activeLanguage, termConditionBanner, publishTermAndConditionPage, staticPage]);

  useEffect(() => {
    if (homeBannerImage && homeBannerImage.file) {
      setHomeImagePath(`${process.env.REACT_APP_API_BASE_URL}/file/${homeBannerImage.file.id}`);
    }
  }, [homeBannerImage]);

  const getMeta = (url) => {
    const img = new Image();
    img.src = url;
    return img;
  };

  return (
    <>
      <Helmet
        encodeSpecialCharacters={true}
        titleTemplate={siteTitle}
        defaultTitle={siteTitle}
      >
        <html lang={activeLanguage} />
        <title itemProp="name" lang={activeLanguage}>{siteTitle}</title>
        <meta name="title" content={siteTitle} />
        <meta name="description" content={siteTitle} />
        <meta property="og:locale" content={activeLanguage} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:type" content={location.pathname.includes('/detail') ? 'article' : 'website'} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteTitle} />
        <meta property="og:image" content={filePath || homeImagePath} />
        <meta property="og:image:width" content={getMeta(filePath || homeImagePath).width} />
        <meta property="og:image:height" content={getMeta(filePath || homeImagePath).height} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content={process.env.REACT_APP_SITE_TITLE} />
      </Helmet>

      <header className="header">
        <Navigation translate={translate} />
        {showBanner && <Banner bannerImagePath={filePath} isHome={isHome} title={bannerTitle} introductionText={introductionText} isAcknowledgment={isAcknowledgment} />}
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
