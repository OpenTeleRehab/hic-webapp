import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';

import BasicTable from 'components/Table/basic';
import { EditAction, DeleteAction } from 'components/ActionIcons';
import Dialog from 'components/Dialog';
import { deleteLanguage, getLanguages } from 'store/language/actions';

const Language = ({ translate, handleRowEdit }) => {
  const dispatch = useDispatch();
  const languages = useSelector(state => state.language.languages);

  const [columns] = useState([
    { name: 'id', title: translate('common.id') },
    { name: 'name', title: translate('common.name') },
    { name: 'code', title: translate('common.code') },
    { name: 'action', title: translate('common.action') }
  ]);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteId(null);
    setShowDeleteDialog(false);
  };

  const handleDeleteDialogConfirm = () => {
    dispatch(deleteLanguage(deleteId)).then(result => {
      if (result) {
        handleDeleteDialogClose();
      }
    });
  };

  return (
    <div className="card">
      <BasicTable
        rows={languages.map(language => {
          const action = (
            <>
              <EditAction onClick={() => handleRowEdit(language.id)} />
              <DeleteAction
                className="ml-1"
                onClick={() => handleDelete(language.id)}
                disabled={language.is_used}
              />
            </>
          );
          return {
            id: language.id,
            name: language.name,
            code: language.code,
            action
          };
        })}
        columns={columns}
      />
      <Dialog
        show={showDeleteDialog}
        title={translate('language.delete_confirmation_title')}
        cancelLabel={translate('common.no')}
        onCancel={handleDeleteDialogClose}
        confirmLabel={translate('common.yes')}
        onConfirm={handleDeleteDialogConfirm}
      >
        <p>{translate('common.delete_confirmation_message')}</p>
      </Dialog>
    </div>
  );
};

Language.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(Language);
