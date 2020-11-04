import React from 'react';
import Navigation from 'layout/navigation';
import Container from 'react-bootstrap/Container';
import RouteComponent from 'routes';

const Layout = () => {
  return (
    <>
      <Navigation />
      <main role="main">
        <Container fluid>
          <RouteComponent />
        </Container>
      </main>
    </>
  );
};

export default Layout;
