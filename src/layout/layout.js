import React, { useEffect } from 'react';
import Navigation from 'layout/navigation';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const Layout = ({ component: Component, title }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  // set page title
  useEffect(() => {
    document.title = `${translate(title)} - ${process.env.REACT_APP_SITE_TITLE}`;
  });

  return (
    <>
      <Navigation />
      <main role="main">
        <Container fluid>
          <Component translate={translate} />
        </Container>
      </main>
    </>
  );
};

Layout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  title: PropTypes.string
};

export default Layout;
