import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';

import CustomTable from 'components/Table';
import settings from 'settings';
import { getLocalizations, updateLocalization } from 'store/localization/actions';
import Spinner from 'react-bootstrap/Spinner';

const Translation = ({ translate }) => {
  const dispatch = useDispatch();
  const { localizations, loading } = useSelector(state => state.localization);
  const languages = useSelector(state => state.language.languages);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [filterPlatform, setFilterPlatform] = useState(settings.platforms.options[0].value);
  const [filterValue, setFilterValue] = useState('');
  const [filters, setFilters] = useState([]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [showInlineEdited] = useState(true);
  const [editingStateColumnExtensions] = useState([
    { columnName: 'key', editingEnabled: false }
  ]);

  useEffect(() => {
    dispatch(getLocalizations({
      filter_value: filterValue,
      filter_platform: filterPlatform,
      filters: filters,
      page_size: pageSize,
      page: currentPage
    })).then(result => {
      if (result) {
        setTotalCount(result.total_count);
      }
    });
  }, [currentPage, pageSize, filterValue, filters, filterPlatform, dispatch]);

  const handleChange = e => {
    setFilterPlatform(e.target.value);
  };

  const commitChanges = ({ changed }) => {
    if (changed && editingRowIds) {
      const changedRows = localizations.map((row, index) => (changed[index] ? { ...row, ...changed[index] } : row));
      console.log(changedRows);
      console.log(changedRows[editingRowIds]);
      dispatch(updateLocalization(changedRows[editingRowIds].id, Object.values(changed)[0]));
    }
  };

  const columns = [
    { name: 'key', title: translate('common.key') },
    { name: 'en', title: translate('common.english') }
  ];

  languages.forEach(lang => {
    if (lang.code === 'en') {
      languages.splice(lang.code, 1);
    }
    columns.push({ name: lang.code, title: lang.name });
  });

  return (
    <>
      <Form>
        <Form.Row>
          <Form.Group controlId="formEmail" className="col-md-4">
            <Form.Label>{translate('setting.translations.platform')}</Form.Label>
            <Form.Control
              name="platform"
              as="select"
              value={filterPlatform}
              onChange={handleChange}
            >
              {settings.platforms.options.map((platform, index) => (
                <option key={index} value={platform.value}>{platform.text}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form>
      <CustomTable
        totalCount={totalCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSearchValue={setFilterValue}
        setFilters={setFilters}
        filters={filters}
        columns={columns}
        showInlineEdited={showInlineEdited}
        editingStateColumnExtensions={editingStateColumnExtensions}
        commitChanges={commitChanges}
        editingRowIds={editingRowIds}
        setEditingRowIds={setEditingRowIds}
        rows={localizations.map(localization => {
          const data = {
            key: localization.key,
            en: localization.en
          };
          languages.forEach(lang => {
            data[lang.code] = localization[lang.code] || '';
          });
          return data;
        })}
      />
      { loading && <Spinner className="loading-icon" animation="border" variant="primary" /> }
    </>
  );
};

Translation.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Translation);
