import { locale } from './../../../Contract/ContractListing/types/index';
import axiosInstance from "../../../../Config/AxiosConfig";

export const postRenewMsa = async (
  user_id: number,
  formDatatoSend: FormData,
  msa_ref_id: string
) => {
  try {
    console.log(formDatatoSend);
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
