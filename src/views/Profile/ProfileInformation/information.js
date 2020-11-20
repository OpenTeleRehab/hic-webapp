import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getTranslate } from 'react-localize-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCountryName } from 'utils/country';
import { getClinicName } from '../../../utils/clinic';
import EditProfileInformation from './editInformation';

const Information = () => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const history = useHistory();
  const { profile } = useSelector((state) => state.auth);
  const clinics = useSelector(state => state.clinic.clinics);
  const countries = useSelector(state => state.country.countries);

  const [show, setShow] = useState(true);

  const handleBack = () => {
    history.goBack();
  };

  const handleEdit = () => {
    setShow(false);
  };

  return (
    <>
      { show ? (
        <div className="mt-4">
          {profile !== undefined && (
            <>
              <h1>{profile.last_name} {profile.first_name}</h1>
              <p>{profile.email}</p>
              <p>{getClinicName(profile.clinic_id, clinics)}</p>
              <p>{getCountryName(profile.country_id, countries)}</p>

              <div>
                <Button
                  onClick={handleEdit}
                >
                  {translate('common.edit')}
                </Button>
                <Button
                  className="ml-2"
                  variant="outline-dark"
                  onClick={handleBack}
                >
                  {translate('common.back')}
                </Button>
              </div>
            </>
          )}
        </div>
      )
        : <EditProfileInformation />
      }
    </>
  );
};

export default Information;
