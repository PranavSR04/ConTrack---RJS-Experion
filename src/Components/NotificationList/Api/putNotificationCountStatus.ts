import axios, { AxiosError } from "axios";
import { NotificationsResponse } from "../types/index";
import axiosInstance from "../../../Config/AxiosConfig";
import { userType } from './../types/index';
export const postNotificationStatus=async({
    user_id,
}:userType):Promise<void|AxiosError>=>{
    return await axiosInstance
		.put("api/notification/statusupdate", {user_id})
		.then((responce: { data: any; }) => responce.data)
		.catch((err: any) => err);
}