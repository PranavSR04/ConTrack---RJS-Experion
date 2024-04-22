import axiosInstance from "../../../Config/AxiosConfig";
export const getUsersList = async (search:string) => {
  return await axiosInstance.get(`/api/users/list?${search ? `search=${search}`: "" }`);
};

// get(`/api/experion/list?${searchValue ? `name=${searchValue}` : ""}`);