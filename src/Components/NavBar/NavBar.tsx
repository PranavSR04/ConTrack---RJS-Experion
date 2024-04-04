import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/img/logo.png";
import { Nav, NavItem, NavbarBrand, NavbarText } from "react-bootstrap";
import { IoMdNotifications } from "react-icons/io";
import { Avatar, Badge, Space } from "antd";
import { NavBarPropType } from "./types";
import { NavContexts } from "../NavContext/NavContext";
import NotificationListHandler from "../NotificationList/NotificationListHandler";

const NavBar = ({username,activeNotificationCounte}:NavBarPropType) => {
	
	const currentUser = JSON.parse(localStorage.getItem("username")||"" );
	const{showDrawer}=useContext(NavContexts);
    const{activeNotificationCount}=useContext(NavContexts);
	console.log(username,activeNotificationCount);

	return (
		<Nav className={styles.navbar}>
			<NavbarBrand className={styles.navbar__navbrand}> 
                <img src={logo} alt="contrack-logo" className={styles.navbar__navbrand__logo} />
                ConTrack
			</NavbarBrand>
			<NavItem>
				<Space className={styles.navbar__notification}>
					<Badge count={activeNotificationCount?activeNotificationCount:0} overflowCount={30} showZero={false} offset={[4, 10]} data-testid="bell-icon">
						<Avatar shape="square" size={30}>
							<IoMdNotifications size={30} onClick={showDrawer} />
						</Avatar>
					</Badge>
				</Space>
				<NotificationListHandler/>
				<NavbarText>{currentUser}</NavbarText>
			</NavItem>
		</Nav>
	);
};

export default NavBar;
