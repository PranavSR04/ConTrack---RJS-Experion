import axiosInstance from "../../../Config/AxiosConfig";

export const updateUser = async (
  updateUserId: number,
  selectedRoleId: number | undefined
): Promise<void> => {
  return await axiosInstance.put(`api/users/update/${updateUserId}`, {
    role_id: selectedRoleId,
  });
};
