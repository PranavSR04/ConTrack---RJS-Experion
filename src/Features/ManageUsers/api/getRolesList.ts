import axiosInstance from "../../../Config/AxiosConfig";
export const getRolesList = async () => {
  return await axiosInstance.get("api/role/details");
};
