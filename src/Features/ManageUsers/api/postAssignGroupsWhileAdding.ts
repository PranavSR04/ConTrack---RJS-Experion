import axiosInstance from "../../../Config/AxiosConfig";

export const assignGroupsWhileAdding = async (
  selectedEmployeeId: number,
  selectedUserGroups: number[]
) => {
  return await axiosInstance.post("/api/groups/assign", {
    experion_id: selectedEmployeeId,
    groupIds: selectedUserGroups,
  });
};