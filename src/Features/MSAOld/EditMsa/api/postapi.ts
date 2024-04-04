import axiosInstance from "../../../../Config/AxiosConfig";

export const postapi = async (
  formDatatoSend: FormData,
  msa_ref_id: string | undefined,
  user_id: number
) => {
  axiosInstance.post(
    `api/msa/update/${user_id}?msa_ref_id=${msa_ref_id}`,
    formDatatoSend
  ).then(response => {
    // Handle successful response
    console.log("Response:", response.data);
  })
  .catch(error => {
    // Handle error
    console.error("Error:", error);
  });
  ;
};
