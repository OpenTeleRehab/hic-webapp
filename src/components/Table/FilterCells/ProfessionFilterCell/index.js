import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const ProfessionFilterCell = ({ filter, onFilter }) => {
  const localize = useSelector((state) => state.localize);
  const professions = useSelector(state => state.profession.professions);
  const translate = getTranslate(localize);

  return (
    <th>
      <select
        className="form-control"
        value={filter ? filter.value : ''}
        onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
      >
        <option value="">{ translate('common.all') }</option>
        {professions.map((profession, index) => (
          <option key={index} value={profession.id}>
            {profession.name}
          </option>
        ))}
      </select>
    </th>
  );
};

ProfessionFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }),
  onFilter: PropTypes.func.isRequired
};

export default ProfessionFilterCell;
