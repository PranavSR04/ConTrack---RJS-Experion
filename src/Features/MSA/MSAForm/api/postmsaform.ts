import axiosInstance from "../../../../Config/AxiosConfig";

export const postmsaform = async (formDatatoSend: FormData, user_id: number,msaState:string) => {
  await axiosInstance.post(`api/msa/${msaState}/${user_id}`, formDatatoSend, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
