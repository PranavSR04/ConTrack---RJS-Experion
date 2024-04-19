import axiosInstance from "../../../Config/AxiosConfig";

export const addGroup = async (
  group_name: string,
) => {
  return await axiosInstance.post("/api/group/add", {
    group_name
  });
};