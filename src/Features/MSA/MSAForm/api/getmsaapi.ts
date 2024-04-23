import axiosInstance from "../../../../Config/AxiosConfig";

export const getmsaapi = async (id: string) => {
  try {
    const data = await axiosInstance.get(
      `api/msa/list?id=${id}`
    );
    return data;
  } catch (error) {
    console.error("Error checking MSA ID existence:", error);
    throw error;
  }
};
