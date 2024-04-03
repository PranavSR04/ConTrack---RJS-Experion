import axiosInstance from "../../../Config/AxiosConfig";

export const addUser = async (
  selectedEmployeeId: number,
  selectedRoleId: number
) => {
  return await axiosInstance.post("/api/users/add", {
    experion_id: selectedEmployeeId,
    role_id: selectedRoleId,
  });
};
