import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getTranslations } from 'store/translation/actions';
import { getCountries } from 'store/country/actions';
import { getClinics } from 'store/clinic/actions';
import { getProfessions } from 'store/profession/actions';
import { getLanguages } from 'store/language/actions';
import { getDefaultLimitedPatients } from 'store/setting/actions';

const ConfigurationProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTranslations());
    dispatch(getCountries());
    dispatch(getClinics());
    dispatch(getProfessions());
    dispatch(getLanguages());
    dispatch(getDefaultLimitedPatients());
  });

  return children;
};

ConfigurationProvider.propTypes = {
  children: PropTypes.node
};

export default ConfigurationProvider;
