import axiosInstance from "../../../Config/AxiosConfig";

export const fetchMsaCount = async () => {
    try {
        const response = await axiosInstance.get(`api/msa/count`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch duCount`);
    }
};
