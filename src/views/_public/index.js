import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';
import * as ROUTES from 'variables/routes';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { replaceRoute } from '../../utils/route';

const Dashboard = () => {
  const { keycloak } = useKeycloak();
  const history = useHistory();
  const { activeLanguage } = useSelector((state) => state.language);

  useEffect(() => {
    if (keycloak.authenticated) {
      history.push(ROUTES.ADMIN_DASHBOARD);
    }
  }, [keycloak, history]);

  useEffect(() => {
    history.push(replaceRoute(ROUTES.HOME, activeLanguage));
  }, [activeLanguage, history]);

  return (
    <>
      <section className="section__wrapper">
        <Container fluid>
          <h2 className="text-primary">Access hundreds of rehabilitation resources...</h2>
        </Container>
      </section>

      <section className="section__wrapper bg-white">
        <Container fluid>
          <h2 className="text-primary">Our Partners</h2>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
