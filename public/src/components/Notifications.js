import React from 'react';
import CallAPINonePrefix from '../APIService/CallApiNonePrefix';
import { MAXIMUM_NOTIFICATION_DISPLAY } from './constants';
import { DateTime } from './DateTime';
import '../styles/components/_notification.css';

const Notifications = ({ notificationsData }) => {
  const callLink = async (link) => {
    const respone = await CallAPINonePrefix(link);
    if (!respone) alert('Error');
    else alert(respone.data.message);
  };
  return (
    notificationsData &&
    notificationsData.map(({ id, link, message, createdAt }, index) => {
      if (index > MAXIMUM_NOTIFICATION_DISPLAY) return '';
      return (
        <div key={id}>
          <div>
            {link ? (
              <button
                className="item-notification"
                onClick={() => callLink(link)}
              >
                {message}
              </button>
            ) : (
              message
            )}
          </div>
          <div right className="align-self-center">
            <DateTime date={createdAt} />
          </div>
        </div>
      );
    })
  );
};

export default Notifications;
