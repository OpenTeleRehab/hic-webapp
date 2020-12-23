import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';

import CustomTable from 'components/Table';
import settings from 'settings';
import { getLocalizations } from 'store/localization/actions';

let timer = null;
const SystemLimit = ({ translate }) => {
  const localizations = useSelector(state => state.localization.localizations);

  const columns = [
    { name: 'key', title: translate('common.key') },
    { name: 'value', title: translate('common.english') }
  ];

  const [showInlineEdited] = useState(true);

  const [editingStateColumnExtensions] = useState([
    { columnName: 'key', editingEnabled: false }
  ]);

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState(settings.platforms.options[0].value);
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({
    platform: ''
  });

  useEffect(() => {
    setCurrentPage(0);
    setFilterValue(formFields.platform);
  }, [pageSize, searchValue, filters, filterValue, formFields]);

  useEffect(() => {
    if (searchValue || filters.length) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(getLocalizations({
          search_value: searchValue,
          filter_value: filterValue,
          filters: filters,
          page_size: pageSize,
          page: currentPage + 1
        }));
      }, 500);
    } else {
      dispatch(getLocalizations({
        search_value: searchValue,
        filter_value: filterValue,
        filters: filters,
        page_size: pageSize,
        page: currentPage + 1
      }));
    }
  }, [currentPage, pageSize, searchValue, filters, filterValue, dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <Form>
        <Form.Row>
          <Form.Group controlId="formEmail" className="col-md-4">
            <Form.Label>{translate('setting.translations.platform')}</Form.Label>
            <Form.Control
              name="platform"
              as="select"
              value={formFields.platform}
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
        rows={localizations.map(localization => {
          return {
            key: localization.key,
            value: localization.value
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
