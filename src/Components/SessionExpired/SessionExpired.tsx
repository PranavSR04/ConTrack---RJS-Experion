import { Button, Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const SessionExpired = () => {
    const navigate = useNavigate();
	return (
		<div>
			<Modal
                open={true}
				title="Session Expired"
                closable={false}
				footer={[
					<Button key="login" type="primary" onClick={()=>{navigate("/")}}>
						Login Again
					</Button>,
				]}
			>
				<p>Your session has expired. Please login again.</p>
			</Modal>
		</div>
	);
};

export default SessionExpired;
