import axios, { AxiosError } from "axios";
import { NotificationsResponse } from "../types/index";
import axiosInstance from "../../../Config/AxiosConfig";

export const fetchNotification = async (page:number,pageSize:number,sendto_id:number): Promise<NotificationsResponse> => {
    try {
        const response = await axiosInstance.get<NotificationsResponse>(`api/notification/list?sendto_id=${sendto_id}\&page=${page}&pageSize=${pageSize}`);
        return response.data;
        
    } catch (error) {
        throw new Error("Failed to fetch notifications: " );
    }
};

