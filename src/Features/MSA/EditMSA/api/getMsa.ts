import axiosInstance from "../../../../Config/AxiosConfig";

export const getMsa = async (msa_id: number) => {
  try {
    const data = await axiosInstance.get(
      `api/msa/list?id=${msa_id}`
    );
    return data;
  } catch (error) {
    console.error("Error checking MSA ID existence:", error);
    throw error;
  }
  }
