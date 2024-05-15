import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Auth } from '../AuthContext/AuthContext'
import { NavContexts } from '../NavContext/NavContext';
import { useNavigate } from 'react-router';

const NavBarHandler = () => {
  const {currentUser} = useContext(Auth);
  const{activeNotificationCount}=useContext(NavContexts);
  const navigate = useNavigate();
  console.log(currentUser);
  if(!currentUser){
		navigate("/unauthorized");
	}

  const [username,setUsername] = useState<string>();
  const [notificationCount,setNotificationCount] = useState();
  useEffect(()=>{
    setUsername(currentUser?.user_name);
    setNotificationCount(notificationCount);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return username?(
    <NavBar
    username={username}
    activeNotificationCounte={activeNotificationCount}
    />
  ):null
}

export default NavBarHandler
