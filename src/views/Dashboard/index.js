import React from 'react';
import { useSelector } from 'react-redux';
import CountryAdminDashboard from './DashboardContent/countryAdmin';

const Dashboard = (props) => {
  const { profile } = useSelector((state) => state.auth);

  return (
    <>
      {(profile && profile.type === 'country_admin') &&
        <CountryAdminDashboard />
      }
    </>
  );
};

export default Dashboard;
