import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import {
  Row,
  Col,
  Card,
  Accordion,
  OverlayTrigger,
  Tooltip, Button
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import SearchInput from 'components/Form/SearchInput';
import { getEducationMaterials } from 'store/educationMaterial/actions';
import { getCategoryTreeData } from 'store/category/actions';
import { LIBRARY_TYPES } from 'variables/library';
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
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../../../variables/routes';
import { replaceRoute } from '../../../../utils/route';

let timer = null;
const EducationMaterial = ({ translate, lang }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, educationMaterials, filters } = useSelector(state => state.educationMaterial);
  const { activeLanguage } = useSelector((state) => state.language);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [formFields, setFormFields] = useState({
    search_value: ''
  });
  const [pageSize, setPageSize] = useState(9);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    dispatch(getCategoryTreeData({ type: LIBRARY_TYPES.MATERIAL, lang: lang }));
  }, [lang, dispatch]);

  useEffect(() => {
    if (filters.filter && filters.filter.search_value && filters.filter.type) {
      setFormFields({ ...formFields, search_value: filters.filter.search_value });
    }
    // eslint-disable-next-line
  }, [filters]);

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
        lang: lang,
        filter: formFields,
        categories: serializedSelectedCats,
        page_size: pageSize
      }));
    }, 500);
  }, [lang, formFields, selectedCategories, pageSize, dispatch]);

  const handleClearSearch = () => {
    setFormFields({ ...formFields, search_value: '' });
    setPageSize(8);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    setPageSize(8);
  };

  const handleSetSelectedCategories = (parent, checked) => {
    setSelectedCategories({ ...selectedCategories, [parent]: checked.map(item => parseInt(item)) });
    setPageSize(8);
  };

  const fetchMoreData = () => {
    setPageSize(pageSize + 8);
  };

  const handleViewDetail = (id) => {
    history.push(replaceRoute(ROUTES.LIBRARY_EDUCATION_MATERIAL_DETAIL, activeLanguage).replace(':id', id));
  };

  return (
    <>
      <Row>
        <Col sm={5} md={4} lg={ window.screen.width >= 1920 ? 2 : 3 } xl={window.screen.width >= 2020 && 2} className="mb-3">
          <Card bg="info" className="filter-sidebar">
            <Card.Header>
              <SearchInput
                name="search_value"
                value={formFields.search_value}
                placeholder={translate('education_material.search')}
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
        <Col sm={7} md={8} lg={window.screen.width >= 1920 ? 10 : 9} xl={window.screen.width >= 2020 && 10}>
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
                    <Col key={material.id} md={6} lg={4} xl={window.screen.width >= 2020 && 2} className="card-wrapper">
                      <Card className="exercise-card shadow-sm mb-4" onClick={() => handleViewDetail(material.id)}>
                        <div className="card-img bg-light">
                          {(material.file && (material.file.hasThumbnail || material.file.fileGroupType === MATERIAL_TYPE.image)) ? (
                            <img
                              className="img-fluid mx-auto d-block"
                              src={`${process.env.REACT_APP_API_BASE_URL}/file/${material.file.id}?thumbnail=${material.file.hasThumbnail}`}
                              alt="Material"
                            />
                          ) : (
                            <div className="w-100 h-100 px-2 py-4 text-white bg-primary text-center">
                              <img src={'/images/education-material-icon.svg'} alt="Education Material" height={64} />
                              <p className="mt-2">{translate('library.material').toUpperCase()}</p>
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
                        <Card.Footer>
                          <Button variant="link" className="text-decoration-none">{translate('exercise.learn_more')}</Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </InfiniteScroll>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

EducationMaterial.propTypes = {
  translate: PropTypes.func,
  lang: PropTypes.number
};

export default withLocalize(EducationMaterial);
