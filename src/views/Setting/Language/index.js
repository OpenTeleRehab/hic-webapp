import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { useSelector } from 'react-redux';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-bootstrap4';

import { EditAction, DeleteAction } from 'components/ActionIcons';

const Language = ({ translate }) => {
  const languages = useSelector(state => state.language.languages);

  const [columns] = useState([
    { name: 'id', title: translate('common.id') },
    { name: 'name', title: translate('common.name') },
    { name: 'code', title: translate('common.code') },
    { name: 'action', title: translate('common.action') }
  ]);

  return (
    <div className="card">
      <Grid
        rows={languages.map(language => {
          const action = (
            <>
              <EditAction disabled />
              <DeleteAction className="ml-1" disabled />
            </>
          );
          return {
            id: language.id,
            name: language.name,
            code: language.code,
            action
          };
        })}
        columns={columns}>
        <Table />
        <TableHeaderRow />
      </Grid>
    </div>
  );
};

Language.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Language);
