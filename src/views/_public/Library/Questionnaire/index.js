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
import { getQuestionnaires } from 'store/questionnaire/actions';
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
import { replaceRoute } from '../../../../utils/route';
import * as ROUTES from '../../../../variables/routes';
import { useHistory } from 'react-router-dom';

let timer = null;
const Questionnaire = ({ translate, lang }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formFields, setFormFields] = useState({
    search_value: ''
  });
  const { activeLanguage } = useSelector(state => state.language);
  const { loading, questionnaires } = useSelector(state => state.questionnaire);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [pageSize, setPageSize] = useState(9);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    dispatch(getCategoryTreeData({ type: CATEGORY_TYPES.QUESTIONNAIRE, lang: lang }));
  }, [lang, dispatch]);

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
      dispatch(getQuestionnaires({
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
    history.push(replaceRoute(ROUTES.LIBRARY_QUESTIONNAIRE_DETAIL, activeLanguage).replace(':id', id));
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
                placeholder={translate('questionnaire.search')}
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
                            nodes={category.children || [] }
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
          { questionnaires.length === 0 && (
            <div className="card h-100 d-flex justify-content-center align-items-center">
              <big className="text-muted">{translate('common.no_data')}</big>
            </div>
          )}
          { questionnaires.length > 0 && (
            <>
              <InfiniteScroll
                dataLength={questionnaires.length}
                next={fetchMoreData}
                hasMore={true}
                loader={loading && <h4>Loading...</h4>}
                style={{ overflowX: 'hidden' }}
              >
                <Row>
                  { questionnaires.map(questionnaire => (
                    <Col key={questionnaire.id} md={6} lg={4}>
                      <Card className="exercise-card shadow-sm mb-4" onClick={() => handleViewDetail(questionnaire.id)}>
                        <div className="card-img bg-light">
                          <div className="w-100 h-100 px-2 py-4 text-center questionnaire-header">
                            <img src={'/images/questionnaire-icon.svg'} alt="Questionnaire" />
                            <p>{translate('library.questionnaire').toUpperCase()}</p>
                          </div>
                        </div>
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <Card.Title>
                            {
                              questionnaire.title.length <= 50
                                ? <h5 className="card-title">
                                  { questionnaire.title }
                                </h5>
                                : (
                                  <OverlayTrigger
                                    overlay={<Tooltip id="button-tooltip-2">{ questionnaire.title }</Tooltip>}
                                  >
                                    <h5 className="card-title">
                                      { questionnaire.title }
                                    </h5>
                                  </OverlayTrigger>
                                )
                            }
                          </Card.Title>
                          <Card.Text>
                            <b>{questionnaire.questions.length}</b> {translate('questionnaire.questions')}
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

Questionnaire.propTypes = {
  translate: PropTypes.func,
  lang: PropTypes.number
};

export default withLocalize(Questionnaire);
