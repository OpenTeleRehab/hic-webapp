import React from 'react';
import CustomTable from 'components/Table';

export default GlobalAdmin => {
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
      Global admins can manage Global Admin/ Country Admins, create and update the content (exercises and questionnairs).
      <CustomTable columns={columns} />
    </>
  );
};
