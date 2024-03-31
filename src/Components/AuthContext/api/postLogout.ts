import { AxiosError } from "axios";
import axiosInstance from "../../../Config/AxiosConfig";

export const postLogout = async (): Promise<void | AxiosError> => {
    console.log("hello");
    return await axiosInstance  
        .post("api/auth/logout")
        .then(() => {})
        .catch((error) => error);
};