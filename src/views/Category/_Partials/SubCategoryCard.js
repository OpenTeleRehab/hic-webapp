import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Card } from 'react-bootstrap';
import { BsPlus } from 'react-icons/all';
import SubCategoryList from './subCategoryList';

const SubCategoryCard = ({ activeCategory, categories, active, setActive, setEditId, ...rest }) => {
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
        {setActive && (
          <Button
            variant="outline-primary"
            className="btn-circle"
          >
            <BsPlus size={20} />
          </Button>
        )}
      </Card.Header>
      {subCategories.length > 0 && (
        <Card.Body className="px-2">
          <strong>{subCategories.length} sub-categories</strong>
          <SubCategoryList
            subCategories={subCategories}
            categories={categories}
            active={active}
            setActive={setActive}
            setEditId={setEditId}
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
  setEditId: PropTypes.func,
  rest: PropTypes.any
};

export default SubCategoryCard;
