import React, { useState, useEffect } from 'react';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Form } from 'react-bootstrap';
import { createCategory } from 'store/category/actions';
import PropTypes from 'prop-types';

const Create = ({ show, handleClose, editId, currentCategory, type }) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const [isCurrent, setIsCurrent] = useState(false);
  const [formFields, setFormFields] = useState({
    category: '',
    current_category: '',
    category_value: ''
  });

  const [errorCategory, setErrorCategory] = useState(false);
  const [errorCurrentCategory, setErrorCurrentCategory] = useState(false);
  const [errorCategoryValue, setErrorCategoryValue] = useState(false);

  useEffect(() => {
    if (isCurrent) {
      setFormFields({ ...formFields, category: '' });
    } else {
      setFormFields({ ...formFields, current_category: '' });
    }
    // eslint-disable-next-line
  }, [isCurrent]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleConfirm = () => {
    let canSave = true;

    if (formFields.category === '' && !isCurrent) {
      canSave = false;
      setErrorCategory(true);
    } else {
      setErrorCategory(false);
    }

    if (formFields.current_category === '' && isCurrent) {
      canSave = false;
      setErrorCurrentCategory(true);
    } else {
      setErrorCurrentCategory(false);
    }

    if (formFields.category_value === '') {
      canSave = false;
      setErrorCategoryValue(true);
    } else {
      setErrorCategoryValue(false);
    }

    if (canSave) {
      if (editId) {
        // Todo: update
      } else {
        dispatch(createCategory({ ...formFields, type }))
          .then(result => {
            if (result) {
              handleClose();
            }
          });
      }
    }
  };

  return (
    <Dialog
      show={show}
      title={translate(editId ? 'category.edit' : 'category.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
    >
      <Form>
        <Form.Group>
          <Form.Check
            id="current"
            inline
            label={translate('category.current_categories')}
            checked={isCurrent}
            type="radio"
            onClick={() => setIsCurrent(true)}
          />
          <Form.Check
            id="notCurrent"
            inline
            label={translate('category.new_category')}
            checked={!isCurrent}
            type="radio"
            onClick={() => setIsCurrent(false)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{translate('category')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          {isCurrent &&
              <Form.Control
                as="select"
                name="current_category"
                isInvalid={errorCurrentCategory}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
          }
          {!isCurrent &&
              <Form.Control
                type="text"
                name="category"
                placeholder={translate('placeholder.enter_category_name')}
                isInvalid={errorCategory}
                value={formFields.category}
                onChange={handleChange}
              />
          }
          <Form.Control.Feedback type="invalid">
            {translate('error.category')}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>{translate('category.category_value')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          <Form.Control
            type="text"
            name="category_value"
            placeholder={translate('placeholder.enter_category_value')}
            isInvalid={errorCategoryValue}
            value={formFields.category_value}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            {translate('error.category_value')}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Dialog>
  );
};

Create.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  editId: PropTypes.number,
  currentCategory: PropTypes.number,
  type: PropTypes.string
};

export default Create;
