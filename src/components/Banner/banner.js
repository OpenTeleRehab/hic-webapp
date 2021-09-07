import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';

const Banner = ({ bannerImagePath, isHome, title, introductionText }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  return (
    <>
      {bannerImagePath ? (
        <div className="header-banner" style={{ backgroundImage: `url(${bannerImagePath})` }}>
          <Container>
            <div className="header-banner__wrapper mx-auto">
              <h1 className={!isHome && 'mt-5'}>{title}</h1>
              {isHome && (
                <>
                  <div className="lead" dangerouslySetInnerHTML={{ __html: introductionText }} />
                  <Form className="search-form position-relative">
                    <Form.Group className="m-0" controlId="search">
                      <Form.Label className="d-none">{translate('common.search.label')}</Form.Label>
                      <Form.Control className="search-field" type="text" placeholder={translate('banner.search.placeholder')} />
                    </Form.Group>
                    <Button className="search-button position-absolute top-0 start-0" variant="link" type="submit">
                      <MdSearch size={20} /> <span className="sr-only">Search</span>
                    </Button>
                  </Form>
                </>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <div>
          <Container>
            <div className="header-banner__wrapper mx-auto">
              <h1 className={!isHome && 'mt-4 text-primary'}>{title}</h1>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

Banner.propTypes = {
  bannerImagePath: PropTypes.string,
  isHome: PropTypes.bool,
  title: PropTypes.string,
  introductionText: PropTypes.string
};

export default Banner;
