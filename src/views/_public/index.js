import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';
import * as ROUTES from 'variables/routes';
import { Container } from 'react-bootstrap';

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
      <section className="section__wrapper">
        <Container fluid>
          <h2>Access hundreds of rehabilitation resources...</h2>
        </Container>
      </section>

      <section className="section__wrapper bg-white">
        <Container fluid>
          <h2>Our Partners</h2>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
