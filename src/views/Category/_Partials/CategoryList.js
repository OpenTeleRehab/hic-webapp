import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionContext,
  Button,
  Card,
  CardGroup,
  useAccordionToggle
} from 'react-bootstrap';
import { BsChevronDown, BsChevronRight, BsPlus } from 'react-icons/bs';
import _ from 'lodash';

import SubCategoryList from '../_Partials/subCategoryList';
import Create from '../_Partials/Create';
import SubCategoryCard from '../_Partials/SubCategoryCard';
import { EditAction } from 'components/ActionIcons';
import SearchInput from 'components/Form/SearchInput';
import { getCategories } from 'store/category/actions';

const CategoryList = ({ type, translate }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [editId, setEditId] = useState('');
  const [show, setShow] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSub1, setActiveSub1] = useState(undefined);
  const [activeSub2, setActiveSub2] = useState(undefined);
  const [allowNew, setAllowNew] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [mainCategories, setMainCategories] = useState([]);

  // Fetch category data
  useEffect(() => {
    if (type) {
      dispatch(getCategories({ type }));
      setActiveCategory('');
      setActiveSub1(undefined);
      setActiveSub2(undefined);
    }
  }, [type, dispatch]);

  // Filter categories by search value
  useEffect(() => {
    const value = searchValue.trim();
    if (value !== '') {
      setMainCategories(_.filter(categories, c => {
        return c.parent === null && c.title.toLowerCase().search(value.toLowerCase()) !== -1;
      }));
    } else {
      setMainCategories(_.filter(categories, { parent: null }));
    }
  }, [categories, searchValue]);

  // Clear the active sub2 if sub1 is changed
  useEffect(() => {
    if (activeSub1 && activeSub2) {
      const hasSub2 = _.findIndex(categories, { parent: activeSub1.id, id: activeSub2.id });
      if (hasSub2 === -1) {
        setActiveSub2(undefined);
      }
    }
  }, [activeSub1, activeSub2, categories]);

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

  let numberOfSubCategory = 0;
  _.forEach(mainCategories, c => {
    const subCategories = _.filter(categories, { parent: c.id });
    numberOfSubCategory += subCategories.length;
  });

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
                <SearchInput
                  name="search_value"
                  value={searchValue}
                  placeholder={translate('category.search')}
                  onChange={e => setSearchValue(e.target.value)}
                  onClear={() => setSearchValue('')}
                />
                <strong>
                  {translate('category.number_of_categories', { number: mainCategories.length })}
                  , {translate('category.number_of_sub_categories', { number: numberOfSubCategory })}
                </strong>
                {mainCategories.map(category => {
                  const subCategories = _.filter(categories, { parent: category.id });
                  return (
                    <Accordion key={category.id}>
                      <Card className="mb-2 shadow-sm">
                        <Card.Header className="bg-white pl-2 d-flex justify-content-between align-items-start">
                          <h5 className="m-0">
                            <CustomToggle eventKey={category.id} disabled={subCategories.length === 0} />
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

const CustomToggle = ({ eventKey, disabled }) => {
  const currentEventKey = useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(eventKey);

  return (
    <Button
      variant="link"
      className="mr-2 py-0 px-1"
      onClick={decoratedOnClick}
      disabled={disabled}
    >
      {currentEventKey === eventKey ? (
        <BsChevronDown className="ml-auto" />
      ) : (
        <BsChevronRight className="ml-auto" />
      )}
    </Button>
  );
};

CustomToggle.propTypes = {
  eventKey: PropTypes.string,
  disabled: PropTypes.bool
};
