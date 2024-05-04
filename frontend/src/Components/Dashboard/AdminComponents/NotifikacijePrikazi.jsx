import styled from "styled-components";

const NotificationGrid = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
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
            Izbriši notifikaciju
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
            Izbriši notifikaciju
          </DeleteText>
        </NotificationWrapper>
      ))}
    </NotificationGrid>
  );
}

export default NotifikacijePrikazi;
