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
import Dialog from 'components/Dialog';
import { useDispatch, useSelector } from 'react-redux';

import SearchInput from 'components/Form/SearchInput';
import { getQuestionnaires, deleteQuestionnaire } from 'store/questionnaire/actions';
import ViewQuestionnaire from './viewQuestionnaire';
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

let timer = null;
const Questionnaire = ({ translate }) => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    search_value: ''
  });
  const [language, setLanguage] = useState('');
  const { loading, questionnaires, filters } = useSelector(state => state.questionnaire);
  const { profile } = useSelector((state) => state.auth);
  const { categoryTreeData } = useSelector((state) => state.category);
  const [pageSize, setPageSize] = useState(8);
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [viewQuestionnaire, setViewQuestionnaire] = useState(false);
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
    dispatch(getCategoryTreeData({ type: CATEGORY_TYPES.QUESTIONNAIRE, lang: language }));
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
      dispatch(getQuestionnaires({
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

  const handleClose = () => {
    setId(null);
    setShow(false);
  };

  const handleConfirm = () => {
    dispatch(deleteQuestionnaire(id)).then(result => {
      if (result) {
        handleClose();
      }
    });
  };

  const handleView = (questionnaire) => {
    setQuestionnaire(questionnaire);
    setViewQuestionnaire(true);
  };

  const handleQuestionnaireViewClose = () => {
    setViewQuestionnaire(false);
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
          <Card bg="info">
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
                    <Col key={questionnaire.id} md={6} lg={3}>
                      <Card className="exercise-card shadow-sm mb-4">
                        <div id={`questionnaire-${questionnaire.id}`} className="card-container" onClick={() => handleView(questionnaire)}>
                          <div className="card-img bg-light">
                            <div className="w-100 h-100 px-2 py-4 text-center questionnaire-header">
                              <img src={'/images/questionnaire.svg'} alt='questionnaire' />
                              <p>{translate('activity.questionnaire').toUpperCase()}</p>
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
                              <b>{questionnaire.questions.length}</b> {translate('activity.questionnaire.questions')}
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
      <Dialog
        show={show}
        title={translate('questionnaire.delete_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handleClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handleConfirm}
      >
        <p>{translate('common.delete_confirmation_message')}</p>
      </Dialog>
      {viewQuestionnaire && <ViewQuestionnaire questionnaire={questionnaire} show={viewQuestionnaire} handleClose={handleQuestionnaireViewClose}/>}
    </>
  );
};

Questionnaire.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Questionnaire);