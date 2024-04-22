import axiosInstance from "../../../Config/AxiosConfig";
export const getUsersList = async () => {
  return await axiosInstance.get("api/users/list");
};