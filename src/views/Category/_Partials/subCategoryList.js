import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ListGroup } from 'react-bootstrap';
import { EditAction } from '../../../components/ActionIcons';

const SubCategoryList = ({ subCategories, categories, ...rest }) => {
  return (
    <ListGroup variant="flush" {...rest}>
      {subCategories.map(sub => {
        const childSubCategories = _.filter(categories, { parent: sub.id });
        return (
          <ListGroup.Item key={sub.id}>
            {sub.title} ({childSubCategories.length})
            <EditAction className="float-right" />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

SubCategoryList.propTypes = {
  subCategories: PropTypes.array,
  categories: PropTypes.array,
  rest: PropTypes.any
};

export default SubCategoryList;
