import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PropTypes from 'prop-types';

import Information from './ProfileInformation/information';
import Password from './ProfileInformation/password';

const Profile = ({ translate }) => {
  const PROFILE_INFORMATION = {
    INFORMATION: 'information',
    PASSWORD: 'password'
  };
  const [type, setType] = useState(PROFILE_INFORMATION.INFORMATION);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{translate('personal')}</h1>
      </div>

      <Tabs activeKey={type} onSelect={(key) => setType(key)} transition={false}>
        <Tab eventKey={PROFILE_INFORMATION.INFORMATION} title={translate('profile.information')}>
          <Information />
        </Tab>
        <Tab eventKey={PROFILE_INFORMATION.PASSWORD} title={translate('profile.password')}>
          <Password />
        </Tab>
      </Tabs>
    </>
  );
};

Profile.propTypes = {
  translate: PropTypes.func
};

export default Profile;
