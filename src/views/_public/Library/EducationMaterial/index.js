import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import {
  Row,
  Col,
  Card,
  Accordion,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import SearchInput from 'components/Form/SearchInput';
import { getEducationMaterials } from 'store/educationMaterial/actions';
import ViewEducationMaterial from './view';
import { getCategoryTreeData } from 'store/category/actions';
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
import { MATERIAL_TYPE } from '../../../../variables/activity';
import InfiniteScroll from 'react-infinite-scroll-component';

let timer = null;
const EducationMaterial = ({ translate }) => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    search_value: ''
  });
  const [language, setLanguage] = useState('');
  const { loading, educationMaterials, filters } = useSelector(state => state.educationMaterial);
  const { profile } = useSelector((state) => state.auth);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [pageSize, setPageSize] = useState(9);
  const [id, setId] = useState(null);
  const [showView, setShowView] = useState(false);
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
    dispatch(getCategoryTreeData({ type: CATEGORY_TYPES.MATERIAL, lang: language }));
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
      dispatch(getEducationMaterials({
        lang: language,
        filter: formFields,
        categories: serializedSelectedCats,
        page_size: pageSize
      }));
    }, 500);
  }, [language, formFields, selectedCategories, pageSize, dispatch]);

  const handleClearSearch = () => {
    setFormFields({ ...formFields, search_value: '' });
    setPageSize(8);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    setPageSize(8);
  };

  const handleView = (id) => {
    setId(id);
    setShowView(true);
  };

  const handleViewClose = () => {
    setId('');
    setShowView(false);
  };

  const handleSetSelectedCategories = (parent, checked) => {
    setSelectedCategories({ ...selectedCategories, [parent]: checked.map(item => parseInt(item)) });
    setPageSize(8);
  };

  const fetchMoreData = () => {
    setPageSize(pageSize + 8);
  };

  return (
    <>
      <Row>
        <Col sm={5} md={4} lg={3}>
          <Card bg="info" className="filter-sidebar">
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
          { educationMaterials.length === 0 && (
            <div className="card h-100 d-flex justify-content-center align-items-center">
              <big className="text-muted">{translate('common.no_data')}</big>
            </div>
          )}
          { educationMaterials.length > 0 && (
            <>
              <InfiniteScroll
                dataLength={educationMaterials.length}
                next={fetchMoreData}
                hasMore={true}
                loader={loading && <h4>Loading...</h4>}
                style={{ overflowX: 'hidden' }}
              >
                <Row>
                  { educationMaterials.map(material => (
                    <Col key={material.id} md={6} lg={4}>
                      <Card className="exercise-card shadow-sm mb-4">
                        <div id={`material-${material.id}`} className="card-container" onClick={() => handleView(material.id)}>
                          <div className="card-img bg-light">
                            {(material.file && (material.file.hasThumbnail || material.file.fileGroupType === MATERIAL_TYPE.image)) ? (
                              <img
                                className="img-fluid mx-auto d-block"
                                src={`${process.env.REACT_APP_ADMIN_API_BASE_URL}/file/${material.file.id}?thumbnail=${material.file.hasThumbnail}`}
                                alt="Material"
                              />
                            ) : (
                              <div className="w-100 h-100 px-2 py-4 text-white bg-primary text-center">
                                <img src={'/images/education-material-icon.svg'} alt="Education Material" height={64} />
                                <p>{translate('activity.material').toUpperCase()}</p>
                              </div>
                            )}
                          </div>
                          <Card.Body className="d-flex flex-column justify-content-between">
                            <Card.Title>
                              {
                                material.title.length <= 50
                                  ? <h5 className="card-title">
                                    { material.title }
                                  </h5>
                                  : (
                                    <OverlayTrigger
                                      overlay={<Tooltip id="button-tooltip-2">{ material.title }</Tooltip>}
                                    >
                                      <h5 className="card-title">
                                        { material.title }
                                      </h5>
                                    </OverlayTrigger>
                                  )
                              }
                            </Card.Title>
                            <Card.Text>
                              {material.file ? translate(material.file.fileGroupType) : ''}
                            </Card.Text>
                          </Card.Body>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </InfiniteScroll>
            </>
          )}
        </Col>
      </Row>
      {showView && <ViewEducationMaterial showView={showView} handleViewClose={handleViewClose} id={id} />}
    </>
  );
};

EducationMaterial.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(EducationMaterial);
