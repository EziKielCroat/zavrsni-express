import styled from "styled-components";

import { Trash } from "../../Shared/icons";

const NotificationGrid = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;

const NotificationWrapper = styled.div`
  border: ${({ important }) =>
    important === true ? "1px solid red" : "1px solid #dddddd"};
  padding: 20px;
`;

const NotificationTitle = styled.h3`
  margin-bottom: 5px;
`;

const NotificationText = styled.p`
  margin-bottom: 10px;
`;

const DeleteText = styled.p`
  cursor: pointer;
`;

function NotifikacijePrikazi({ notifications, deleteNotification }) {
  const importantNotifications = notifications.filter(
    (notification) => notification.notificationImportant
  );
  const nonImportantNotifications = notifications.filter(
    (notification) => !notification.notificationImportant
  );

  return (
    <NotificationGrid>
      {importantNotifications.map((notification) => (
        <NotificationWrapper important={true} key={notification._id}>
          <NotificationTitle>
            {notification.notificationTitle}
          </NotificationTitle>
          <NotificationText>{notification.notificationText}</NotificationText>

          <DeleteText
            onClick={() => {
              deleteNotification(notification._id);
            }}
          >
            <Trash />
          </DeleteText>
        </NotificationWrapper>
      ))}

      {nonImportantNotifications.map((notification) => (
        <NotificationWrapper important={false} key={notification._id}>
          <NotificationTitle>
            {notification.notificationTitle}
          </NotificationTitle>
          <NotificationText>{notification.notificationText}</NotificationText>
          <DeleteText
            onClick={() => {
              deleteNotification(notification._id);
            }}
          >
           <Trash />
          </DeleteText>
        </NotificationWrapper>
      ))}
    </NotificationGrid>
  );
}

export default NotifikacijePrikazi;
