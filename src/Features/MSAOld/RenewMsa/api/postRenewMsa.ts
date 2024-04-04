import axiosInstance from "../../../../Config/AxiosConfig";

export const postRenewMsa = async (
  msa_ref_id:string,
  user_id: number,
  formDatatoSend: FormData
) => {
  try {
    //console.log("Data to be renewed",formDatatoSend)
    const data = await axiosInstance.post(
      `api/msa/renew/${user_id}?msa_ref_id=${msa_ref_id}`,
      formDatatoSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error checking MSA ID existence:", error);
    throw error;
  }
};
