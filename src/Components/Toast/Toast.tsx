import  { useEffect } from 'react';
import {  notification } from 'antd';
import { ToastProps } from '.';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Toast = ( {message,messageType}:ToastProps) => {

  const [noti, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message:string) => {
    noti[type]({
      message: message,
      placement: 'bottomRight',
    });
  };
  
  useEffect(() => {
    const dynamicMessage = message; //get the contents from the toast
    const dynamicType = messageType;
    openNotificationWithIcon(dynamicType, dynamicMessage);
  }, []); 

  return (
    <>
      {contextHolder}
    </>
  );
};
export default Toast;