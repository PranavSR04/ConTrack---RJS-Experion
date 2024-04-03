import axiosInstance from "../../../../Config/AxiosConfig";

export const getmsainfo = async (generatedId: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(
      `api/msa/list?msa_ref_id=${generatedId}`
    );
    return response.data.exists;
  } catch (error) {
    console.error("Error checking MSA ID existence:", error);
    throw error;
  }
};