import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';

const Footer = ({ fixedBottom }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  return (
    <footer className={fixedBottom ? 'footer fixed-bottom' : 'footer'}>
      <Container>
        <p><strong>{translate('common.copyright')}</strong></p>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  fixedBottom: PropTypes.bool
};

export default Footer;
