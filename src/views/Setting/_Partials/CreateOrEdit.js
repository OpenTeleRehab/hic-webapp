import Dialog from 'components/Dialog';
import React, { useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getTranslate } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from 'components/Form/Select';
import Radio from 'components/Form/Radio';
import { MFA_ENFORCEMENT } from 'variables/mfaEnforcement';
import Input from 'components/Form/Input';
import { USER_GROUPS } from 'variables/user';
import { updateMfaSetting, getMfaSettings } from 'store/mfaSetting/actions';
import PropTypes from 'prop-types';

const CreateOrEdit = ({
  show,
  existingRecord,
  handleClose
}) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      user_type: 'moderator'
    }
  });

  useEffect(() => {
    if (existingRecord) {
      reset({
        user_type: existingRecord.user_type,
        mfa_enforcement: existingRecord.mfa_enforcement,
        mfa_expiration_duration: existingRecord.mfa_expiration_duration,
        skip_mfa_setup_duration: existingRecord.skip_mfa_setup_duration
      });
    }
  }, [existingRecord]);

  const userTypeOptions = [
    {
      label: translate('common.moderator'),
      value: USER_GROUPS.MODERATOR
    }
  ];

  const mfaEnforcementOptions = [
    {
      label: translate('common.disable'),
      value: MFA_ENFORCEMENT.DISABLE
    },
    {
      label: translate('common.recommend'),
      value: MFA_ENFORCEMENT.RECOMMEND
    },
    {
      label: translate('common.enforce'),
      value: MFA_ENFORCEMENT.ENFORCE
    }
  ];

  const handleConfirm = handleSubmit(async (data) => {
    const payload = {
      ...data
    };
    dispatch(updateMfaSetting(existingRecord.id, payload))
      .then(result => {
        if (result) {
          dispatch(getMfaSettings({
            search_value: '',
            filters: [],
            page_size: 60,
            page: 1
          }));
          handleClose();
        }
      });
  });

  const handleFormSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConfirm();
    }
  };

  return (
    <Dialog
      show={show}
      title={translate(existingRecord && existingRecord.id ? 'mfa.edit' : 'mfa.new')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmLabel={existingRecord && existingRecord.id ? translate('common.save') : translate('common.create')}
      size="xl"
    >
      <Form onKeyDown={(e) => handleFormSubmit(e)}>
        <CustomSelect
          control={control}
          name="user_type"
          options={userTypeOptions}
          rules={{ required: translate('common.user.role.error') }}
          isMulti
          label={translate('common.user.type')}
          placeholder={translate('setting.placeholder.user.role')}
          isClearable
          aria-label="user group"
        />
        <Radio rules={{ required: 'This field is required' }} control={control} name="mfa_enforcement" options={mfaEnforcementOptions} />
        <Row>
          <Col md={6}>
            <Input control={control} type="number" name="mfa_expiration_duration" rules={{ required: 'This field is required' }} label={translate('mfa.expiration.duration')} />
          </Col>
          <Col md={6}>
            <Input
              control={control}
              type="number"
              name="skip_mfa_setup_duration"
              rules={{ required: 'This field is required' }}
              label={translate('mfa.skip.setup.duration')}
            />
          </Col>
        </Row>
      </Form>
    </Dialog>
  );
};

CreateOrEdit.propTypes = {
  translate: PropTypes.func,
  show: PropTypes.bool.isRequired,
  existingRecord: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    user_type: PropTypes.arrayOf(PropTypes.string),
    mfa_enforcement: PropTypes.string,
    mfa_expiration_duration: PropTypes.number,
    skip_mfa_setup_duration: PropTypes.number
  }),
  handleClose: PropTypes.func.isRequired
};

export default CreateOrEdit;
