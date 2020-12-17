import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import CustomTable from 'components/Table';

const SystemLimit = ({ translate }) => {
  const columns = [
    { name: 'key', title: 'Key' },
    { name: 'en', title: 'English' },
    { name: 'km', title: 'Khmer' }
  ];

  const [showInlineEdited] = useState(true);

  const translations = [
    {
      key: 'common.user',
      en: 'User',
      km: 'អ្នកប្រើប្រាស់'
    },
    {
      key: 'common.first_name',
      en: 'First Name',
      km: 'នាម'
    },
    {
      key: 'common.last_name',
      en: 'Last Name',
      km: 'នាមត្រកូល'
    }
  ];

  const [editingStateColumnExtensions] = useState([
    { columnName: 'key', editingEnabled: false }
  ]);

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, searchValue, filters]);

  return (
    <>
      {translate('setting.translations.platform')}
      <CustomTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSearchValue={setSearchValue}
        setFilters={setFilters}
        filters={filters}
        columns={columns}
        showInlineEdited={showInlineEdited}
        editingStateColumnExtensions={editingStateColumnExtensions}

        rows={translations.map(translation => {
          return {
            key: translation.key,
            en: translation.en,
            km: translation.km
          };
        })}
      />
    </>
  );
};

SystemLimit.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(SystemLimit);
