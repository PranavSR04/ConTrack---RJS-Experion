import React from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/img/logo.png";
import { Nav, NavItem, NavbarBrand, NavbarText } from "react-bootstrap";
import { IoMdNotifications } from "react-icons/io";
import { Avatar, Badge, Space } from "antd";

const NavBar = () => {
	return (
		<Nav className={styles.navbar}>
			<NavbarBrand className={styles.navbar__navbrand}> 
                <img src={logo} alt="contrack-logo" className={styles.navbar__navbrand__logo} />
                ConTrack
			</NavbarBrand>
			<NavItem>
				<Space className={styles.navbar__notification}>
					<Badge count={9} overflowCount={30} showZero={false} offset={[4, 10]} data-testid="bell-icon">
						<Avatar shape="square" size={30}>
							<IoMdNotifications size={30} />
						</Avatar>
					</Badge>
				</Space>
				<NavbarText>Gokul Surendran</NavbarText>
			</NavItem>
		</Nav>
	);
};

export default NavBar;
