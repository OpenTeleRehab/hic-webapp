import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardGroup } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import _ from 'lodash';

import SubCategoryList from '../_Partials/subCategoryList';
import Create from '../_Partials/Create';
import SubCategoryCard from '../_Partials/SubCategoryCard';
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
      const mainCats = _.filter(categories, c => {
        return c.parent === null && c.title.toLowerCase().search(value.toLowerCase()) !== -1;
      });
      setMainCategories(mainCats);
    } else {
      const mainCats = _.filter(categories, { parent: null });
      setMainCategories(mainCats);
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
                </strong>
                <SubCategoryList
                  subCategories={mainCategories}
                  categories={categories}
                  active={activeSub1}
                  setActive={setActiveSub1}
                  handleEdit={handleEdit}
                  type={type}
                />
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
          type={type}
        />
        <SubCategoryCard
          categories={categories}
          activeCategory={activeSub2}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          type={type}
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
