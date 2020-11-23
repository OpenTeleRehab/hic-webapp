import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import CustomTable from 'components/Table';
import EnabledStatus from 'components/EnabledStatus';
import CreateTherapist from 'views/Therapist/create';
import { getTherapists } from 'store/therapist/actions';
import { getCountryName } from 'utils/country';
import { getClinicName } from 'utils/clinic';

const Therapist = ({ translate }) => {
  const dispatch = useDispatch();
  const therapists = useSelector(state => state.therapist.therapists);
  const countries = useSelector(state => state.country.countries);
  const clinics = useSelector(state => state.clinic.clinics);

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');

  const columns = [
    { name: 'id', title: 'ID' },
    { name: 'last_name', title: 'Last Name' },
    { name: 'first_name', title: 'First Name' },
    { name: 'email', title: 'Email' },
    { name: 'country', title: 'Country' },
    { name: 'clinic', title: 'Clinic' },
    { name: 'ongoing', title: 'Ongoing/ Patient limit' },
    { name: 'assigned_patients', title: 'Assigned Patients' },
    { name: 'status', title: 'Status' },
    { name: 'last_login', title: 'Last Login' },
    { name: 'action', title: 'Actions' }
  ];

  const columnExtensions = [
    { columnName: 'last_name', wordWrapEnabled: true },
    { columnName: 'first_name', wordWrapEnabled: true },
    { columnName: 'ongoing', wordWrapEnabled: true },
    { columnName: 'assigned_patients', wordWrapEnabled: true }
  ];

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, searchValue]);

  useEffect(() => {
    dispatch(getTherapists({
      search_value: searchValue,
      page_size: pageSize,
      page: currentPage + 1
    })).then(result => {
      if (result) {
        setTotalCount(result.total_count);
      }
    });
  }, [currentPage, pageSize, searchValue, dispatch]);

  const handleShow = () => setShow(true);

  const handleEdit = (id) => {
    setEditId(id);
    setShow(true);
  };

  const handleClose = () => {
    setEditId('');
    setShow(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{translate('therapist.management')}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" onClick={handleShow}>
            <BsPlus className="mr-1" />
            {translate('therapist.new')}
          </Button>
        </div>
      </div>

      {show && <CreateTherapist show={show} handleClose={handleClose} editId={editId} />}

      <CustomTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        setSearchValue={setSearchValue}
        columns={columns}
        columnExtensions={columnExtensions}
        rows={therapists.map(user => {
          const dropdown = (
            <DropdownButton alignRight variant="outline-dark" title={translate('common.actions')}>
              <Dropdown.Item onClick={() => handleEdit(user.id)}>{translate('common.edit_info')}</Dropdown.Item>
              <Dropdown.Item href="#/action-2">{translate('common.deactivate')}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">{translate('common.delete')}</Dropdown.Item>
            </DropdownButton>
          );

          return {
            id: user.identity,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            country: getCountryName(user.country_id, countries),
            clinic: getClinicName(user.clinic_id, clinics),
            status: <EnabledStatus enabled={user.enabled} />,
            last_login: '',
            action: dropdown
          };
        })}
      />
    </>
  );
};

Therapist.propTypes = {
  translate: PropTypes.func
};

export default Therapist;
