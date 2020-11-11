import React from 'react';
import CustomTable from '../../../../src/components/Table';

export default Therapist => {
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
      Country Admins manage patients of a clinic
      <CustomTable columns={columns} />
    </>
  );
};
