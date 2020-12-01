import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const CreateQuestionnaire = ({ translate }) => {
  return (
    <>
      {translate('service_setup.questionnaires')} ???
    </>
  );
};

CreateQuestionnaire.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(CreateQuestionnaire);
