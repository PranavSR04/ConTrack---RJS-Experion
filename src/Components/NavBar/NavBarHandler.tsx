import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Auth } from '../AuthContext/AuthContext'
import { NavContexts } from '../NavContext/NavContext';

const NavBarHandler = () => {
  // const {currentUser} = useContext(Auth);
  const currentUser:string | undefined = localStorage.getItem("username")?JSON.parse(localStorage.getItem("username")||"" ):null;
  const{activeNotificationCount}=useContext(NavContexts);
  console.log(currentUser);
  const [notificationCount,setNotificationCount] = useState();
  useEffect(()=>{
    setNotificationCount(notificationCount);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return currentUser ? (
    <NavBar
    username={currentUser}
    activeNotificationCounte={activeNotificationCount}
    />
  ) : null;
}

export default NavBarHandler
