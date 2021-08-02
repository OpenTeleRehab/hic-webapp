import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import {
  Row,
  Col,
  Card,
  Tooltip,
  OverlayTrigger,
  Accordion,
  Button
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  downloadExercises,
  getExercises
} from 'store/exercise/actions';
import SearchInput from 'components/Form/SearchInput';
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
import InfiniteScroll from 'react-infinite-scroll-component';
import * as ROUTES from 'variables/routes';
import { useHistory } from 'react-router-dom';

let timer = null;
const Exercise = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, exercises, filters } = useSelector(state => state.exercise);
  const { profile } = useSelector((state) => state.auth);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [pageSize, setPageSize] = useState(8);
  const [language, setLanguage] = useState('');
  const [formFields, setFormFields] = useState({
    search_value: ''
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (filters && filters.lang) {
      setLanguage(filters.lang);
    } else if (profile && profile.language_id) {
      setLanguage(profile.language_id);
    }
  }, [filters, profile]);

  useEffect(() => {
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
        page_size: pageSize
      }));
    }, 500);
  }, [language, formFields, selectedCategories, pageSize, dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    setPageSize(8);
  };

  const handleClearSearch = () => {
    setFormFields({ ...formFields, search_value: '' });
    setPageSize(8);
  };

  const handleSetSelectedCategories = (parent, checked) => {
    setSelectedCategories({ ...selectedCategories, [parent]: checked.map(item => parseInt(item)) });
    setPageSize(8);
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

  const fetchMoreData = () => {
    setPageSize(pageSize + 8);
  };

  const handleViewDetail = (id) => {
    history.push(ROUTES.LIBRARY_EXERCISE_DETAIL.replace(':id', id));
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
                placeholder={translate('exercise.search')}
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
              <Button block onClick={() => handleDownload()} disabled={downloading}>
                {translate('exercise.download')}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={7} md={8} lg={9}>
          { exercises.length === 0 && (
            <div className="card h-100 d-flex justify-content-center align-items-center">
              <big className="text-muted">{translate('common.no_data')}</big>
            </div>
          )}
          { exercises.length > 0 && (
            <>
              <InfiniteScroll
                dataLength={exercises.length}
                next={fetchMoreData}
                hasMore={true}
                loader={loading && <h4>Loading...</h4>}
                style={{ overflowX: 'hidden' }}
                scrollThreshold="100px"
              >
                <Row>
                  { exercises.map(exercise => (
                    <Col key={exercise.id} md={6} lg={3}>
                      <Card className="exercise-card shadow-sm mb-4">
                        <div className="card-img bg-light">
                          {
                            exercise.files.length > 0 && (
                              (exercise.files[0].fileType === 'audio/mpeg' &&
                                <div className="w-100 pt-5 pl-3 pr-3">
                                  <audio controls className="w-100">
                                    <source src={`${process.env.REACT_APP_API_BASE_URL}/file/${exercise.files[0].id}`} type="audio/ogg" />
                                  </audio>
                                </div>
                              ) ||
                              (exercise.files[0].fileType === 'video/mp4' &&
                                <img className="img-fluid mx-auto d-block" src={`${process.env.REACT_APP_API_BASE_URL}/file/${exercise.files[0].id}?thumbnail=1`} alt="Exercise"
                                />
                              ) ||
                              ((exercise.files[0].fileType !== 'audio/mpeg' && exercise.files[0].fileType !== 'video/mp4') &&
                                <img className="img-fluid mx-auto d-block" src={`${process.env.REACT_APP_API_BASE_URL}/file/${exercise.files[0].id}`} alt="Exercise"
                                />
                              )
                            )
                          }
                        </div>
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <Card.Title>
                            {
                              exercise.title.length <= 50
                                ? <h5 className="card-title">{ exercise.title }</h5>
                                : (
                                  <OverlayTrigger
                                    overlay={<Tooltip id="button-tooltip-2">{ exercise.title }</Tooltip>}
                                  >
                                    <h5 className="card-title">{ exercise.title }</h5>
                                  </OverlayTrigger>
                                )
                            }
                          </Card.Title>
                          {exercise.sets > 0 && (
                            <Card.Text>
                              {translate('exercise.number_of_sets_and_reps', { sets: exercise.sets, reps: exercise.reps })}
                            </Card.Text>
                          )}
                        </Card.Body>
                        <Card.Footer>
                          <Button variant="link" className="text-decoration-none" onClick={() => handleViewDetail(exercise.id)}>{translate('exercise.learn_more')}</Button>
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

Exercise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Exercise);
