import axiosInstance from "../../../Config/AxiosConfig";

export const deleteGroup = async (selectedIndividualGroup: number|undefined) => {
    return await axiosInstance.delete("/api/groups/delete", {
        data: { selectedIndividualGroup: selectedIndividualGroup }
    });
};
