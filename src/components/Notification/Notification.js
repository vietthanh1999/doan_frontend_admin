import { Button, notification, Space } from 'antd';

export const openNotificationWithIcon = (type, des) => {
  notification[type]({
    message: 'Thông báo',
    description:
      des,
  });
};


//   <Space>
//     <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
//     <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
//     <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
//     <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
//   </Space>,
