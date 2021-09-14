import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { LIBRARY_TYPES } from '../../variables/library';
import settings from '../../settings';
import { useHistory } from 'react-router-dom';
import { replaceRoute } from '../../utils/route';
import * as ROUTES from '../../variables/routes';
import { setFilterExercises } from '../../store/exercise/actions';
import { setFilterEducationMaterials } from '../../store/educationMaterial/actions';
import { setFilterQuestionnaires } from '../../store/questionnaire/actions';

const Banner = ({ bannerImagePath, isHome, title, introductionText, isAcknowledgment }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localize = useSelector((state) => state.localize);
  const { activeLanguage } = useSelector((state) => state.language);
  const translate = getTranslate(localize);
  const [formFields, setFormFields] = useState({
    search_value: '',
    type: LIBRARY_TYPES.EXERCISE
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formFields.type === LIBRARY_TYPES.EXERCISE) {
      dispatch(setFilterExercises(formFields));
    }
    if (formFields.type === LIBRARY_TYPES.MATERIAL) {
      dispatch(setFilterEducationMaterials(formFields));
    }
    if (formFields.type === LIBRARY_TYPES.QUESTIONNAIRE) {
      dispatch(setFilterQuestionnaires(formFields));
    }

    history.push(`${replaceRoute(ROUTES.LIBRARY, activeLanguage)}#${formFields.type}`);
  };

  return (
    <>
      {bannerImagePath ? (
        <div className="header-banner" style={{ backgroundImage: `url(${bannerImagePath})` }}>
          <Container>
            <div className="header-banner__wrapper mx-auto">
              <h1 className={!isHome && 'mt-5'}>{title}</h1>
              {(isHome || isAcknowledgment) && (
                <>
                  <div className="lead" dangerouslySetInnerHTML={{ __html: introductionText }} />

                  {isHome && (
                    <Form
                      className="search-form"
                      onSubmit={handleSubmit}
                    >
                      <Form.Group className="d-flex justify-content-center">
                        {settings.libraryTypes.options.map((type) => (
                          <Form.Check
                            id={type.text}
                            name="type"
                            key={type.text}
                            className="ml-3 mr-3"
                            value={type.value}
                            checked={formFields.type === type.value}
                            type="radio"
                            label={translate(type.text)}
                            onChange={handleChange}
                            custom
                          />
                        ))}
                      </Form.Group>

                      <div className="position-relative">
                        <Form.Group className="m-0" controlId="search">
                          <Form.Label className="d-none">{translate('common.search.label')}</Form.Label>
                          <Form.Control
                            name="search_value"
                            className="search-field"
                            onChange={handleChange}
                            value={formFields.keyword}
                            placeholder={translate('banner.search.placeholder')}
                          />
                        </Form.Group>

                        <Button
                          className="search-button position-absolute top-0 start-0"
                          variant="link"
                          type="submit"
                        >
                          <MdSearch size={20} /> <span className="sr-only">{translate('common.search.label')}</span>
                        </Button>
                      </div>
                    </Form>
                  )}
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
              {isAcknowledgment && (
                <div className="lead" dangerouslySetInnerHTML={{ __html: introductionText }} />
              )}
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
  introductionText: PropTypes.string,
  isAcknowledgment: PropTypes.bool
};

export default Banner;
