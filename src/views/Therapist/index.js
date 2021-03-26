import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import CustomTable from 'components/Table';
import EnabledStatus from 'components/EnabledStatus';
import { DeleteAction, EditAction, EnabledAction, DisabledAction } from 'components/ActionIcons';
import CreateTherapist from 'views/Therapist/create';
import { getTherapists, deleteTherapistUser, getPatients, updateTherapistStatus } from 'store/therapist/actions';
import { getCountryName } from 'utils/country';
import { getClinicName } from 'utils/clinic';
import * as moment from 'moment';
import settings from 'settings';
import Dialog from 'components/Dialog';

import { getPatient } from 'utils/patient';

let timer = null;

const Therapist = ({ translate }) => {
  const dispatch = useDispatch();
  const therapists = useSelector(state => state.therapist.therapists);
  const patients = useSelector(state => state.patient.patients);
  const countries = useSelector(state => state.country.countries);
  const clinics = useSelector(state => state.clinic.clinics);
  const { profile } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');

  const [formFields, setFormFields] = useState({
    enabled: 0
  });

  const columns = [
    { name: 'id', title: translate('common.id') },
    { name: 'last_name', title: translate('common.last_name') },
    { name: 'first_name', title: translate('common.first_name') },
    { name: 'email', title: translate('common.email') },
    { name: 'country', title: translate('common.country') },
    { name: 'clinic', title: translate('common.clinic') },
    { name: 'limit_patient', title: translate('common.on_going.treatment_let') },
    { name: 'assigned_patients', title: translate('common.assign_patient') },
    { name: 'status', title: translate('common.status') },
    { name: 'last_login', title: translate('common.last_login') },
    { name: 'action', title: translate('common.action') }
  ];

  const columnExtensions = [
    { columnName: 'last_name', wordWrapEnabled: true },
    { columnName: 'first_name', wordWrapEnabled: true },
    { columnName: 'limit_patient', wordWrapEnabled: true },
    { columnName: 'assigned_patients', wordWrapEnabled: true },
    { columnName: 'last_login', wordWrapEnabled: true, width: 250 }
  ];

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSwitchStatusDialog, setShowSwitchStatusDialog] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, searchValue, filters]);

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(getTherapists({
        clinic_id: profile.clinic_id,
        filters,
        search_value: searchValue,
        page_size: pageSize,
        page: currentPage + 1
      })).then(result => {
        if (result) {
          setTotalCount(result.total_count);
        }
      });
    }, 500);
  }, [currentPage, pageSize, searchValue, filters, dispatch, profile.clinic_id]);

  const handleShow = () => setShow(true);

  const handleEdit = (id) => {
    setEditId(id);
    setShow(true);
  };

  const handleClose = () => {
    setEditId('');
    setShow(false);
  };

  const handleDelete = (id) => {
    setId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setId(null);
    setShowDeleteDialog(false);
  };

  const handleDeleteDialogConfirm = () => {
    dispatch(deleteTherapistUser(id)).then(result => {
      if (result) {
        handleDeleteDialogClose();
      }
    });
  };

  const handleSwitchStatus = (id, enabled) => {
    setId(id);
    setFormFields({ ...formFields, enabled: enabled });
    setShowSwitchStatusDialog(true);
  };

  const handleSwitchStatusDialogClose = () => {
    setId(null);
    setShowSwitchStatusDialog(false);
  };

  const handleSwitchStatusDialogConfirm = () => {
    dispatch(updateTherapistStatus(id, formFields)).then(result => {
      if (result) {
        handleSwitchStatusDialogClose();
      }
    });
  };

  useEffect(() => {
    dispatch(getPatients({
      page_size: pageSize,
      page: currentPage + 1
    }));
  }, [currentPage, pageSize, dispatch]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{translate('therapist.management')}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" onClick={handleShow}>
            <BsPlus size={20} className="mr-1" />
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
        setFilters={setFilters}
        filters={filters}
        columns={columns}
        columnExtensions={columnExtensions}
        rows={therapists.map(user => {
          const action = (
            <>
              {user.enabled
                ? <EnabledAction onClick={() => handleSwitchStatus(user.id, 0)} disabled={!!getPatient(user.id, patients)}/>
                : <DisabledAction onClick={() => handleSwitchStatus(user.id, 1)} disabled={!!getPatient(user.id, patients)} />
              }
              <EditAction onClick={() => handleEdit(user.id)} />
              <DeleteAction className="ml-1" onClick={() => handleDelete(user.id)} disabled={!!getPatient(user.id, patients) || user.enabled }/>
            </>
          );

          return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            country: getCountryName(user.country_id, countries),
            clinic: getClinicName(user.clinic_id, clinics),
            status: <EnabledStatus enabled={user.enabled} />,
            last_login: user.last_login ? moment(user.last_login).format(settings.date_format + ' hh:mm A') : '',
            action
          };
        })}
      />
      <Dialog
        show={showDeleteDialog}
        title={translate('therapist.delete_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handleDeleteDialogClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handleDeleteDialogConfirm}
      >
        <p>{translate('common.delete_confirmation_message')}</p>
      </Dialog>
      <Dialog
        show={showSwitchStatusDialog}
        title={translate('user.switchStatus_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handleSwitchStatusDialogClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handleSwitchStatusDialogConfirm}
      >
        <p>{translate('common.switchStatus_confirmation_message')}</p>
      </Dialog>
    </>
  );
};

Therapist.propTypes = {
  translate: PropTypes.func
};

export default Therapist;
