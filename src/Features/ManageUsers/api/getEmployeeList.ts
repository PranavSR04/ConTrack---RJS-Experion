import axiosInstance from "../../../Config/AxiosConfig";

export const getEmployeeList = async (searchValue: string) => {
  return await axiosInstance.get(
    `/api/experion/list?${searchValue ? `name=${searchValue}` : ""}`
  );
};
