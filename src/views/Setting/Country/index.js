import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { useSelector } from 'react-redux';

import BasicTable from 'components/Table/basic';
import { EditAction, DeleteAction } from 'components/ActionIcons';
import { getLanguageName } from 'utils/language';

const Country = ({ translate, handleRowEdit }) => {
  const countries = useSelector(state => state.country.countries);
  const languages = useSelector(state => state.language.languages);

  const columns = [
    { name: 'id', title: translate('common.id') },
    { name: 'name', title: translate('common.name') },
    { name: 'iso_code', title: translate('common.iso_code') },
    { name: 'phone_code', title: translate('common.phone_code') },
    { name: 'language', title: translate('common.language') },
    { name: 'action', title: translate('common.action') }
  ];

  return (
    <div className="card">
      <BasicTable
        rows={countries.map(country => {
          const action = (
            <>
              <EditAction onClick={() => handleRowEdit(country.id)} />
              <DeleteAction className="ml-1" disabled />
            </>
          );
          return {
            id: country.identity,
            name: country.name,
            iso_code: country.iso_code,
            phone_code: country.phone_code,
            language: getLanguageName(country.language_id, languages),
            action
          };
        })}
        columns={columns}
      />
    </div>
  );
};

Country.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(Country);
