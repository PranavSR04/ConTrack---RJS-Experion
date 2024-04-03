import React, { useContext } from "react";
import { Auth } from "../../Components/AuthContext/AuthContext";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Config/authConfig";
import { callMsGraph } from "../../Config/graph";
import Login from "./Login";

const LoginHandler = () => {
	const { login, isModalOpen, handleCancel, errorMsg } = useContext(Auth);
	const { instance } = useMsal();

	//Handles the Azure login and passes the user object to backend
	const handleLogin = async () => {
		try {
			const response = await instance.loginPopup(loginRequest);
			console.log(response.accessToken);
			const newGraph = await callMsGraph(response.accessToken);
			console.log(newGraph);
			console.log(newGraph.userPrincipalName);
			await login(response); //
		} catch (e) {
			console.log("error");
			console.error(e);
		}
	};

	return (
		<Login
			isModalOpen={isModalOpen}
			handleCancel={handleCancel}
			errorMsg={errorMsg}
			handleLogin={handleLogin}
		/>
	);
};

export default LoginHandler;
