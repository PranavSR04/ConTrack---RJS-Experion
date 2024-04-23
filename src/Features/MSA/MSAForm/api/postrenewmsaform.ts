import axiosInstance from "../../../../Config/AxiosConfig";

export const postrenewmsaform = async (formDatatoSend: FormData, user_id: number) => {
  await axiosInstance.post(`api/msa/renew/${user_id}`, formDatatoSend, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(response => {
    // Handle successful response
    console.log("Response:", response.data);
  })
  .catch(error => {
    // Handle error
    console.error("Error:", error);
  });
  ;
};
