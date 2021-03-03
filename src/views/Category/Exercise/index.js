import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

import { Button, Card, CardGroup } from 'react-bootstrap';
import { BsPlus } from 'react-icons/all';
import _ from 'lodash';

import { EditAction } from 'components/ActionIcons';
import SubCategoryList from '../_Partials/subCategoryList';
import Create from '../_Patials/Create';
import { CATEGORY_TYPES } from 'variables/category';

const Exercise = ({ translate }) => {
  const [editId, setEditId] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setEditId('');
    setShow(false);
  };

  const categories = [
    { id: 1, title: 'Speciality', parent: null },
    { id: 2, title: 'Equipment', parent: null },
    { id: 3, title: 'Difficulty', parent: null },

    { id: 4, title: 'Aquatic Therapy', parent: 1 },
    { id: 5, title: 'Mental Health', parent: 1 },
    { id: 6, title: 'Yoga', parent: 1 }
  ];
  return (
    <>
      <CardGroup className="category-container">
        <Card>
          <Card.Header as="h5">
            Categories
            <Button
              variant="outline-primary"
              className="btn-circle float-right"
              onClick={() => setShow(true)}
            >
              <BsPlus size={20} />
            </Button>
          </Card.Header>
          <Card.Body className="p-2">
            {categories.length > 0 && (
              <>
                <strong>3 categories, 18 sub-categories</strong>
                {_.filter(categories, { parent: null }).map(category => {
                  const subCategories = _.filter(categories, { parent: category.id });
                  return (
                    <Card key={category.id} className="mb-2">
                      <Card.Header as="h5" className="bg-white">
                        {category.title} ({subCategories.length})
                        <EditAction className="float-right" />
                      </Card.Header>
                      {subCategories.length > 0 && (
                        <Card.Body className="p-0 px-2">
                          <SubCategoryList subCategories={subCategories} categories={categories} />
                        </Card.Body>
                      )}
                    </Card>
                  );
                })}
              </>
            )}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header as="h5">
            Aquatic Therapy
            <Button
              variant="outline-primary"
              className="btn-circle float-right"
            >
              <BsPlus size={20} />
            </Button>
          </Card.Header>
          <Card.Body className="p-2">
            <strong>5 sub-categories</strong>
            <SubCategoryList
              subCategories={_.filter(categories, { parent: null })}
              categories={categories}
              className="border-top border-bottom"
            />
          </Card.Body>
        </Card>
        <Card>
          <Card.Header as="h5">&nbsp;</Card.Header>
          <Card.Body className="p-2">
          </Card.Body>
        </Card>
      </CardGroup>

      {show && <Create show={show} editId={editId} handleClose={handleClose} type={CATEGORY_TYPES.EXERCISE} />}
    </>
  );
};

Exercise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Exercise);
