import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Row, Col, Card, Form, Accordion } from 'react-bootstrap';

import * as ROUTES from 'variables/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomTable from 'components/Table';
import { EditAction } from 'components/ActionIcons';
import SearchInput from 'components/Form/SearchInput';
import { getCategoryTreeData } from 'store/category/actions';
import { getContributors } from 'store/contributor/actions';
import { CATEGORY_TYPES } from 'variables/category';
import CheckboxTree from 'react-checkbox-tree';
import {
  BsCaretDownFill,
  BsCaretRightFill,
  BsSquare,
  BsDashSquare
} from 'react-icons/bs';
import { FaRegCheckSquare } from 'react-icons/fa';
import _ from 'lodash';
import { ContextAwareToggle } from 'components/Accordion/ContextAwareToggle';
import Select from 'react-select';
import scssColors from '../../../scss/custom.scss';
import { getExercises } from '../../../store/exercise/actions';
import { renderStatusBadge } from 'utils/resource';
import { getContributorName } from 'utils/contributor';

let timer = null;
const Exercise = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formFields, setFormFields] = useState({
    search_value: ''
  });
  const { languages } = useSelector(state => state.language);
  const { contributors } = useSelector(state => state.contributor);
  const [language, setLanguage] = useState('');
  const { exercises, filters } = useSelector(state => state.exercise);
  const { profile } = useSelector((state) => state.auth);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [pageSize, setPageSize] = useState(60);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    if (filters && filters.lang) {
      setLanguage(filters.lang);
    } else if (profile && profile.language_id) {
      setLanguage(profile.language_id);
    }
  }, [filters, profile]);

  useEffect(() => {
    dispatch(getContributors());
    dispatch(getCategoryTreeData({ type: CATEGORY_TYPES.EXERCISE, lang: language }));
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
  }, [language, formFields, selectedCategories, currentPage, pageSize, dispatch]);

  const handleClearSearch = () => {
    setFormFields({ ...formFields, search_value: '' });
    setCurrentPage(0);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    setCurrentPage(0);
  };

  const handleEdit = (id) => {
    history.push(ROUTES.EDUCATION_MATERIAL_EDIT.replace(':id', id));
  };

  const columns = [
    { name: 'title', title: translate('common.title') },
    { name: 'status', title: translate('common.status') },
    { name: 'uploaded_by', title: translate('common.uploaded_by') },
    { name: 'uploaded_date', title: translate('common.uploaded_date') },
    { name: 'approved_by', title: translate('common.approved_by') },
    { name: 'action', title: translate('common.need_action') }
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

  return (
    <>
      <Row>
        <Col sm={5} md={4} lg={3}>
          <Card bg="info">
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
                        <div className="ml-auto text-nowrap">
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
            </Card.Body>
          </Card>
        </Col>
        <Col sm={7} md={8} lg={9}>
          <CustomTable
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCount={totalCount}
            columns={columns}
            hideSearchFilter={true}
            rows={exercises.map(exercise => {
              const action = (
                <>
                  <EditAction onClick={() => handleEdit(exercise.id)} className="mr-1" />
                </>
              );
              return {
                title: exercise.title,
                status: renderStatusBadge(exercise),
                uploaded_by: getContributorName(exercise.uploaded_by, contributors),
                uploaded_date: '',
                approved_by: 'Test',
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
