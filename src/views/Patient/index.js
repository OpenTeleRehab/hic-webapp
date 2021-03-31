import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import CustomTable from 'components/Table';
import { getCountryName } from 'utils/country';
import { getClinicName, getClinicRegion } from 'utils/clinic';
import * as moment from 'moment';
import settings from 'settings';
import AgeCalculation from 'utils/age';
import { getPatients } from 'store/therapist/actions';
import { renderStatusBadge } from 'utils/treatmentPlan';
import { USER_GROUPS } from 'variables/user';

const Patient = ({ translate }) => {
  const dispatch = useDispatch();
  const patients = useSelector(state => state.patient.patients);
  const countries = useSelector(state => state.country.countries);
  const clinics = useSelector(state => state.clinic.clinics);

  const columns = [
    { name: 'identity', title: translate('common.id') },
    { name: 'date_of_birth', title: translate('common.date_of_birth') },
    { name: 'age', title: translate('common.age') },
    { name: 'country', title: translate('common.country') },
    { name: 'clinic', title: translate('common.clinic') },
    { name: 'region', title: translate('common.region') },
    { name: 'treatment_plan', title: translate('common.ongoing_treatment_plan') },
    { name: 'treatment_status', title: translate('common.ongoing_treatment_status') },
    { name: 'next_appointment', title: translate('common.next_appointment') }
  ];

  const columnExtensions = [
    { columnName: 'id', wordWrapEnabled: true },
    { columnName: 'treatment_plan', wordWrapEnabled: true },
    { columnName: 'treatment_status', wordWrapEnabled: true },
    { columnName: 'next_appointment', wordWrapEnabled: true }
  ];

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [orderBy] = useState('identity');

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, searchValue, filters]);

  useEffect(() => {
    dispatch(getPatients({
      page_size: pageSize,
      page: currentPage + 1,
      search_value: searchValue,
      order_by: orderBy,
      type: USER_GROUPS.GLOBAL_ADMIN,
      filters
    })).then(result => {
      if (result) {
        setTotalCount(result.total_count);
      }
    });
  }, [currentPage, pageSize, dispatch, filters, searchValue, orderBy]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{translate('therapist.management')}</h1>
      </div>
      <CustomTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        setSearchValue={setSearchValue}
        setFilters={setFilters}
        filters={filters}
        columns={columns}
        columnExtensions={columnExtensions}
        rows={patients.map(patient => {
          return {
            identity: patient.identity,
            email: patient.email,
            date_of_birth: patient.date_of_birth !== null ? moment(patient.date_of_birth, 'YYYY-MM-DD').format(settings.date_format) : '',
            age: patient.date_of_birth !== null ? AgeCalculation(patient.date_of_birth, translate) : '',
            country: getCountryName(patient.country_id, countries),
            clinic: getClinicName(patient.clinic_id, clinics),
            region: getClinicRegion(patient.clinic_id, clinics),
            treatment_plan: patient.upcomingTreatmentPlan ? patient.upcomingTreatmentPlan.name : '',
            treatment_status: renderStatusBadge(patient.upcomingTreatmentPlan),
            next_appointment: ''
          };
        })}
      />
    </>
  );
};

Patient.propTypes = {
  translate: PropTypes.func
};

export default Patient;
