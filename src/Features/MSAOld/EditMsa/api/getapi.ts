import axiosInstance from "../../../../Config/AxiosConfig";

export const getapi = async (msa_ref_id: string) => {
  try {
    const data = await axiosInstance.get(
      `api/msa/list?msa_ref_id=${msa_ref_id}`
    );
    return data;
  } catch (error) {
    console.error("Error checking MSA ID existence:", error);
    throw error;
  }
};
