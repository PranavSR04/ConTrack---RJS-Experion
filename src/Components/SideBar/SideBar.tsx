import React, { useContext, useEffect, useState } from "react";
import {
  FaBars,
  FaFileAlt,
  FaCopy,
  FaRegChartBar,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";
import { SideBarPropType } from "./types";
import { Auth } from "../../Components/AuthContext/AuthContext";
import { Button, Modal } from "antd";
import LoginRedirect from "../LoginRedirect/LoginRedirect";

const SideBar = ({ children }: SideBarPropType) => {
  const { logout } = useContext(Auth);
  
  const currentUser = localStorage.getItem("username");
  console.log("%%%%",currentUser);
  const location = useLocation();
  const access_token = localStorage.getItem("access_token");
  const role_id = parseInt(localStorage.getItem("role_id") || "0", 10);
  const [isActiveIndex, setIsActiveIndex] = useState<number>(() => {
    const storedIndex = localStorage.getItem("activeIndex");
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate(); 
  const handleCancel = () => {setIsModalOpen(false);};
  const handleLogout = async () => {
    try {
      access_token && (await logout());
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const index = sideBarItem.findIndex(
      (item) => item.path === location.pathname
      
    );
    console.log(location.pathname);
    if (index !== -1) {
      setIsActiveIndex(index);
      localStorage.setItem("activeIndex", index.toString());
    } else if (location.pathname === "/Contract") {
      const contractsIndex = sideBarItem.findIndex(
        (item) => item.path === "/AllContracts"
      );

      setIsActiveIndex(contractsIndex);
      localStorage.setItem("activeIndex", contractsIndex.toString());
    }else if(location.pathname === "/MSA%20Overview"){
      localStorage.setItem("activeIndex", "1");
      setIsActiveIndex(1);

    }else if(location.pathname === "/Manage%20User"){
      localStorage.setItem("activeIndex", "5");
      setIsActiveIndex(5);
      
    }
  }, [location.pathname]);

  const commonSideItems = [
    { path: "/Dashboard", name: "Dashboard", icon: <FaBars title="Dashboard" /> },
    { path: "/MSAOverview", name: "MSA", icon: <FaFileAlt title="MSA" /> },
    { path: "/AllContracts", name: "All Contracts", icon: <FaCopy title="AllContracts" /> },
    { path: "/MyContracts", name: "My Contracts", icon: <FaFileAlt title="MyContracts" /> },
    { path: "/Revenue", name: "Revenue", icon: <FaRegChartBar title="Revenue" /> },
  ];

  const superadminSideItem = {
    path: "/ManageUser",
    name: "Manage User",
    icon: <FaUserCog title="ManageUser" />,
  };
  const sideBarItem =
    (role_id === 1)||(role_id === 2) ? [...commonSideItems, superadminSideItem] : commonSideItems;
  const onClickActive = (index: number) => {
    setIsActiveIndex(index);
  };
  const showmodal = () =>{
    setIsModalOpen(true);
  }
  const handleLogoutAndCloseModal = () => {
    handleLogout(); // Logout action
    navigate('/');
    setIsModalOpen(false); // Close the modal after logout
  }

  return currentUser? (
    <div className={styles.container}>
      <div className={styles.container_sidebar}>
        {sideBarItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={`${
              isActiveIndex === index ? styles.isactive : styles.not_active
            }`}
            onClick={() => onClickActive(index)}
          >
            <div className={styles.container_sidebar_icon}>{item.icon}</div>
            <div className={styles.container_sidebar_link_text}>
              {item.name}
            </div>
          </NavLink>
        ))}
        <div className={styles.container_sidebar_logout}>
          <div
            // to="/"
            className={styles.container_sidebar_logout_link}
            onClick={showmodal}
          >
            <div className={styles.container_sidebar_icon}>
              <FaSignOutAlt title="LogOut" />
            </div>
            <div className={styles.container_sidebar_logout_link_text} onClick={showmodal}>
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container_outsideSideBar}>{children}</div>
      <Modal
      title={"Do you want to logout?"} 
      open={isModalOpen}
      onCancel={handleCancel}
      footer={(_, { CancelBtn }) => (
				<div className={styles.modalfooter}>
				  <Button className={styles.okbtn} onClick={handleLogoutAndCloseModal}>OK</Button>
				  <CancelBtn/>
				</div>
			)}
      >
      </Modal>
    </div>
  ):(<LoginRedirect/>);
};

export default SideBar;
