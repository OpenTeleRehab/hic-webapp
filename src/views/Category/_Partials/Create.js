import React, { useState, useEffect } from 'react';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Form } from 'react-bootstrap';
import { createCategory, updateCategory } from 'store/category/actions';
import PropTypes from 'prop-types';

const Create = ({ show, handleClose, editId, activeCategory, type, allowNew }) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const { categories } = useSelector((state) => state.category);
  const translate = getTranslate(localize);
  const [isCurrent, setIsCurrent] = useState(false);
  const [selectableCategories, setSelectableCategories] = useState([]);
  const [formFields, setFormFields] = useState({
    category: '',
    current_category: '',
    category_value: ''
  });

  const [errorCategory, setErrorCategory] = useState(false);
  const [errorCurrentCategory, setErrorCurrentCategory] = useState(false);
  const [errorCategoryValue, setErrorCategoryValue] = useState(false);

  useEffect(() => {
    if (!allowNew) {
      setIsCurrent(true);
    }
  }, [allowNew]);

  useEffect(() => {
    if (editId && categories.length) {
      const editingCategory = categories.find(category => category.id === editId);
      setFormFields({ ...formFields, category: editingCategory.title });
    }
    // eslint-disable-next-line
  }, [editId]);

  useEffect(() => {
    if (categories.length) {
      if (allowNew) {
        setSelectableCategories(categories.filter(category => !category.parent));
      } else {
        setSelectableCategories(categories.filter(category => category.id === activeCategory));
      }
    }
  }, [categories, activeCategory, allowNew]);

  useEffect(() => {
    if (!editId) {
      if (isCurrent) {
        setFormFields({ ...formFields, category: '', current_category: activeCategory });
      } else {
        setFormFields({ ...formFields, current_category: '' });
      }
    }
    // eslint-disable-next-line
  }, [isCurrent, editId]);

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

    if (formFields.current_category === '' && isCurrent && !editId) {
      canSave = false;
      setErrorCurrentCategory(true);
    } else {
      setErrorCurrentCategory(false);
    }

    if (formFields.category_value === '' && !editId) {
      canSave = false;
      setErrorCategoryValue(true);
    } else {
      setErrorCategoryValue(false);
    }

    if (canSave) {
      if (editId) {
        dispatch(updateCategory(editId, { ...formFields, type }))
          .then(result => {
            if (result) {
              handleClose();
            }
          });
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
      title={translate(editId ? 'category.edit_' + type : 'category.new_' + type)}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={editId ? translate('common.save') : translate('common.create')}
    >
      <Form>
        {!editId && allowNew &&
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
        }
        <Form.Group>
          <Form.Label>{translate(editId ? 'category.title' : 'category.category')}</Form.Label>
          <span className="text-dark ml-1">*</span>
          {isCurrent && !editId &&
            <Form.Control
              as="select"
              name="current_category"
              value={formFields.current_category}
              isInvalid={errorCurrentCategory}
              onChange={handleChange}
              disabled={!allowNew}
            >
              <option value="">{translate('placeholder.category')}</option>
              {selectableCategories.length &&
                selectableCategories.map(selectableCategory => {
                  return (
                    <option key={selectableCategory.id} value={selectableCategory.id}>{selectableCategory.title}</option>
                  );
                })
              }
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
        {!editId &&
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
        }
      </Form>
    </Dialog>
  );
};

Create.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  editId: PropTypes.number,
  activeCategory: PropTypes.number,
  type: PropTypes.string,
  allowNew: PropTypes.bool
};

export default Create;
