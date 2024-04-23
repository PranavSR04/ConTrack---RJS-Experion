import axiosInstance from "../../../Config/AxiosConfig";


export const deleteUserFromGroup = async (
    userToBeDeletedFromGroup: number|undefined,
    selectedIndividualGroup:number|undefined
  ) => {
    return await axiosInstance.put("/api/groups/removeUser", {
        userToBeDeletedFromGroup: userToBeDeletedFromGroup,
        selectedIndividualGroup: selectedIndividualGroup,
    });
  };