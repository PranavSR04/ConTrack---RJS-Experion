import { User } from "../types";
import axiosInstance from "../../../Config/AxiosConfig";

export const deleteUser = async (selectedUser: User): Promise<void> => {
  return await axiosInstance.put(`/api/users/update/${selectedUser!.id}`, {
    is_active: 0,
  });
};
