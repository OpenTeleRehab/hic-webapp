import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Card } from 'react-bootstrap';
import { BsPlus } from 'react-icons/all';
import SubCategoryList from './subCategoryList';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const SubCategoryCard = ({ activeCategory, categories, active, setActive, handleCreate, handleEdit }) => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  if (!activeCategory) {
    return (
      <Card>
        <Card.Header as="h5" />
      </Card>
    );
  }

  const subCategories = _.filter(categories, { parent: activeCategory.id });

  return (
    <Card>
      <Card.Header className="pl-4 d-flex justify-content-between align-items-start">
        <h5 className="m-0 text-truncate">{activeCategory.title}</h5>
        <Button
          variant="outline-primary"
          className="btn-circle"
          onClick={() => handleCreate(activeCategory.id, false)}
        >
          <BsPlus size={20} />
        </Button>
      </Card.Header>
      {subCategories.length > 0 && (
        <Card.Body className="px-2">
          <strong>
            {translate('category.number_of_sub_categories', { number: subCategories.length })}
          </strong>
          <SubCategoryList
            subCategories={subCategories}
            categories={categories}
            active={active}
            setActive={setActive}
            handleEdit={handleEdit}
          />
        </Card.Body>
      )}
    </Card>
  );
};

SubCategoryCard.propTypes = {
  activeCategory: PropTypes.object,
  categories: PropTypes.array,
  active: PropTypes.object,
  setActive: PropTypes.func,
  handleCreate: PropTypes.func,
  handleEdit: PropTypes.func
};

export default SubCategoryCard;
