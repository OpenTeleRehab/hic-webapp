import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';
import * as ROUTES from 'variables/routes';

const Dashboard = () => {
  const { keycloak } = useKeycloak();
  const history = useHistory();

  useEffect(() => {
    if (keycloak.authenticated) {
      history.push(ROUTES.ADMIN_DASHBOARD);
    }
  }, [keycloak, history]);

  return (
    <>
      Public Dashboard
    </>
  );
};

export default Dashboard;
