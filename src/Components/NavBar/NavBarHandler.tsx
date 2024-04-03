import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Auth } from '../AuthContext/AuthContext'
import { NavContexts } from '../NavContext/NavContext';

const NavBarHandler = () => {
  const {currentUser} = useContext(Auth);
  const{activeNotificationCount}=useContext(NavContexts);

  console.log(currentUser);

  const [username,setUsername] = useState<string>();
  const [notificationCount,setNotificationCount] = useState();
  useEffect(()=>{
    setUsername(currentUser?.user_name);
    setNotificationCount(notificationCount);

  },[]);

  return(
    <NavBar
    username={username}
    activeNotificationCount={activeNotificationCount}
    
    />
  )
}

export default NavBarHandler
