import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styles from './LoginRedirect.module.css'

const LoginRedirect = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Unauthorized Access</h1>
			<p className={styles.message}>
				You are not authorized to view this page. Please log in to access the
				content.
			</p>
			<Link to="/">
				<Button type="primary" className={styles.button}>
					Log In
				</Button>
			</Link>
		</div>
	);
};


export default LoginRedirect;
