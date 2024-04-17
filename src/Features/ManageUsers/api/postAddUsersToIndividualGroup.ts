import axiosInstance from "../../../Config/AxiosConfig";

export const addUsersToIndividualGroup = async (
    selectedIndividualGroup:number|undefined,
    selectedUsers:number[]
) => {
  return await axiosInstance.post("/api/groups/addUsers", {
    selectedIndividualGroup: selectedIndividualGroup,
    selectedUsers: selectedUsers,
  });
};