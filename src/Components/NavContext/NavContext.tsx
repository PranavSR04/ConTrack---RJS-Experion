import React, { createContext, useState } from 'react'
import { NavPropType } from './types'
import { postNotificationStatus } from '../NotificationList/Api/putNotificationCountStatus';
import { userType } from '../NotificationList/types';

export const NavContexts=createContext<NavPropType>({
    showDrawer:()=>{},
    open:true,
    onClose:()=>{},
    setActiveNotificationCount:()=>{},
    activeNotificationCount:0,
    setAdded:()=>{},
    added:false,
    setRenew:()=>{},
    renew:false,
    setEdited:()=>{},
    edited:false,
    setContractAddToast:()=>{},
    contractAddToast:false,
    setContractEditToast:()=>{},
    contractEditToast:false

})
    const NavContext = ({ children }: { children: React.ReactNode }) =>  {
    const[added, setAdded] = useState(false);
    const[edited,setEdited]=useState(false);
    const[renew,setRenew]=useState(false);
    const [contractAddToast, setContractAddToast] = useState(true);
    const [contractEditToast, setContractEditToast] = useState(false);    
    const [open, setOpen] = useState(false);
    const [activeNotificationCount, setActiveNotificationCount] = useState<number>(0);
    const SENDTO_ID = parseInt(localStorage.getItem("user_id") || '0', 10);
    const showDrawer = async() => {
      setOpen(true);
      const user: userType = { user_id: SENDTO_ID };
      const response = await postNotificationStatus(user);
      console.log("response data",response)
    };
   
    const onClose = () => {
        setOpen(false);
        setActiveNotificationCount(0);
      };
  return (
    <NavContexts.Provider
      value={{
        showDrawer,
        open,
        onClose,
        activeNotificationCount,
        setActiveNotificationCount,
        setAdded,
        added,
        setEdited,
        edited,
        setRenew,
        renew,
        setContractAddToast,
        contractAddToast,
        setContractEditToast,
        contractEditToast,
      }}
    >
      {children}
    </NavContexts.Provider>
  );
};

export default NavContext;
