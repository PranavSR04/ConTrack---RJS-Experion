import axiosInstance from "../../../Config/AxiosConfig";
export const getUserGroups = async () => {
  return await axiosInstance.get("api/groups/list");
};