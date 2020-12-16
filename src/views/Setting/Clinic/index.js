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
import { getCountryISO } from 'utils/country';

const Clinic = ({ translate }) => {
  const clinics = useSelector(state => state.clinic.clinics);
  const countries = useSelector(state => state.country.countries);

  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'name', title: 'Name' },
    { name: 'country_iso', title: 'Country ISO code' },
    { name: 'region', title: 'Region / State' },
    { name: 'province', title: 'Province' },
    { name: 'city', title: 'City' },
    { name: 'action', title: 'Action' }
  ]);

  return (
    <div className="card">
      <Grid
        rows={clinics.map(clinic => {
          const action = (
            <>
              <EditAction disabled />
              <DeleteAction className="ml-1" disabled />
            </>
          );
          return {
            id: clinic.identity,
            name: clinic.name,
            country_iso: getCountryISO(clinic.country_id, countries),
            region: clinic.region,
            province: clinic.province,
            city: clinic.city,
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

Clinic.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Clinic);
