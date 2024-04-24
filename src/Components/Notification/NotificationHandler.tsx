
import React, { useContext, useEffect, useState } from 'react';
import Notification from './Notification';
import { NotificationHandlerProps, NotificationType } from './types';
import { useLocation, useNavigate } from 'react-router';
import { NavContexts } from '../NavContext/NavContext';


const NotificationHandler = ({ notification }:NotificationHandlerProps) => {
    const [currentTime,setCurrentTime]=useState<string>('');
    const [difference, setDifference] = useState<string>('');
    const [actionStyle, setActionStyle] = useState<string>("");
    const [cardStyle, setCardStyle] = useState<string>("");
    const { onClose } = useContext(NavContexts);
    const navigate = useNavigate();
    const location = useLocation();
    const stylename='Notificationstyle'
    useEffect(() => {
      const tick = () => {
        setCurrentTime(new Date().toLocaleString());
      };
      const intervalId = setInterval(tick, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);
    useEffect(() => {
      const dateCalculation = (date: Date) => {
        const currentDate = new Date();
        const timeDifference = Math.floor((currentDate.getTime() - date.getTime())/1000);
      
        if (timeDifference < 0) {
          return 'Just now';
        } else if (timeDifference < 60) {
          return `${timeDifference} sec ago`;
        } else if (timeDifference < 3600) {
          const minutes = Math.floor(timeDifference / 60);
          return `${minutes} mins ago`;
        } else if (timeDifference < 86400) {
          const hours = Math.floor(timeDifference / 3600);
          return `${hours} hrs ago`;
        } else if (timeDifference < 604800) {
          const days = Math.floor(timeDifference / 86400);
          return `${days} days ago`;
        } else if (timeDifference < 2592000) {
          const weeks = Math.floor(timeDifference / 604800);
          return `${weeks} weeks ago`;
        } else if (timeDifference < 31536000) {
          const months = Math.floor(timeDifference / 2592000);
          return `${months} months ago`;
        } else {
          const years = Math.floor(timeDifference / 31536000);
          return `${years} years ago`;
        }
      };

      const updatedDate = new Date(notification.updated_at);
      const calculatedDifference = dateCalculation(updatedDate);
      setDifference(calculatedDifference);
  }, [currentTime]);
  useEffect(() => 
      {
          if (notification.action.includes("Added")) 
          {
            setActionStyle(`${stylename}_added`);
          } 
          else if (notification.action === "Edited") 
          {
            setActionStyle(`${stylename}_edited`);
          } 
          else if (notification.action === "Expiring") 
          {
            setActionStyle(`${stylename}_expiring`);
          } 
          else if (notification.action === "Expired") 
          {
            setActionStyle(`${stylename}_expired`);
          } 
          else if (notification.action === "Renewed") 
          {
            setActionStyle(`${stylename}_renewed`);
          }
          else if (notification.action === "Closed") 
            {
              setActionStyle(`${stylename}_closed`);
            } 
          setCardStyle(`${stylename}_cardStyle_right`)
          
      }, [notification.action, stylename]);
      const ItemClickHandler = (notification: NotificationType) => 
      {
          const isFromMSAOverview = location.pathname.includes("/MSAOverview");
          const isFromAllContracts = location.pathname.includes("/AllContracts");
          const isFromMyContracts = location.pathname.includes("/MyContracts");
          const isFromDashboard = location.pathname.includes("/Dashboard");
          const isFromRevenue = location.pathname.includes("/Revenue");
          const isFromManageUser = location.pathname.includes("/Manage User");
          if (notification.contract_id) 
          {
                onClose();
                navigate(`/AllContracts/${notification.contract_ref_id}`);  
              
              if (isFromMSAOverview) 
              {
                onClose();
                navigate(`/MSAOverview/${notification.contract_ref_id}`, {
                  state: { id: notification.contract_id },
                });
              } 
              else if (isFromAllContracts) 
              {
                onClose();
                navigate(`/AllContracts/${notification.contract_ref_id}`, {
                  state: { id: notification.contract_id },
                });
              } 
              else if (isFromDashboard) 
              {
                onClose();
                navigate(`/Dashboard/${notification.contract_ref_id}`, {
                  state: { id: notification.contract_id },
                });
              } 
              else if (isFromMyContracts) 
              {
                onClose();
                navigate(`/MyContracts/${notification.contract_ref_id}`, {
                  state: { id: notification.contract_id },
                });
              } 
              else if (isFromRevenue) 
              {
                onClose();
                navigate(`/Revenue/${notification.contract_ref_id}`, {
                  state: { id: notification.contract_id },
                });
              } 
              else if (isFromManageUser) 
              {
                onClose();
                navigate(`/Manage User/${notification.contract_ref_id}`, {
                  state: { id: notification.contract_id },
                });
              } 
              else {
                onClose();
                navigate(`/MSAOverview/${notification.contract_ref_id}`, {
                  state: { id: notification.contract_id },
                });
              }
          }
          else 
          {
              onClose();
              navigate(`/${notification.msa_ref_id}`, {
                state: { id: notification.msa_id },
              });
              console.log("notification id",notification.msa_id)
            console.log("location id",location.state)
          }
      };
    return <Notification notification={notification} difference={difference} actionStyle={actionStyle} stylenames={stylename} cardStyle={cardStyle} ItemClickHandler={ItemClickHandler}/>;
}

export default NotificationHandler;
