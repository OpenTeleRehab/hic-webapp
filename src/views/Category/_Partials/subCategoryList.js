import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ListGroup } from 'react-bootstrap';
import { EditAction } from 'components/ActionIcons';

const SubCategoryList = ({ subCategories, categories, active, setActive, handleEdit, ...rest }) => {
  return subCategories.length > 0 && (
    <ListGroup variant="flush" className="border-top border-bottom" {...rest}>
      {subCategories.map(sub => {
        const childSubCategories = _.filter(categories, { parent: sub.id });
        return (
          <ListGroup.Item
            key={sub.id}
            active={active && active.id === sub.id}
            onClick={() => setActive ? setActive(sub) : undefined}
            className="d-flex justify-content-between align-items-start"
          >
            {sub.title}{setActive ? ` (${childSubCategories.length})` : ''}
            <EditAction onClick={() => handleEdit(sub.id)} />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

SubCategoryList.propTypes = {
  subCategories: PropTypes.array,
  categories: PropTypes.array,
  active: PropTypes.object,
  setActive: PropTypes.func,
  handleEdit: PropTypes.func,
  rest: PropTypes.any
};

export default SubCategoryList;
