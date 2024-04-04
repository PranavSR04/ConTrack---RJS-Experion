import React, { useContext } from 'react'
import { NotificationListPropType } from './types';
import NotificationHandler from '../Notification/NotificationHandler';
import styles from '../Notification/Notification.module.css';
import { Drawer } from 'antd';
import { NavContexts } from '../NavContext/NavContext';

const NotificationList = ({notifications, isLoading, isError, error, viewMoreClick, hasViewMore}:NotificationListPropType) => {
  const{open,onClose}=useContext(NavContexts);

  console.log(open);
  return (
    <>
    <Drawer title="Notifications" onClose={onClose} open={open} className={styles.drawer}>
    {isError && <p></p>}
    <div className={styles.listStyle}>
        {notifications.map(notification => (
            <NotificationHandler key={notification.log_id} notification={notification} />
        ))}
        {/* Render 'View more' button if there are more notifications to load */}
        {hasViewMore && 
        (
              <div onClick={viewMoreClick} className={styles.viewMore}>
                View more
              </div>
        )}

    </div>
</Drawer>
</>
  )
}

export default NotificationList;
 