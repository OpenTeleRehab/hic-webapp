import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const CountryFilterCell = ({ filter, onFilter }) => {
  const localize = useSelector((state) => state.localize);
  const countries = useSelector(state => state.country.countries);
  const translate = getTranslate(localize);

  return (
    <th>
      <select
        className="form-control"
        value={filter ? filter.value : ''}
        onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
      >
        <option value="">{ translate('common.all') }</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>{country.name}</option>
        ))}
      </select>
    </th>
  );
};

CountryFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }),
  onFilter: PropTypes.func.isRequired
};

export default CountryFilterCell;
