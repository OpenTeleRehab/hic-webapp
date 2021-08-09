import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Navigation from 'layout/navigation';
import ToastNotification from 'components/ToastNotification';
import SpinnerOverlay from 'components/SpinnerOverlay';
import Footer from '../footer';
import Sidebar from './sidebar';

const Layout = ({ component: Component, title }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  // set page title
  useEffect(() => {
    document.title = `${translate(title)} - ${process.env.REACT_APP_SITE_TITLE}`;
  }, [title, translate]);

  return (
    <>
      <header className="header fixed-top">
        <Navigation translate={translate} />
      </header>
      <main className="d-flex main main-admin-area">
        <Sidebar />
        <div className="main-content">
          <Component translate={translate} />
        </div>
      </main>
      <Footer fixedBottom={true} />

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
