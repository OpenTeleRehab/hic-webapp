import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

import {
  Accordion,
  AccordionContext,
  Button,
  Card,
  CardGroup, useAccordionToggle
} from 'react-bootstrap';
import { BsPlus } from 'react-icons/all';
import _ from 'lodash';

import { EditAction } from 'components/ActionIcons';
import SubCategoryList from '../_Partials/subCategoryList';
import Create from '../_Partials/Create';
import SubCategoryCard from '../_Partials/SubCategoryCard';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { getCategories } from 'store/category/actions';
import { useDispatch, useSelector } from 'react-redux';

const CategoryList = ({ type, translate }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [editId, setEditId] = useState('');
  const [show, setShow] = useState(false);
  const [activeSub1, setActiveSub1] = useState(undefined);
  const [activeSub2, setActiveSub2] = useState(undefined);
  const [activeCategory, setActiveCategory] = useState('');
  const [allowNew, setAllowNew] = useState(true);

  useEffect(() => {
    if (activeSub1) {
      const subCategories = _.filter(categories, { parent: activeSub1.id });
      if (subCategories.length === 0) {
        setActiveSub2(undefined);
      }
    }
  }, [activeSub1, categories]);

  useEffect(() => {
    if (type) {
      dispatch(getCategories({ type }));
    }
  }, [type, dispatch]);

  const handleClose = () => {
    setEditId('');
    setShow(false);
  };

  const handleCreate = (parentId, allowNew = true) => {
    setActiveCategory(parentId);
    setAllowNew(allowNew);
    setShow(true);
  };

  const handleEdit = (id) => {
    setAllowNew(true);
    setEditId(id);
    setShow(true);
  };

  return (
    <>
      <CardGroup className="category-container">
        <Card>
          <Card.Header className="pl-2 d-flex justify-content-between align-items-start">
            <h5 className="m-0 text-truncate">{translate('category')}</h5>
            <Button
              variant="outline-primary"
              className="btn-circle float-right"
              onClick={() => handleCreate(activeSub1 ? activeSub1.parent : '')}
            >
              <BsPlus size={20} />
            </Button>
          </Card.Header>
          <Card.Body className="px-2">
            {categories.length > 0 && (
              <>
                <strong>3 categories, 18 sub-categories</strong>
                {_.filter(categories, { parent: null }).map(category => {
                  const subCategories = _.filter(categories, { parent: category.id });
                  return (
                    <Accordion key={category.id}>
                      <Card className="mb-2 shadow-sm">
                        <Card.Header className="bg-white pl-2 d-flex justify-content-between align-items-start">
                          <h5 className="m-0">
                            <CustomToggle eventKey={category.id} />
                            {category.title} ({subCategories.length})
                          </h5>
                          <EditAction onClick={() => handleEdit(category.id)} />
                        </Card.Header>
                        {subCategories.length > 0 && (
                          <Accordion.Collapse eventKey={category.id}>
                            <Card.Body className="p-0 pl-2">
                              <SubCategoryList
                                subCategories={subCategories}
                                categories={categories}
                                active={activeSub1}
                                setActive={setActiveSub1}
                                handleEdit={handleEdit}
                              />
                            </Card.Body>
                          </Accordion.Collapse>
                        )}
                      </Card>
                    </Accordion>
                  );
                })}
              </>
            )}
          </Card.Body>
        </Card>
        <SubCategoryCard
          categories={categories}
          activeCategory={activeSub1}
          active={activeSub2}
          setActive={setActiveSub2}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
        />
        <SubCategoryCard
          categories={categories}
          activeCategory={activeSub2}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
        />
      </CardGroup>

      {show &&
        <Create
          show={show}
          editId={editId}
          handleClose={handleClose}
          type={type}
          activeCategory={activeCategory}
          allowNew={allowNew}
        />
      }
    </>
  );
};

CategoryList.propTypes = {
  type: PropTypes.string,
  translate: PropTypes.func
};

export default withLocalize(CategoryList);

const CustomToggle = ({ eventKey }) => {
  const currentEventKey = useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(eventKey);

  return (
    <Button variant="link" className="mr-2 py-0 px-1" onClick={decoratedOnClick}>
      {currentEventKey === eventKey ? (
        <BsChevronDown className="ml-auto" />
      ) : (
        <BsChevronRight className="ml-auto" />
      )}
    </Button>
  );
};

CustomToggle.propTypes = {
  eventKey: PropTypes.string
};
