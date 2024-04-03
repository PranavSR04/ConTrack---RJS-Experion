import axiosInstance from "../../../Config/AxiosConfig";

export const fetchDuCount = async () => {
    try {
        const response = await axiosInstance.get(`api/contract/ducount`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch duCount`);
    }
};
