import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const ClinicFilterCell = ({ filter, onFilter }) => {
  const localize = useSelector((state) => state.localize);
  const clinics = useSelector(state => state.clinic.clinics);
  const translate = getTranslate(localize);

  return (
    <th>
      <select
        className="form-control"
        value={filter ? filter.value : ''}
        onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
      >
        <option value="">{ translate('common.all') }</option>
        {clinics.map((clinic, index) => (
          <option key={index} value={clinic.id}>
            {clinic.name}
          </option>
        ))}
      </select>
    </th>
  );
};

ClinicFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }),
  onFilter: PropTypes.func.isRequired
};

export default ClinicFilterCell;
