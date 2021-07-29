import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const Footer = () => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  return (
    <footer className="footer">
      <Container>
        <p><strong>{translate('common.copyright')}</strong></p>
      </Container>
    </footer>
  );
};

export default Footer;
