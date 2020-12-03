import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const CreateQuestionnaire = ({ translate }) => {
  return (
    <>
      {translate('questionnaire.create')}
    </>
  );
};

CreateQuestionnaire.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(CreateQuestionnaire);
