import React, { useEffect, useState } from 'react'
import { NotificationType } from '../Notification/types';
import { fetchNotification } from '../NotificationList/Api/getNotifications';
import axios from 'axios';
import DashBoardNotificationList from './DashBoardNotificationList';

const DashBoardNotificationListHandler = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        //Function to fetch notification 
        const fetchData = async () => 
        {
            try {
                    setIsLoading(true);
                    setIsError(false);
                    setError('');
        
                    const response = await fetchNotification(1,5,1); // Notification count is limited to 5 
                    if (response && response.data && Array.isArray(response.data.NotificationListdisplay)) {
                        setNotifications(response.data.NotificationListdisplay as NotificationType[]);
                    } else {
                        console.log("Invalid response structure or no notifications found:", response);
                        setError('Invalid response structure or no notifications found.');
                        setIsError(true);
                    }
                    } catch (error) 
                    {
                        console.error('Error fetching notifications:', error);
                        setError('An error occurred while fetching notifications.');
                        setIsError(true);
                    } 
                    finally 
                    {
                        setIsLoading(false);
                    }
        };
        fetchData();
        }, []);
    
  return (
    <DashBoardNotificationList
        notifications={notifications}
        isLoading={isLoading}
        isError={isError}
        error={error}
    />
  )
}

export default DashBoardNotificationListHandler
