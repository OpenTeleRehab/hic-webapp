import React from 'react';
import Navigation from 'layout/navigation';
import Container from 'react-bootstrap/Container';
import Main from 'layout/main';

const Layout = () => {
  return (
    <>
      <Navigation />
      <main role="main">
        <Container fluid>
          <Main />
        </Container>
      </main>
    </>
  );
};

export default Layout;