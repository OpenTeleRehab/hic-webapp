import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const Questionnaire = ({ translate }) => {
  return (
    <>
      {translate('service_setup.questionnaires')}
    </>
  );
};

Questionnaire.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Questionnaire);
