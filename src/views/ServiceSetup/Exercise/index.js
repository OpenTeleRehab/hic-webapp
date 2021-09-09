import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import {
  Row,
  Col,
  Card,
  Form,
  Accordion,
  Button
} from 'react-bootstrap';

import * as ROUTES from 'variables/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomTable from 'components/Table';
import SearchInput from 'components/Form/SearchInput';
import { getCategoryTreeData } from 'store/category/actions';
import { getReviewers } from 'store/user/actions';
import { getContributors } from 'store/contributor/actions';
import { LIBRARY_TYPES } from 'variables/library';
import CheckboxTree from 'react-checkbox-tree';
import { BiEdit } from 'react-icons/bi';
import {
  BsCaretDownFill,
  BsCaretRightFill,
  BsSquare,
  BsDashSquare
} from 'react-icons/bs';
import { FaLanguage, FaRegCheckSquare } from 'react-icons/fa';
import _ from 'lodash';
import { ContextAwareToggle } from 'components/Accordion/ContextAwareToggle';
import Select from 'react-select';
import scssColors from 'scss/custom.scss';
import { getExercises, downloadExercises } from 'store/exercise/actions';
import { renderStatusBadge } from 'utils/resource';
import { STATUS } from 'variables/resourceStatus';

let timer = null;
const Exercise = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formFields, setFormFields] = useState({
    search_value: ''
  });
  const { languages } = useSelector(state => state.language);
  const [language, setLanguage] = useState('');
  const { exercises } = useSelector(state => state.exercise);
  const filterData = useSelector(state => state.exercise.filters);
  const { profile } = useSelector((state) => state.auth);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [pageSize, setPageSize] = useState(60);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [filters, setFilters] = useState([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, filters]);

  useEffect(() => {
    if (filterData && filterData.lang) {
      setLanguage(filterData.lang);
    } else if (profile && profile.language_id) {
      setLanguage(profile.language_id);
    }
  }, [filterData, profile]);

  useEffect(() => {
    dispatch(getCategoryTreeData({ type: LIBRARY_TYPES.EXERCISE, lang: language }));
    dispatch(getReviewers());
    dispatch(getContributors());
  }, [language, dispatch]);

  useEffect(() => {
    if (categoryTreeData.length) {
      const rootCategoryStructure = {};
      categoryTreeData.forEach(category => {
        rootCategoryStructure[category.value] = [];
      });
      setSelectedCategories(rootCategoryStructure);
    }
  }, [categoryTreeData]);

  useEffect(() => {
    let serializedSelectedCats = [];
    Object.keys(selectedCategories).forEach(function (key) {
      serializedSelectedCats = _.union(serializedSelectedCats, selectedCategories[key]);
    });

    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(getExercises({
        lang: language,
        filters: filters,
        filter: formFields,
        categories: serializedSelectedCats,
        page_size: pageSize,
        page: currentPage
      })).then(result => {
        if (result) {
          setTotalCount(result.total_count);
        }
      });
    }, 500);
  }, [language, formFields, filters, selectedCategories, currentPage, pageSize, dispatch]);

  const handleClearSearch = () => {
    setFormFields({ ...formFields, search_value: '' });
    setCurrentPage(0);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    setCurrentPage(0);
  };

  const handleRowClick = (row) => {
    history.push(ROUTES.ADMIN_RESOURCES_EDIT.replace(':id', row.id));
  };

  const columns = [
    { name: 'title', title: translate('common.title') },
    { name: 'status', title: translate('common.status') },
    { name: 'uploaded_by', title: translate('common.uploaded_by') },
    { name: 'uploaded_by_email', title: translate('common.uploaded_by_email') },
    { name: 'uploaded_date', title: translate('common.uploaded_date') },
    { name: 'reviewed_by', title: translate('common.reviewed_by') },
    { name: 'action', title: translate('common.need_action') }
  ];

  const columnExtensions = [
    { columnName: 'uploaded_by', wordWrapEnabled: true },
    { columnName: 'uploaded_by_email', wordWrapEnabled: true },
    { columnName: 'reviewed_by', wordWrapEnabled: true }
  ];

  const handleSetSelectedCategories = (parent, checked) => {
    setSelectedCategories({ ...selectedCategories, [parent]: checked.map(item => parseInt(item)) });
    setCurrentPage(0);
  };

  const customSelectStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: scssColors.infoLight
      }
    })
  };

  const handleDownload = () => {
    setDownloading(true);
    let serializedSelectedCats = [];
    Object.keys(selectedCategories).forEach(function (key) {
      serializedSelectedCats = _.union(serializedSelectedCats, selectedCategories[key]);
    });
    dispatch(downloadExercises({ lang: language, filter: formFields, categories: serializedSelectedCats }))
      .then(() => { setDownloading(false); });
  };

  return (
    <>
      <Row className="no-gutters bg-white">
        <Col sm={5} md={4} lg={3}>
          <Card bg="info h-100">
            <Card.Header>
              <SearchInput
                name="search_value"
                value={formFields.search_value}
                placeholder={translate('resource.search')}
                onChange={handleChange}
                onClear={handleClearSearch}
              />
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>{translate('common.language')}</Form.Label>
                <Select
                  classNamePrefix="filter"
                  value={languages.filter(option => option.id === language)}
                  getOptionLabel={option => option.name}
                  options={languages}
                  onChange={(e) => setLanguage(e.id)}
                  styles={customSelectStyles}
                />
              </Form.Group>
              <Accordion>
                {
                  categoryTreeData.map(category => (
                    <Card key={category.value} className="mb-3 rounded">
                      <Accordion.Toggle as={Card.Header} eventKey={category.value} className="d-flex align-items-center">
                        {category.label}
                        <div className="ml-auto -nowrap">
                          <span className="mr-3">
                            {selectedCategories[category.value] ? selectedCategories[category.value].length : 0}
                          </span>
                          <ContextAwareToggle eventKey={category.value} />
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={category.value}>
                        <Card.Body>
                          <CheckboxTree
                            nodes={category.children || []}
                            checked={selectedCategories[category.value] ? selectedCategories[category.value] : []}
                            expanded={expanded}
                            onCheck={checked => handleSetSelectedCategories(category.value, checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                              check: <FaRegCheckSquare size={40} color="black" />,
                              uncheck: <BsSquare size={40} color="black" />,
                              halfCheck: <BsDashSquare size={40} color="black" />,
                              expandClose: <BsCaretRightFill size={40} color="black" />,
                              expandOpen: <BsCaretDownFill size={40} color="black" />
                            }}
                            showNodeIcon={false}
                          />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  ))
                }
              </Accordion>
              <Button aria-label="Dowload Exercise" block onClick={() => handleDownload()} disabled={downloading}>
                {translate('exercise.download')}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={7} md={8} lg={9} className="p-4">
          <CustomTable
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setFilters={setFilters}
            filters={filters}
            totalCount={totalCount}
            columns={columns}
            columnExtensions={columnExtensions}
            hideSearchFilter={true}
            onRowClick={handleRowClick}
            rows={exercises.map(exercise => {
              const action = (
                <>
                  {exercise.status === STATUS.pending && <BiEdit size={26} className="btn-warning-info" />}
                  {!_.isEmpty(exercise.edit_translations) && exercise.status === STATUS.approved &&
                    <div className="d-flex justify-content-center align-items-center">
                      <span className="mr-2">{exercise.edit_translations.length}</span>
                      <FaLanguage size={26} className="btn-warning-info" />
                    </div>
                  }
                </>
              );
              return {
                id: exercise.id,
                title: exercise.title,
                status: renderStatusBadge(exercise),
                uploaded_by: <span className="resource-text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: exercise.uploaded_by
                  }}
                />,
                uploaded_by_email: <span className="resource-text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: exercise.uploaded_by_email
                  }}
                />,
                uploaded_date: exercise.uploaded_date,
                reviewed_by: <span className="resource-text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: exercise.reviewed_by
                  }}
                />,
                action
              };
            })}
          />
        </Col>
      </Row>
    </>
  );
};

Exercise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Exercise);
