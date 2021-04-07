import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withLocalize } from 'react-localize-redux';

import BasicTable from 'components/Table/basic';
import { EditAction } from 'components/ActionIcons';

const Profession = ({ translate, handleRowEdit }) => {
  const professions = useSelector((state) => state.profession.professions);

  const [columns] = useState([
    { name: 'id', title: translate('common.id') },
    { name: 'name', title: translate('common.name') },
    { name: 'action', title: translate('common.action') }
  ]);

  return (
    <div className="card">
      <BasicTable
        rows={professions.map(profession => {
          const action = (
            <>
              <EditAction onClick={() => handleRowEdit(profession.id)}/>
            </>
          );
          return {
            id: profession.id,
            name: profession.name,
            action
          };
        })}
        columns={columns}
      />
    </div>
  );
};

Profession.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(Profession);
