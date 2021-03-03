import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

import { Button, Card, CardGroup } from 'react-bootstrap';
import { BsPlus } from 'react-icons/all';
import _ from 'lodash';

import { EditAction } from 'components/ActionIcons';
import SubCategoryList from '../_Partials/subCategoryList';
import Create from '../_Patials/Create';
import { CATEGORY_TYPES } from 'variables/category';
import SubCategoryCard from '../_Partials/SubCategoryCard';

const Exercise = ({ translate }) => {
  const [editId, setEditId] = useState('');
  const [show, setShow] = useState(false);
  const [activeSub1, setActiveSub1] = useState(undefined);
  const [activeSub2, setActiveSub2] = useState(undefined);

  const categories = [
    { id: 1, title: 'Speciality', parent: null },
    { id: 2, title: 'Equipment', parent: null },
    { id: 3, title: 'Difficulty', parent: null },

    { id: 10, title: 'Aquatic Therapy', parent: 1 },
    { id: 11, title: 'Mental Health', parent: 1 },
    { id: 12, title: 'Yoga', parent: 1 },

    { id: 20, title: 'Yoga', parent: 2 },

    { id: 50, title: 'Yoga A', parent: 10 },

    { id: 90, title: 'Yoga A', parent: 50 }
  ];

  useEffect(() => {
    if (activeSub1) {
      const subCategories = _.filter(categories, { parent: activeSub1.id });
      if (subCategories.length === 0) {
        setActiveSub2(undefined);
      }
    }
  }, [activeSub1, categories]);

  const handleClose = () => {
    setEditId('');
    setShow(false);
  };

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
                        <EditAction className="float-right" onClick={() => setEditId(category.id)} />
                      </Card.Header>
                      {subCategories.length > 0 && (
                        <Card.Body className="p-0 px-2">
                          <SubCategoryList
                            subCategories={subCategories}
                            categories={categories}
                            active={activeSub1}
                            setActive={setActiveSub1}
                            setEditId={setEditId}
                          />
                        </Card.Body>
                      )}
                    </Card>
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
          setEditId={setEditId}
        />
        <SubCategoryCard
          categories={categories}
          activeCategory={activeSub2}
          setEditId={setEditId}
        />
      </CardGroup>

      {show && <Create show={show} editId={editId} handleClose={handleClose} type={CATEGORY_TYPES.EXERCISE} />}
    </>
  );
};

Exercise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Exercise);
