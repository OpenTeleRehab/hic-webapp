import React from 'react';
import CustomTable from 'components/Table';
export default ClinicAdmin => {
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
      Country Admins manage therapist of a clinic
      <CustomTable columns={columns} />
    </>
  );
};
