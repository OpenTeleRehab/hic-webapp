import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withLocalize } from 'react-localize-redux';
import { Badge, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as moment from 'moment';

import settings from 'settings';
import BasicTable from 'components/Table/basic';
import { EditAction, PublishAction, ViewAction } from 'components/ActionIcons';
import {
  createTermConditionBanner,
  getTermAndCondition,
  getTermAndConditions, getAdminTermConditionBanner,
  publishTermAndCondition
} from 'store/termAndCondition/actions';
import { STATUS_VARIANTS } from 'variables/termAndCondition';
import Dialog from 'components/Dialog';
import Select from 'react-select';
import scssColors from '../../../scss/custom.scss';
import { BsUpload, BsXCircle } from 'react-icons/bs';
import { toMB } from 'utils/file';
import _ from 'lodash';

const TermAndCondition = ({ translate, handleRowEdit }) => {
  const dispatch = useDispatch();
  const { termAndConditions, termAndCondition, adminTermConditionBanner } = useSelector(state => state.termAndCondition);
  const { languages } = useSelector(state => state.language);
  const { profile } = useSelector(state => state.auth);

  const [showPublishedDialog, setShowPublishedDialog] = useState(false);
  const [publishedId, setPublishedId] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [language, setLanguage] = useState('');
  const [banner, setBanner] = useState(undefined);
  const { maxFileSize } = settings.educationMaterial;
  const [formFields, setFormFields] = useState({
    file: undefined
  });
  const [fileError, setFileError] = useState(false);

  const columns = [
    { name: 'version', title: translate('term_and_condition.version') },
    { name: 'status', title: translate('common.status') },
    { name: 'published_date', title: translate('term_and_condition.published_date') },
    { name: 'action', title: translate('common.action') }
  ];

  useEffect(() => {
    if (languages.length) {
      if (viewId) {
        if (profile && profile.language_id) {
          setLanguage(profile.language_id);
        } else {
          setLanguage(languages[0].id);
        }
      }
    }
  }, [profile, viewId, languages]);

  useEffect(() => {
    if (viewId && language) {
      dispatch(getTermAndCondition(viewId, language));
    }
  }, [viewId, language, dispatch]);

  useEffect(() => {
    dispatch(getTermAndConditions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdminTermConditionBanner());
  }, [dispatch]);

  useEffect(() => {
    if (adminTermConditionBanner) {
      setBanner(adminTermConditionBanner);
    }
  }, [adminTermConditionBanner]);

  const handlePublish = (id) => {
    setPublishedId(id);
    setShowPublishedDialog(true);
  };

  const handlePublishedDialogConfirm = () => {
    dispatch(publishTermAndCondition(publishedId)).then(result => {
      if (result) {
        handlePublishedDialogClose();
      }
    });
  };

  const handlePublishedDialogClose = () => {
    setPublishedId(null);
    setShowPublishedDialog(false);
  };

  const handleViewContent = (id) => {
    setShowViewDialog(true);
    setViewId(id);
  };

  const handleViewContentClose = () => {
    setShowViewDialog(false);
    setLanguage('');
    setViewId(null);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormFields({ ...formFields, [name]: files[0] });

    const file = files[0];
    if (file) {
      const fileName = file.name;
      const fileSize = (file.size / 1024).toFixed(2);
      const fileType = file.type;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBanner({ url: reader.result, fileName, fileSize, fileType, file });
      };
    }
  };

  const handleFileRemove = (e) => {
    setBanner(null);
    setFormFields({ ...formFields, file: undefined });
  };

  const handleConfirm = () => {
    let canSave = true;

    if (formFields.file !== undefined && toMB(formFields.file.size) > maxFileSize) {
      canSave = false;
      setFileError(true);
    } else {
      setFileError(false);
    }
    if (canSave) {
      dispatch(createTermConditionBanner({ ...formFields }));
    }
  };

  const customSelectStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: scssColors.infoLight
      }
    })
  };

  return (
    <div className="no-gutters bg-white p-md-3">
      <div className="mb-5">
        <Form.Group controlId="formFile">
          <Form.Label className="mb-3">{translate('term_and_condition_banner')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {formFields.file !== undefined
              ? translate('education_material.upload_file.max_size', { size: maxFileSize }) : ''
            }
          </Form.Control.Feedback>

          <div className="w-50">
            {!_.isEmpty(banner) && (
              <div className="exercise-media">
                <div className="mb-2 position-relative w-50">
                  <Button variant="link" onClick={handleFileRemove} className="position-absolute btn-remove">
                    <BsXCircle size={20} color={scssColors.danger} />
                  </Button>
                  <img src={banner.url || `${process.env.REACT_APP_API_BASE_URL}/file/${banner.id}`} alt="..." className="w-100 img-thumbnail"/>
                </div>
              </div>
            )}
            <div className="btn bg-white btn-outline-primary text-primary position-relative overflow-hidden mr-3 mt-2 up-load-button-wrapper" role="button" tabIndex="0" onKeyPress={(event) => event.key === 'Enter' && document.getElementById('file').click()}>
              <BsUpload size={15}/> Upload Image
              <input type="file" id="file" name="file" className="position-absolute upload-btn" onChange={handleFileChange} accept="image/*" isInvalid={fileError} aria-label="Upload" />
            </div>
            <Button variant="primary" className="mt-2" onClick={handleConfirm} tabIndex="0">
              {translate('common.save')}
            </Button>
          </div>
        </Form.Group>
      </div>
      <div className="card">
        <BasicTable
          rows={termAndConditions.map(term => {
            const publishedDate = term.published_date;
            const action = (
              <>
                <ViewAction onClick={() => handleViewContent(term.id)} />
                <PublishAction className="ml-1" onClick={() => handlePublish(term.id)} disabled={publishedDate} />
                <EditAction className="ml-1" onClick={() => handleRowEdit(term.id)} disabled={publishedDate} />
              </>
            );
            const status = term.status && (
              <Badge pill variant={STATUS_VARIANTS[term.status]}>
                {translate('term_and_condition.status_' + term.status)}
              </Badge>
            );
            return {
              version: term.version,
              status: status,
              published_date: publishedDate ? moment(publishedDate).format(settings.date_format) : '',
              action
            };
          })}
          columns={columns}
        />

        <Dialog
          show={showPublishedDialog}
          title={translate('term_and_condition.publish_confirmation_title')}
          cancelLabel={translate('common.no')}
          onCancel={handlePublishedDialogClose}
          confirmLabel={translate('common.yes')}
          onConfirm={handlePublishedDialogConfirm}
        >
          <p>{translate('term_and_condition.publish_confirmation_message')}</p>
        </Dialog>

        <Dialog
          show={showViewDialog}
          title={translate('term_and_condition.view_title')}
          cancelLabel={translate('common.close')}
          onCancel={handleViewContentClose}
        >
          <Form.Group controlId="formLanguage">
            <Form.Label>{translate('common.language')}</Form.Label>
            <Select
              placeholder={translate('placeholder.language')}
              classNamePrefix="filter"
              value={languages.filter(option => option.id === language)}
              getOptionLabel={option => option.name}
              options={languages}
              onChange={(e) => setLanguage(e.id)}
              styles={customSelectStyles}
              aria-label="Language"
            />
          </Form.Group>
          <div dangerouslySetInnerHTML={{ __html: termAndCondition.content }} />
        </Dialog>
      </div>
    </div>
  );
};

TermAndCondition.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(TermAndCondition);
