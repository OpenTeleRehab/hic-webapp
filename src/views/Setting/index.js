import { EditAction } from 'components/ActionIcons';
import CustomTable from 'components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMfaSettings } from 'store/mfaSetting/actions';
import CreateOrEdit from './_Partials/CreateOrEdit';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { useJobStatuses } from 'hook/useJobStatus';
import { Badge, Spinner } from 'react-bootstrap';

let timer = null;
const Setting = ({ translate }) => {
  const dispatch = useDispatch();
  const mfaSettings = useSelector(state => state.mfaSetting.mfaSettings);
  const [pageSize, setPageSize] = useState(60);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState([]);
  const [show, setShow] = useState(false);
  const [existingRecord, setExistingRecord] = useState(null);
  const jobIds = useMemo(() =>
    mfaSettings
      ? mfaSettings.map(mfa => mfa.job_status && mfa.job_status.job_id)
      : [],
  [mfaSettings]);

  const jobStatuses = useJobStatuses(jobIds);

  const rows = useMemo(() => {
    return (mfaSettings || []).map(mfaSetting => ({
      ...mfaSetting,
      progress_status: !mfaSetting.job_status
        ? 'completed'
        : jobStatuses[mfaSetting.job_status.job_id] || 'in_progress'
    }));
  }, [mfaSettings, jobStatuses]);

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(getMfaSettings({
        search_value: searchValue,
        filters: filters,
        page_size: pageSize,
        page: currentPage + 1
      })).then(result => {
        if (result) {
          setTotalCount(result.total_count);
        }
      });
    }, 500);
  }, [currentPage, pageSize, searchValue, filters, dispatch]);

  const columns = [
    { name: 'user_type', title: translate('common.user.type') },
    { name: 'mfa_enforcement', title: translate('mfa.enforcement') },
    { name: 'mfa_expiration_duration', title: translate('mfa.expiration.duration') },
    { name: 'skip_mfa_setup_duration', title: translate('mfa.skip.setup.duration') },
    { name: 'process_status', title: translate('mfa.progress.status') },
    { name: 'action', title: translate('common.action') }
  ];

  const handleEdit = (record) => {
    setExistingRecord(record);
    setShow(true);
  };

  const handleClose = () => {
    setExistingRecord(null);
    setShow(false);
  };

  return (
    <>
      <div className='no-gutters bg-white p-md-3'>
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
          rows={rows.map(mfaSetting => {
            const action = (
              <div className='d-flex justify-content-center'>
                <EditAction onClick={() => handleEdit(mfaSetting)} />
              </div>
            );

            return {
              user_type: <Translate id={`common.${mfaSetting.user_type}`} />,
              mfa_enforcement: <Translate id={`mfa.enforcement.${mfaSetting.mfa_enforcement}`} />,
              mfa_expiration_duration: mfaSetting.mfa_expiration_duration,
              skip_mfa_setup_duration: mfaSetting.skip_mfa_setup_duration,
              process_status: mfaSetting.progress_status === 'completed' ? (
                <Badge pill variant="success">
                  <Translate id="mfa.progress.status.completed" />
                </Badge>
              ) : mfaSetting.progress_status === 'failed' ? (
                <Badge pill variant="danger">
                  <Translate id={`mfa.progress.status.${mfaSetting.mfa_enforcement}`} />
                </Badge>
              ) : (
                <Spinner animation="border" size="sm" variant="primary" />
              ),
              action
            };
          })}
        />
      </div>
      {show && <CreateOrEdit handleClose={handleClose} show={show} existingRecord={existingRecord} />}
    </>
  );
};

Setting.propTypes = {
  translate: PropTypes.func
};

export default Setting;
