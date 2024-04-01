import { AuthenticationResult } from "@azure/msal-browser";
import { ContarckUserType, LoginResponse } from "../../../Features/Login/types";
import { AxiosError } from "axios";

export type AuthContextType={
    currentUser:ContarckUserType | undefined;
	login: (responce: AuthenticationResult) => Promise<LoginResponse>
	handleLogout: (logoutType: string) => void
	handleOk:()=>void;
	isModalOpen:boolean;
	handleCancel:()=>void;
	errorMsg:string;
	logout:() => Promise<void | AxiosError>;
}