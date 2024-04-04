import React, { createContext, useState } from "react";
import { AuthContextType } from "./types";
import { useNavigate } from "react-router";
import { AuthenticationResult } from "@azure/msal-common";
import { useMsal } from "@azure/msal-react";
import { ContarckUserType, LoginResponse } from "../../Features/Login/types";
import { postLogin } from "./api/postLogin";
import { AxiosError } from "axios";
import { postLogout } from "./api/postLogout";

//AuthContext contains login,logout functions and currently logged in user details
export const Auth = createContext<AuthContextType>({
    currentUser: {
		id:'',
        experion_id: 1,
        role_id: 1,
        user_mail: '',
        user_name: '',
        user_designation: null,
        group_name: null,
        is_active: 1,
        created_at: '',
        updated_at: '',
	},
    login: (responce: AuthenticationResult): Promise<LoginResponse | AxiosError> => {
		return postLogin(responce.accessToken);
	},
    handleLogout: (): Promise<void | AxiosError> => {
		return Promise.resolve();
	},
	logout:():Promise<void | AxiosError>=>{ return Promise.resolve();
	},
	isModalOpen: false,
	handleOk: () => {},
	handleCancel: () => {},
	errorMsg: "",
});


const AuthContext = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<ContarckUserType | undefined>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string>(""); 
    const navigate = useNavigate();
	const { instance } = useMsal();

	const showModal = () => {     //Setting true to show popup message if error occures 
		setIsModalOpen(true);
	};

	const handleOk = () => {      //Close the popup after seeing the error message
		setIsModalOpen(false);
	};

	const handleCancel = () => {  //Close the popup after seeing the error message
		setIsModalOpen(false);
	};

    //login authenticator function to check if the user in our system 
	const login = async (responce: AuthenticationResult): Promise<LoginResponse> => {
		localStorage.clear();
		const contrack_response: LoginResponse = await postLogin(responce.accessToken);
		console.log(contrack_response);

		if (!(contrack_response instanceof AxiosError)) {
			console.log("Logged User Details", contrack_response.contrackUser);
			console.log(contrack_response.contrackUser);
			setCurrentUser(contrack_response.contrackUser);
			localStorage.setItem("access_token", contrack_response.access_token);
			contrack_response.contrackUser.id? localStorage.setItem("user_id",contrack_response.contrackUser.id.toString())
				: localStorage.clear();
			localStorage.setItem("role_id",contrack_response.contrackUser.role_id.toString());
			localStorage.setItem("user", JSON.stringify(contrack_response.user));
			localStorage.setItem("username",JSON.stringify(contrack_response.contrackUser.user_name));
			navigate("/Dashboard");

		} else {
			showModal();
			setErrorMsg((contrack_response.response?.data as any)?.error);
		}
		return contrack_response;
	};


    //Simple Logout function that only logouts from our Application
    const logout = async (): Promise<void | AxiosError> => {
		try {
			const res = await postLogout();  
			// If logout is successful, return void
			if (res instanceof AxiosError) {
				throw res;
			} else {
				localStorage.clear();
				navigate("/");
				return Promise.resolve();
			}
		} catch (error) {    
			// If logout fails, return AxiosError
			console.error("Error during logout:", error);
			return Promise.reject(error);
		}
	};

    //Popup logout function of Azure
    const handleLogout = () => {
		  instance.logoutPopup({
			postLogoutRedirectUri: "/",
			mainWindowRedirectUri: "/",
		  });
		
	  };

	return (
		<Auth.Provider value={{ isModalOpen, login, handleOk, handleCancel, errorMsg ,logout,handleLogout,currentUser }}>
			{children}
		</Auth.Provider>
	);
};

export default AuthContext;
