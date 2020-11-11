import React from 'react';
import CustomTable from 'components/Table';

const CountryAdmin = (props) => {
  const columns = [
    { name: 'id', title: 'ID' },
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'email', title: 'Email' },
    { name: 'status', title: 'Status' },
    { name: 'lastLogin', title: 'Last Login' },
    { name: 'action', title: 'Actions' }
  ];
  return (
    <>
      Country Admins manage therapist of a country
      <CustomTable columns={columns} />
    </>
  );
};

export default CountryAdmin;
