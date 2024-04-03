import React from "react";
import { LoginPropType } from "./types";
import { Button, Card, Modal } from "antd";
import styles from "./Login.module.css";
import logo from "../../assets/img/logo.png";
import microsoft from "../../assets/img/microsoft.png";
import { Col, Row } from "antd";

const Login = ({ isModalOpen,handleCancel,errorMsg,handleLogin }: LoginPropType) => {
	return (
		<Row className={styles.login}>
            <Col span={12} className={styles.login__left}>
                <div className={styles.login__left__brand}>
                    <img src={logo} alt="contrack logo" className={styles.login__left__brand__logo} />
                    <h1 className={styles.login__left__brand__title}>
                        ConTrack <br></br>
                    </h1>
                </div>
                <p className={styles.login__left__tagline}>
                    - Your tool for tracking and managing contracts
                </p>

				<div className={styles.login__left__mobileButton}>
                    <Button className={styles.login__left__mobileButton__microsoftButton} onClick={handleLogin}>
                        Login with Microsoft
                    </Button>
				</div>

            </Col>
            <Col span={12} className={styles.login__right}>
                <Card className={styles.login__right__card}>
                    <h6>Welcome </h6>
                    <img src={microsoft} alt="MS Logo" className={styles.login__right__card__microsoftLogo} />
                    <Button className={styles.login__right__card__microsoftButton} onClick={handleLogin}>
                        Login with Microsoft
                    </Button>
                </Card>
            </Col>
            <Modal title="Login Failed" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <p>{errorMsg}</p>
            </Modal>
        </Row> 
	);
};

export default Login;
