import React, { useState, useEffect } from 'react';
import Dialog from 'components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Form } from 'react-bootstrap';
import { createCategory, updateCategory, getCategory } from 'store/category/actions';
import PropTypes from 'prop-types';
import settings from 'settings';

const Create = ({ show, handleClose, editId, activeCategory, type, allowNew }) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const { categories, category } = useSelector((state) => state.category);
  const { languages } = useSelector(state => state.language);
  const profile = useSelector(state => state.auth.profile);
  const translate = getTranslate(localize);
  const [isCurrent, setIsCurrent] = useState(false);
  const [selectableCategories, setSelectableCategories] = useState([]);
  const [formFields, setFormFields] = useState({
    category: '',
    current_category: '',
    category_value: ''
  });
  const [language, setLanguage] = useState('');

  const [errorCategory, setErrorCategory] = useState(false);
  const [errorCurrentCategory, setErrorCurrentCategory] = useState(false);
  const [errorCategoryValue, setErrorCategoryValue] = useState(false);

  useEffect(() => {
    if (!allowNew) {
      setIsCurrent(true);
    }
  }, [allowNew]);

  useEffect(() => {
    if (languages.length) {
      if (editId && profile) {
        setLanguage(profile.language_id);
      } else {
        setLanguage(languages[0].id);
      }
    }
  }, [languages, profile, editId]);

  useEffect(() => {
    if (editId && language) {
      dispatch(getCategory(editId, language));
    }
  }, [editId, language, dispatch]);

  useEffect(() => {
    if (editId && category) {
      setFormFields({ ...formFields, category: category.title });
    }
    // eslint-disable-next-line
  }, [editId, category]);

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

  const handleLanguageChange = e => {
    const { value } = e.target;
    setLanguage(value);
  };

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
        dispatch(updateCategory(editId, { ...formFields, type, lang: language }))
          .then(result => {
            if (result) {
              handleClose();
            }
          });
      } else {
        dispatch(createCategory({ ...formFields, type, lang: language }))
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
        <Form.Group controlId="formLanguage">
          <Form.Label>{translate('common.show_language.version')}</Form.Label>
          <Form.Control as="select" value={editId ? language : ''} onChange={handleLanguageChange} disabled={!editId}>
            {languages.map((language, index) => (
              <option key={index} value={language.id}>
                {language.name} {language.code === language.fallback && `(${translate('common.default')})`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
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
              maxLength={settings.textMaxLength}
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
