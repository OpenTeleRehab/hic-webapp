import React, { useEffect } from 'react';
// import translate from 'utils/translate';

const Dashboard = (props) => {
  // set page title
  useEffect(() => {
    // document.title = `${translate('dashboard.title')} - HI`;
    document.title = `Dashboard - ${process.env.REACT_APP_SITE_TITLE}`;
  });

  return (
    <>
      Dashboard
    </>
  );
};

export default Dashboard;
