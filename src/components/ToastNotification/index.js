import React from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from 'store/notification/actions';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  return (
    <Toast
      onClose={() => { dispatch(closeNotification()); }}
      show={notification.show}
      autohide
      className={`type-${notification.color}`}
    >
      <Toast.Header>
        {
          notification.color === 'success' &&
          <BsCheckCircle size={22} className="mr-2" />
        }
        {
          notification.color === 'danger' &&
          <BsXCircle size={22} className="mr-2" />
        }
        <strong className="mr-auto">{notification.title}</strong>
      </Toast.Header>
      <Toast.Body>{notification.message}</Toast.Body>
    </Toast>
  );
};

export default ToastNotification;
