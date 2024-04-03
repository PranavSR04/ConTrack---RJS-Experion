import React from 'react'
import DashBoardNotificationHandler from './../DashBoardNotification/DashBoardNotificationHandler';
import { DashBoardNotificationListPropType } from './types';
import styles from '../DashBoardNotification/DashBoardNotification.module.css'
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from 'antd';
//list the Dashboard notification 
const DashBoardNotificationList=({notifications, isLoading, isError, error}:DashBoardNotificationListPropType) => {
  return (
    <div className={styles.DashBoard_Notification_Container}>
      <p>Latest Notifications</p>
      {isLoading &&<Spin indicator={<LoadingOutlined className={styles.DashBoard_Notification_Container_Spin} spin />} />}
      {isError && <p>No Notification</p>}
      <div>
          {notifications.map(notification => (
              <DashBoardNotificationHandler key={notification.log_id} notification={notification} />
          ))}
      </div>
    </div>
  )
}

export default DashBoardNotificationList
